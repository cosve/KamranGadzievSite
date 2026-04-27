"use client";

import { useState } from "react";

const sanitizePhone = (value: string) => {
  const hasLeadingPlus = value.trimStart().startsWith("+");
  const digits = value.replace(/\D/g, "").slice(0, 18);

  if (!digits) return hasLeadingPlus ? "+" : "";

  return `${hasLeadingPlus ? "+" : ""}${digits}`;
};

type PhoneInputProps = {
  placeholder?: string;
};

export default function PhoneInput({
  placeholder = "+123456789000",
}: PhoneInputProps) {
  const [phone, setPhone] = useState("");

  return (
    <input
      type="tel"
      name="phone"
      required
      maxLength={19}
      value={phone}
      onChange={(event) => setPhone(sanitizePhone(event.target.value))}
      onPaste={(event) => {
        event.preventDefault();
        setPhone(sanitizePhone(event.clipboardData.getData("text")));
      }}
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      className="w-full border border-[#ebe2c3]/60 rounded-[14px] bg-transparent
                 text-white placeholder-white/40 text-[15px] px-5 h-[52px]
                 outline-none focus:border-[#ebe2c3] transition-colors"
    />
  );
}
