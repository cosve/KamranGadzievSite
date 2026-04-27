"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getLocaleFromPathname, getLocalizedHref, normalizeLocale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

function NotFoundContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = normalizeLocale(
    getLocaleFromPathname(pathname) || searchParams.get("lang"),
  );
  const t = translations[locale].common;

  return (
    <main className="flex-1 flex flex-col items-center justify-center relative px-4 py-20 lg:py-32">
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[600px] bg-black/10 md:bg-[#0C2037]/70 backdrop-blur-md rounded-[25px] p-8 sm:p-10 lg:p-14">
        <h1 className="text-[#ebe2c3] text-[90px] leading-none mb-3 lg:mb-4">
          404
        </h1>
        <h2 className="text-white font-bold text-[20px] lg:text-[28px] uppercase tracking-[0.04em] mb-4 lg:mb-6">
          {t.notFoundTitle}
        </h2>
        <p className="text-white/80 text-[15px] lg:text-[18px] leading-relaxed mb-8 lg:mb-10 max-w-[450px]">
          {t.notFoundText}
        </p>

        <Link
          href={getLocalizedHref("/", locale)}
          className="flex items-center justify-center w-full sm:w-auto min-w-[240px] bg-[#0a2e58] hover:bg-[#0f407a] text-white font-medium text-[15px] lg:text-[16px] rounded-[14px] h-[52px] px-8 transition-colors shadow-lg hover:shadow-xl"
        >
          {t.backHome}
        </Link>
      </div>
    </main>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={null}>
      <NotFoundContent />
    </Suspense>
  );
}
