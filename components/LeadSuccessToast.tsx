"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getLocaleFromPathname, normalizeLocale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

type LeadSuccessToastProps = {
  phone: string;
};

export default function LeadSuccessToast({ phone }: LeadSuccessToastProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const locale = normalizeLocale(
    getLocaleFromPathname(pathname) || searchParams.get("lang"),
  );
  const t = translations[locale];

  useEffect(() => {
    setVisible(searchParams.get("application") === "sent");
  }, [searchParams]);

  const closeToast = () => {
    setVisible(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("application");
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}#form`, {
      scroll: false,
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed left-4 right-4 bottom-5 z-[80] flex justify-center pointer-events-none">
      <div className="w-full max-w-xl bg-[#172535] border border-[#ebe2c3]/60 rounded-[14px] shadow-2xl p-5 pointer-events-auto">
        <div className="flex items-start gap-4">
          <div className="w-2 self-stretch rounded-full bg-[#ebe2c3] shrink-0" />
          <div className="flex-1">
            <p className="text-white font-bold text-[16px] lg:text-[18px] mb-2">
              {t.toast.title}
            </p>
            <p className="text-white/85 text-[14px] lg:text-[16px] leading-relaxed">
              {t.toast.text}{" "}
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="text-[#ebe2c3] hover:text-white transition-colors"
              >
                {phone}
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={closeToast}
            aria-label={t.common.closeNotification}
            className="text-white/70 hover:text-white transition-colors text-[24px] leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
