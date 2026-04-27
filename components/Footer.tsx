"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { getLocaleFromPathname, getLocalizedHref, normalizeLocale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "yomm@kamrangadzhyev.com";
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+7 (922) 325-66-51";
const contactPhoneHref =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF ?? "+79223256651";
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#";
const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#";
const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL ?? "#";

const socials = [
  { label: "Instagram", href: instagramUrl, icon: "/InstagramEmblem.svg" },
  { label: "YouTube", href: youtubeUrl, icon: "/YoutubeEmblem.svg" },
  { label: "Tiktok", href: tiktokUrl, icon: "/TiktokEmblem.svg" },
];

export default function Footer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = normalizeLocale(
    getLocaleFromPathname(pathname) || searchParams.get("lang"),
  );
  const t = translations[locale];

  return (
    <footer className="bg-[#122233]">
      <div className="max-w-7xl mx-auto px-8 lg:px-37.25 py-10 lg:py-15.25">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-28.25">
          <div className="flex flex-col gap-2">
            <p className="text-white text-[16px] lg:text-[20px] font-medium mb-2">
              {t.common.contacts}
            </p>
            <a
              href={`tel:${contactPhoneHref}`}
              className="text-white text-[14px] lg:text-[16px] hover:text-[#ebe2c3] transition-colors"
            >
              {contactPhone}
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="text-white text-[14px] lg:text-[16px] hover:text-[#ebe2c3] transition-colors"
            >
              {contactEmail}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white text-[16px] lg:text-[20px] font-medium">
              {t.common.social}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-12 h-12 rounded-[12px] bg-[#183b62] hover:bg-[#122e4f] shadow-sm hover:shadow-md transition-all group"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={24}
                    height={24}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white text-[16px] lg:text-[20px] font-medium mb-2">
              {t.common.legal}
            </p>
            <Link
              href={getLocalizedHref("/privacy", locale)}
              className="text-white text-[14px] lg:text-[16px] hover:text-[#ebe2c3] transition-colors"
            >
              {t.common.privacy}
            </Link>
            <p className="text-white text-[14px] lg:text-[16px] opacity-70">
              {t.common.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
