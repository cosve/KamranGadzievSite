import ServicePage from "@/components/ServicePage";
import { getLocaleFromSearchParams, type SearchParamsInput } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { translations } from "@/lib/translations";
import type { Metadata } from "next";

type WeddingPageProps = {
  searchParams?: SearchParamsInput;
};

export async function generateMetadata({
  searchParams,
}: WeddingPageProps): Promise<Metadata> {
  const locale = await getLocaleFromSearchParams(searchParams);
  const page = translations[locale].pages.wedding;

  return buildPageMetadata({
    locale,
    path: "/wedding",
    title: page.metaTitle,
    description: page.description,
  });
}

export default async function WeddingPage({ searchParams }: WeddingPageProps) {
  const locale = await getLocaleFromSearchParams(searchParams);

  return (
    <ServicePage locale={locale} page="wedding" successPath="/wedding" />
  );
}
