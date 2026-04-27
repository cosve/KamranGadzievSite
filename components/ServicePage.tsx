import { Suspense } from "react";
import LeadSuccessToast from "@/components/LeadSuccessToast";
import FormSection from "@/components/FormSection";
import PageGallery from "@/components/PageGallery";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { translations } from "@/lib/translations";

const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+7 (922) 325-66-51";

type ServicePageKind = "wedding" | "anniversary" | "events";

const pageImages = {
  wedding: ["/Wedding1.jpeg", "/Wedding2.jpg", "/Wedding3.jpg"],
  anniversary: ["/Birthday1.jpeg", "/Birthday2.jpg", "/Birthday3.jpg"],
  events: ["/Event1.jpg", "/Event2.avif", "/Event3.jpg"],
} satisfies Record<ServicePageKind, string[]>;

type ServicePageProps = {
  locale: Locale;
  page: ServicePageKind;
  successPath: string;
};

export default function ServicePage({
  locale,
  page,
  successPath,
}: ServicePageProps) {
  const content = translations[locale].pages[page];
  const images = pageImages[page];

  return (
    <main className="flex-1 w-full">
      <JsonLd
        data={[
          serviceJsonLd({
            locale,
            path: successPath,
            name: content.title,
            description: content.description,
          }),
          breadcrumbJsonLd({
            locale,
            items: [
              { name: translations[locale].common.home, path: "/" },
              { name: content.title, path: successPath },
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
            {content.title}
          </h1>

          <PageGallery images={images} />

          <div className="mt-6 lg:mt-9 flex flex-col gap-4 lg:gap-6 text-white text-[14px] lg:text-[20px] leading-relaxed">
            {page === "events" && "quote" in content ? (
              <>
                <p>{content.paragraphs[0]}</p>
                <div className="flex items-start gap-4">
                  <div className="w-[3px] shrink-0 self-stretch bg-[#ebe2c3] rounded-full" />
                  <p className="text-[#ebe2c3] font-medium text-[15px] lg:text-[20px] italic">
                    &ldquo;{content.quote}&rdquo;
                  </p>
                </div>
                {content.paragraphs.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </>
            ) : (
              content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            )}
          </div>
        </section>

        <FormSection locale={locale} successPath={successPath} />
      </div>
    </main>
  );
}
