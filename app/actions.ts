"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";

type Lead = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
};

const getFormValue = (formData: FormData, field: string) => {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
};

const saveLead = async (lead: Lead) => {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "leads.jsonl");

  await mkdir(dataDir, { recursive: true });
  await appendFile(filePath, `${JSON.stringify(lead)}\n`, "utf8");
};

const sendVkLeadNotification = async (lead: Lead) => {
  const token = process.env.VK_BOT_TOKEN;
  const userId = process.env.VK_NOTIFY_USER_ID;
  const apiVersion = process.env.VK_API_VERSION ?? "5.199";

  if (!token || !userId) {
    throw new Error("VK notification env variables are not configured");
  }

  const message = [
    "Новая заявка с сайта",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Дата: ${lead.createdAt}`,
  ].join("\n");

  const body = new URLSearchParams({
    access_token: token,
    user_id: userId,
    random_id: String(Date.now()),
    message,
    v: apiVersion,
  });

  const response = await fetch("https://api.vk.com/method/messages.send", {
    method: "POST",
    body,
    cache: "no-store",
  });

  const result = (await response.json()) as {
    error?: {
      error_code: number;
      error_msg: string;
    };
  };

  if (!response.ok || result.error) {
    throw new Error(
      result.error
        ? `VK API error ${result.error.error_code}: ${result.error.error_msg}`
        : "VK API request failed",
    );
  }
};

export async function submitLead(formData: FormData) {
  const name = getFormValue(formData, "name");
  const phone = getFormValue(formData, "phone");
  const redirectTo = getFormValue(formData, "redirectTo") || "/";
  const consent = formData.get("consent") === "on";

  if (!name || !phone || !consent) {
    throw new Error("Lead form is incomplete");
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    name,
    phone,
    createdAt: new Date().toISOString(),
  };

  await saveLead(lead);
  await sendVkLeadNotification(lead);

  const safeRedirectTo = redirectTo.startsWith("/") ? redirectTo : "/";
  const separator = safeRedirectTo.includes("?") ? "&" : "?";

  redirect(`${safeRedirectTo}${separator}application=sent#form`);
}
