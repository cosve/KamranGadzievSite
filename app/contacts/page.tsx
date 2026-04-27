import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import LeadSuccessToast from "@/components/LeadSuccessToast";
import FormSection from "@/components/FormSection";
import JsonLd from "@/components/JsonLd";
import { getLocaleFromSearchParams, type SearchParamsInput } from "@/lib/i18n";
import { breadcrumbJsonLd, buildPageMetadata, personJsonLd } from "@/lib/seo";
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

type ContactsPageProps = {
  searchParams?: SearchParamsInput;
};

export async function generateMetadata({
  searchParams,
}: ContactsPageProps): Promise<Metadata> {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale];

  return buildPageMetadata({
    locale,
    path: "/contacts",
    title: `${t.contactsPage.title} | ${t.meta.title}`,
    description: t.contactsPage.description,
  });
}

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale];

  return (
    <main className="flex-1 w-full">
      <JsonLd
        data={[
          personJsonLd(locale),
          breadcrumbJsonLd({
            locale,
            items: [
              { name: t.common.home, path: "/" },
              { name: t.contactsPage.title, path: "/contacts" },
            ],
          }),
        ]}
      />
      <Suspense fallback={null}>
        <LeadSuccessToast phone={contactPhone} />
      </Suspense>

      <div className="flex flex-col gap-12 lg:gap-20 w-full py-8 lg:py-12">
        <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5">
          <h1 className="text-white font-bold text-[20px] lg:text-[24px] mb-6 lg:mb-8">
            {t.contactsPage.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-[#172535] rounded-[20px] p-6 lg:p-10 flex flex-col gap-6">
              <h2 className="text-white font-bold text-[18px] lg:text-[20px]">
                {t.contactsPage.direct}
              </h2>

              <div className="flex flex-col gap-4">
                <a
                  href={`tel:${contactPhoneHref}`}
                  className="group flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1d334b] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.5 11.5 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.01l-2.2 2.21Z" fill="#ebe2c3"/>
                    </svg>
                  </div>
                  <span className="text-[#ebe2c3] text-[16px] lg:text-[18px] font-medium group-hover:opacity-80 transition-opacity">
                    {contactPhone}
                  </span>
                </a>

                <a
                  href={`mailto:${contactEmail}`}
                  className="group flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1d334b] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#ebe2c3" strokeWidth="1.8"/>
                      <path d="M2 8l10 7 10-7" stroke="#ebe2c3" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-[#ebe2c3] text-[16px] lg:text-[18px] font-medium group-hover:opacity-80 transition-opacity break-all">
                    {contactEmail}
                  </span>
                </a>
              </div>

              <div className="mt-auto pt-4 border-t border-[#1d334b]">
                <p className="text-white/50 text-[13px] lg:text-[14px] leading-relaxed">
                  {t.contactsPage.directText}
                </p>
              </div>
            </div>

            <div className="bg-[#172535] rounded-[20px] p-6 lg:p-10 flex flex-col gap-6">
              <h2 className="text-white font-bold text-[18px] lg:text-[20px]">
                {t.common.social}
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center gap-3 rounded-[14px] bg-[#1d334b] hover:bg-[#183b62]
                               border border-transparent hover:border-[#ebe2c3]/20
                               px-4 h-14 transition-all"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="object-contain shrink-0"
                    />
                    <span className="text-white text-[15px] lg:text-[16px]">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-[#1d334b]">
                <p className="text-white/50 text-[13px] lg:text-[14px] leading-relaxed">
                  {t.contactsPage.socialText}
                </p>
              </div>
            </div>
          </div>
        </section>

        <FormSection locale={locale} successPath="/contacts" />
      </div>
    </main>
  );
}
