import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getLocalizedHref, getLocaleFromSearchParams, type SearchParamsInput } from "@/lib/i18n";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { translations } from "@/lib/translations";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "yomm@kamrangadzhyev.com";
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+7 (922) 325-66-51";

type PrivacyPageProps = {
  searchParams?: SearchParamsInput;
};

export async function generateMetadata({
  searchParams,
}: PrivacyPageProps): Promise<Metadata> {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale];

  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: `${t.privacyPage.title} | ${t.meta.title}`,
    description: t.privacyPage.description,
  });
}

export default async function PrivacyPage({ searchParams }: PrivacyPageProps) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale];

  return (
    <main className="flex-1 bg-[#0a1521]">
      <JsonLd
        data={breadcrumbJsonLd({
          locale,
          items: [
            { name: t.common.home, path: "/" },
            { name: t.privacyPage.title, path: "/privacy" },
          ],
        })}
      />
      <section className="max-w-5xl mx-auto px-8 lg:px-14.5 py-12 lg:py-18">
        <Link
          href={getLocalizedHref("/", locale)}
          className="inline-flex text-[#ebe2c3] text-[14px] lg:text-[16px] mb-8 hover:text-white transition-colors"
        >
          {t.common.backHome}
        </Link>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-black text-white text-[20px] leading-tight uppercase">
              {t.privacyPage.title}
            </h1>
          </div>

          <div className="bg-[#172535] rounded-[20px] p-6 lg:p-10 flex flex-col gap-7">
            <p className="text-white text-[15px] lg:text-[18px] leading-relaxed">
              {t.privacyPage.published}
            </p>
            <p className="text-white/85 text-[15px] lg:text-[18px] leading-relaxed">
              {t.privacyPage.contactPrefix} {contactEmail}, {contactPhone}.
            </p>

            {t.privacyPage.sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-3">
                <h2 className="text-white font-bold text-[20px] lg:text-[24px]">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-white/85 text-[15px] lg:text-[18px] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
