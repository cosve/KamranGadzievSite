import AudioPlayer from "@/components/AudioPlayer";
import LeadSuccessToast from "@/components/LeadSuccessToast";
import VideoPlayer from "@/components/VideoPlayer";
import MomentsCarousel from "@/components/MomentsCarousel";
import SkillSection from "@/components/SkillSection";
import FormSection from "@/components/FormSection";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getLocalizedHref, getLocaleFromSearchParams, type SearchParamsInput, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildPageMetadata, personJsonLd } from "@/lib/seo";
import { translations } from "@/lib/translations";

const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+7 (922) 325-66-51";

const momentImages = [
  "/Moments1.jpg",
  "/Moments2.jpg",
  "/Moments3.jpg",
  "/Moments4.jpg",
];

function HeroSection({ locale }: { locale: Locale }) {
  const t = translations[locale].home;

  return (
    <section className="relative">
      <div className="relative min-h-[466px] lg:min-h-[667px] flex flex-col overflow-hidden">
        <Image
          src="/MainImage.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top z-[-1]"
        />
        <div className="absolute inset-0 bg-black/60 z-[-1]" />

        <div className="relative flex-1 flex flex-col items-center justify-center pt-21 pb-16 lg:pt-26.5 px-4 sm:px-8 lg:px-14.5">
          <div className="text-center">
            <h1
              className="font-playfair font-black text-white text-balance
                         text-[19px] sm:text-[22px] lg:text-[40px] tracking-[0.04em] uppercase mb-4"
            >
              {t.heroTitle}
            </h1>
            <p className="text-white font-medium text-[15px] lg:text-[20px] uppercase mb-8 lg:mb-10 leading-snug">
              {t.heroLead}{" "}
              <span className="lg:inline block">{t.heroLeadAccent}</span>
            </p>
            <Link
              href={getLocalizedHref("/#form", locale)}
              className="inline-block bg-[#183b62] border border-[#ebe2c3] text-[#ebe2c3]
                         font-bold text-[14px] lg:text-[16px] uppercase px-8 py-3 rounded-xl
                         hover:bg-[#1f4a7a] transition-colors"
            >
              {t.heroButton}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 -translate-y-1/2 max-w-7xl mx-auto px-8 lg:px-14.5">
        <AudioPlayer locale={locale} />
      </div>
    </section>
  );
}

function MomentsSection({ locale }: { locale: Locale }) {
  const t = translations[locale].home;

  return (
    <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5">
      <h2 className="text-white font-bold text-[20px] lg:text-[24px] mb-6 lg:mb-8">
        {t.momentsTitle}
      </h2>

      <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-4 h-125">
        {momentImages.slice(0, 3).map((image, index) => (
          <div
            key={image}
            className={`${index === 2 ? "row-span-2" : "row-span-1"} rounded-xl overflow-hidden relative`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-xl" />
          </div>
        ))}
        <div className="col-span-2 row-span-1 rounded-xl overflow-hidden relative">
          <Image
            src={momentImages[3]}
            alt=""
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 rounded-xl" />
        </div>
      </div>

      <MomentsCarousel images={momentImages} slideLabel={t.momentSlide} />
    </section>
  );
}

function PoemSection({ locale }: { locale: Locale }) {
  const t = translations[locale].home;

  return (
    <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5">
      <h2 className="text-white font-bold text-[20px] lg:text-[24px] mb-6 lg:mb-8">
        {t.poemTitle}
      </h2>
      <div className="bg-[#172535] rounded-[20px] overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-90.75 lg:shrink-0 h-60 lg:h-auto overflow-hidden rounded-t-[20px] lg:rounded-t-none lg:rounded-l-[20px]">
          <Image
            src="/EventAsPoemImage.jpg"
            width={363}
            height={500}
            sizes="(min-width: 1024px) 363px, 100vw"
            alt={t.poemAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-6 lg:p-10 gap-6">
          <div className="flex flex-col gap-4">
            {t.poemText.map((paragraph) => (
              <p
                key={paragraph}
                className="text-white text-[14px] lg:text-[20px] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1 self-stretch bg-[#ebe2c3] rounded-full shrink-0" />
            <p className="text-[#ebe2c3] font-medium text-[15px] lg:text-[20px] italic">
              &ldquo;{t.poemQuote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReadingSection({ locale }: { locale: Locale }) {
  const t = translations[locale].home;

  return (
    <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5">
      <h2 className="text-white font-bold text-[20px] lg:text-[24px] mb-6 lg:mb-8">
        {t.readingTitle}
      </h2>
      <div className="bg-[#172535] rounded-[20px] overflow-hidden flex flex-col lg:flex-row-reverse">
        <div className="lg:flex-1 aspect-video lg:aspect-auto overflow-hidden rounded-t-[20px] lg:rounded-t-none lg:rounded-r-[20px]">
          <VideoPlayer
            src="/PoetryInSoundVideo.mp4"
            poster="/VideoPreview.avif"
            fullscreenLabel={t.fullscreen}
          />
        </div>
        <div className="lg:w-97.5 lg:shrink-0 flex flex-col justify-between p-6 lg:p-10 gap-6">
          <div className="flex flex-col gap-5">
            {t.readingText.map((paragraph) => (
              <p
                key={paragraph}
                className="text-white text-[14px] lg:text-[20px] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/AuthorReadingMicrophone.svg"
              width={20}
              height={20}
              alt=""
              className="shrink-0"
            />
            <span className="text-[#ebe2c3] text-[16px] lg:text-[20px]">
              {t.authorReading}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

type HomeProps = {
  searchParams?: SearchParamsInput;
};

export async function generateMetadata({
  searchParams,
}: HomeProps): Promise<Metadata> {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale];

  return buildPageMetadata({
    locale,
    path: "/",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Home({ searchParams }: HomeProps) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const t = translations[locale];

  return (
    <main className="flex-1 w-full">
      <JsonLd
        data={[
          personJsonLd(locale),
          breadcrumbJsonLd({
            locale,
            items: [{ name: t.common.home, path: "/" }],
          }),
        ]}
      />
      <Suspense fallback={null}>
        <LeadSuccessToast phone={contactPhone} />
      </Suspense>
      <HeroSection locale={locale} />
      <div className="flex flex-col gap-[48px] lg:gap-[80px] w-full">
        <SkillSection locale={locale} />
        <MomentsSection locale={locale} />
        <PoemSection locale={locale} />
        <ReadingSection locale={locale} />
        <FormSection locale={locale} successPath="/" />
      </div>
    </main>
  );
}
