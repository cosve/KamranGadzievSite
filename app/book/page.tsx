import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { getLocaleFromSearchParams, type SearchParamsInput } from "@/lib/i18n";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { translations } from "@/lib/translations";
import { poems } from "@/lib/poems";

type BookPageProps = {
  searchParams?: SearchParamsInput;
};

export async function generateMetadata({
  searchParams,
}: BookPageProps): Promise<Metadata> {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale].bookPage;
  return buildPageMetadata({
    locale,
    path: "/book",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

function PoemCard({ poem }: { poem: (typeof poems)[number] }) {
  return (
    <article className="rounded-[20px] bg-[#172535] p-6 lg:p-8">
      <h2 className="font-playfair font-bold italic text-[#ebe2c3] text-[20px] lg:text-[26px] mb-6">
        {poem.title}
      </h2>

      <div className="flex flex-col gap-5">
        {poem.stanzas.map((stanza, si) => (
          <div key={si} className="flex flex-col gap-0.5">
            {stanza.map((line, li) => (
              <p
                key={li}
                className="text-white/85 text-[14px] lg:text-[17px] leading-[1.85]"
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale];
  const tb = t.bookPage;

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: tb.title,
    author: {
      "@type": "Person",
      name:
        locale === "ru"
          ? "Кямран Гаджиев"
          : locale === "az"
            ? "Kamran Hacıyev"
            : "Kamran Gadzhiev",
    },
    inLanguage: "az",
    genre: "Poetry",
    description: tb.metaDescription,
  };

  return (
    <main className="flex-1 w-full">
      <JsonLd
        data={[
          bookJsonLd,
          breadcrumbJsonLd({
            locale,
            items: [
              { name: t.common.home, path: "/" },
              { name: tb.breadcrumb, path: "/book" },
            ],
          }),
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5 pt-4 lg:pt-6">
        <div className="bg-[#172535] rounded-[20px] overflow-hidden flex flex-col lg:flex-row-reverse">
          {/* Book cover */}
          <div className="relative min-h-[240px] sm:min-h-[360px] lg:min-h-full lg:w-[460px] lg:shrink-0 bg-[#1d334b]">
            <Image
              src="/BookCover.png"
              alt={tb.title}
              fill
              priority
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-between gap-6 p-6 lg:p-10 lg:flex-1">
            <div className="flex flex-col gap-4">
              <p className="text-[#ebe2c3] font-medium text-[12px] lg:text-[13px] uppercase tracking-[0.14em]">
                {t.bookSection.label}
              </p>
              <h1 className="font-playfair font-black text-white text-[24px] lg:text-[36px] leading-tight">
                {tb.title}
              </h1>
              <p className="text-white/75 text-[14px] lg:text-[17px] leading-relaxed max-w-xl">
                {tb.intro}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#0a1521]/50 rounded-xl px-4 py-3 self-start">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 opacity-60"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="#ebe2c3"
                  strokeWidth="1.2"
                />
                <path
                  d="M8 5v4M8 11v.5"
                  stroke="#ebe2c3"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[#ebe2c3]/60 text-[12px] lg:text-[13px]">
                {tb.poemsNote}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Poems ──────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5 mt-12 lg:mt-20">
        <h2 className="text-white font-bold text-[20px] lg:text-[24px] mb-8 lg:mb-12">
          {tb.poemsHeading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {poems.map((poem) => (
            <PoemCard key={poem.title} poem={poem} />
          ))}
        </div>
      </section>

      {/* ── Preview note ───────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5 mt-12 lg:mt-16 mb-16 lg:mb-24">
        <div className="max-w-2xl border-t border-[#ebe2c3]/15 pt-8 flex items-start gap-4">
          <div className="w-1 shrink-0 self-stretch bg-[#ebe2c3]/30 rounded-full" />
          <p className="text-white/50 text-[13px] lg:text-[14px] leading-relaxed italic">
            {tb.previewNote}
          </p>
        </div>
      </section>

    </main>
  );
}
