"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  defaultLocale,
  getLocaleFromPathname,
  getLocalizedHref,
  locales,
  normalizeLocale,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n";
import { translations } from "@/lib/translations";

const labels: Record<Locale, string> = {
  ru: "RU",
  az: "AZ",
  en: "EN",
};

function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className="shrink-0" aria-label="Kamran Gadzhiev">
      <svg
        width="52"
        height="40"
        viewBox="0 0 52 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.4287 36.5634C6.55565 36.5634 4.98967 36.0939 3.73074 35.1549C2.50251 34.216 1.56599 32.9953 0.921169 31.493C0.307056 29.9906 0 28.4131 0 26.7606C0 25.0329 0.337762 23.3803 1.01329 21.8028C1.71952 20.1878 2.76351 18.8732 4.14526 17.8592C5.52701 16.8075 7.26188 16.2817 9.34987 16.2817C11.1615 16.2817 12.6661 16.8638 13.8636 18.0282C15.0918 19.1549 15.7059 20.9014 15.7059 23.2676C15.7059 24.5822 15.3835 25.7653 14.7387 26.8169C14.0939 27.831 13.3109 28.6197 12.3897 29.1831C11.4686 29.7465 10.5627 30.0282 9.67228 30.0282C8.1677 30.0657 6.98553 29.6714 6.12577 28.8451C5.26602 27.9812 4.83614 26.9671 4.83614 25.8028C4.83614 25.2394 4.95896 24.6573 5.20461 24.0563C5.35813 23.6432 5.54237 23.2676 5.75731 22.9296C6.00295 22.5916 6.20254 22.4038 6.35607 22.3662H6.44818C6.72453 22.3662 6.81665 22.5916 6.72453 23.0423C6.66312 23.3803 6.5096 23.831 6.26395 24.3944C6.17183 24.5822 6.11042 24.7887 6.07972 25.0141C6.04901 25.2394 6.03366 25.4648 6.03366 25.6901C6.03366 26.6291 6.38677 27.5117 7.093 28.338C7.79923 29.1268 8.6897 29.4272 9.76439 29.2394C11.1461 28.9765 12.1901 28.2254 12.8964 26.9859C13.6026 25.7465 13.9557 24.4319 13.9557 23.0423C13.9557 21.5775 13.5565 20.2629 12.7582 19.0986C11.9906 17.8967 10.8391 17.2958 9.30381 17.2958C7.76853 17.2958 6.46354 17.7465 5.38884 18.6479C4.31414 19.5493 3.50044 20.7136 2.94774 22.1408C2.39504 23.5681 2.11869 25.0516 2.11869 26.5916C2.11869 28.0188 2.37969 29.4085 2.90168 30.7606C3.45438 32.0751 4.28344 33.1455 5.38884 33.9718C6.52495 34.7981 7.96811 35.2113 9.71834 35.2113C11.1922 35.2113 12.4818 34.7418 13.5872 33.8028C14.6926 32.8638 15.6445 31.6432 16.4429 30.1408C17.2412 28.6385 17.9321 27.0423 18.5155 25.3521C19.0989 23.6244 19.6209 21.9906 20.0815 20.4507C20.3885 19.3615 20.6649 18.3474 20.9105 17.4085C21.1869 16.4319 21.4479 15.5681 21.6935 14.8169C22.1541 13.4648 22.7836 11.9249 23.5819 10.1972C24.3803 8.46948 25.2861 6.8169 26.2994 5.23944C27.3434 3.66197 28.4641 2.46009 29.6616 1.6338C27.6351 1.82159 25.6699 2.21596 23.7662 2.8169C21.8931 3.38028 20.2964 4.16901 18.9761 5.1831C17.6557 6.19718 16.796 7.47418 16.3968 9.01408C16.3661 9.20188 16.32 9.40845 16.2586 9.6338C16.2279 9.8216 16.2126 10.0094 16.2126 10.1972C16.2126 10.9484 16.4122 11.5681 16.8113 12.0563C17.2412 12.507 17.7479 12.7324 18.3313 12.7324C19.0989 12.7324 19.7437 12.338 20.2657 11.5493C20.8184 10.7606 21.1408 9.93427 21.2329 9.07042C21.2329 8.99531 21.2329 8.93897 21.2329 8.90141C21.2637 8.86385 21.2637 8.82629 21.2329 8.78873C21.1715 8.71362 21.1408 8.6385 21.1408 8.56338C21.1408 8.22535 21.2483 8.05634 21.4632 8.05634C21.6168 8.05634 21.7549 8.16901 21.8778 8.39437C22.0313 8.58216 22.0927 8.84507 22.062 9.1831C21.9699 10.7981 21.5093 12 20.6802 12.7887C19.8512 13.5399 18.9607 13.9155 18.0089 13.9155C17.1491 13.9155 16.3661 13.5962 15.6599 12.9577C14.9536 12.2817 14.6005 11.3239 14.6005 10.0845C14.6005 9.67136 14.6466 9.23944 14.7387 8.78873C14.9844 7.51174 15.5371 6.40376 16.3968 5.46479C17.2566 4.52582 18.2852 3.75587 19.4827 3.15493C20.6802 2.55399 21.9392 2.06573 23.2595 1.69014C24.5799 1.31455 25.8695 1.03286 27.1284 0.84507C28.3874 0.657277 29.4774 0.5446 30.3986 0.507042C30.767 0.507042 31.2123 0.507042 31.7343 0.507042C32.2563 0.469484 32.6247 0.450705 32.8397 0.450705C32.9011 0.450705 32.9932 0.450705 33.116 0.450705C33.2696 0.450705 33.3617 0.469484 33.3924 0.507042C33.4845 0.5446 33.5306 0.619718 33.5306 0.732395C33.5306 0.88263 33.4538 0.995306 33.3003 1.07042C33.2696 1.07042 32.9625 1.31455 32.3791 1.80282C31.7957 2.29108 31.0588 3.06103 30.1683 4.11268C29.3085 5.16432 28.4334 6.51643 27.543 8.16902C26.6832 9.78404 25.9463 11.7559 25.3321 14.0845C25.2093 14.5728 25.0712 15.0798 24.9176 15.6056C24.7948 16.0939 24.672 16.5822 24.5492 17.0704C24.7641 16.9577 25.0097 16.9014 25.2861 16.9014C25.716 16.9014 26.1766 17.0704 26.6678 17.4085C27.1898 17.7465 27.6504 18.1972 28.0496 18.7606C28.0803 18.8357 28.1417 18.9296 28.2338 19.0423L28.2799 19.1549C29.8152 18.2535 31.5807 16.6948 33.5766 14.4789C35.6032 12.2629 37.7372 9.67136 39.9787 6.70423C41.9746 4.03756 43.7095 2.25352 45.1833 1.35211C46.6572 0.450704 47.8701 0 48.822 0C49.7124 0 50.4033 0.225353 50.8946 0.676058C51.3859 1.12676 51.6929 1.50235 51.8158 1.80282C51.9386 2.10329 52 2.34742 52 2.53521C52 2.9108 51.8465 3.09859 51.5394 3.09859C51.2938 3.09859 51.0788 2.98592 50.8946 2.76056C50.7104 2.49765 50.4033 2.3662 49.9734 2.3662C49.2979 2.3662 48.3921 2.723 47.256 3.43662C46.1199 4.11268 44.907 5.03287 43.6174 6.19719C42.3277 7.3615 41.0688 8.6385 39.8406 10.0282C38.7966 11.23 37.6912 12.507 36.5244 13.8592C35.3575 15.1737 34.1293 16.4131 32.8397 17.5775C31.5807 18.7042 30.2758 19.6056 28.9247 20.2817C29.4774 21.446 30.1222 22.7793 30.8592 24.2817C31.5961 25.784 32.3791 27.3803 33.2081 29.0704C34.0986 30.8357 35.0812 32.4507 36.1559 33.9155C37.2613 35.3803 38.5356 36.4319 39.9787 37.0704C40.5314 37.2958 41.0534 37.4085 41.5447 37.4085C42.5273 37.4085 43.341 37.0516 43.9858 36.338C44.6614 35.662 45.0145 34.8732 45.0452 33.9718C45.0452 33.6338 45.1987 33.4648 45.5058 33.4648C45.6593 33.4648 45.7821 33.5211 45.8742 33.6338C45.997 33.7465 46.0431 33.9155 46.0124 34.1408C45.951 35.2676 45.5979 36.2629 44.9531 37.1268C44.3389 38.0282 43.5406 38.723 42.558 39.2113C41.6061 39.7371 40.5621 40 39.426 40C38.8426 40 38.2592 39.9249 37.6758 39.7746C37.0924 39.6244 36.509 39.3803 35.9256 39.0423C34.7281 38.3662 33.6841 37.3146 32.7936 35.8873C31.9339 34.4601 31.1662 32.8639 30.4907 31.0986C29.8459 29.2958 29.2471 27.5117 28.6944 25.7465C28.1724 23.9437 27.6504 22.3662 27.1284 21.0141C26.7293 21.1268 26.3301 21.1831 25.9309 21.1831C24.9176 21.1831 24.196 20.7887 23.7662 20C23.4284 21.2019 23.0446 22.385 22.6147 23.5493C22.2155 24.7136 21.7549 25.8404 21.2329 26.9296C20.2197 29.0329 18.9454 30.9296 17.4101 32.6197C15.8748 34.3099 13.925 35.4742 11.5607 36.1127C10.9773 36.2629 10.4246 36.3756 9.90257 36.4507C9.41128 36.5258 8.91999 36.5634 8.4287 36.5634Z"
          fill="#EBE2C3"
        />
      </svg>
    </Link>
  );
}

function MobileLangSwitcher({
  locale,
  onSelect,
}: {
  locale: Locale;
  onSelect: (locale: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`bg-[#183B62] px-4 py-2 text-[#ebe2c3] text-[16px] flex items-center gap-1.5 ${open ? "rounded-t-xl" : "rounded-xl"}`}
      >
        {labels[locale]}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="#ebe2c3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 bg-[#172535] rounded-b-xl overflow-hidden z-50 min-w-full">
          {locales
            .filter((item) => item !== locale)
            .map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onSelect(item);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-[16px] transition-colors text-gray-400 hover:text-[#ebe2c3]"
              >
                {labels[item]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = normalizeLocale(
    getLocaleFromPathname(pathname) || searchParams.get("lang"),
  );
  const activePathname = stripLocaleFromPathname(pathname);

  const selectLocale = (nextLocale: Locale) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextLocale === defaultLocale) {
      params.delete("lang");
    } else {
      params.set("lang", nextLocale);
    }

    const query = params.toString();
    const nextPathname = getLocalizedHref(activePathname, nextLocale);
    window.dispatchEvent(new CustomEvent("routeChangeStart"));
    router.push(`${nextPathname}${query ? `?${query}` : ""}`);
  };

  const t = translations[locale];
  const navLinks = [
    { href: "/wedding", label: t.common.wedding },
    { href: "/anniversary", label: t.common.anniversary },
    { href: "/events", label: t.common.events },
    { href: "/book", label: t.common.book },
    { href: "/contacts", label: t.common.contacts },
  ];

  return (
    <header className="bg-[#0D1D31] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-[58px] h-[84px] lg:h-[106px] flex items-center justify-between">
        <Logo href={getLocalizedHref("/", locale)} />

        <nav className="hidden lg:flex items-center gap-[42px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getLocalizedHref(link.href, locale)}
              className={`text-[20px] font-normal transition-colors ${
                activePathname === link.href
                  ? "text-[#F2E2AC]"
                  : "text-white hover:text-[#F2E2AC]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <MobileLangSwitcher locale={locale} onSelect={selectLocale} />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label={t.common.menu}
          >
            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-[#0D1D31] border-t border-[#172535]">
          <ul className="flex flex-col px-8 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={getLocalizedHref(link.href, locale)}
                  className={`text-[18px] py-2 flex justify-center transition-colors ${
                    activePathname === link.href ? "text-[#F2E2AC]" : "text-white"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
