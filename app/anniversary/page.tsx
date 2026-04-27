import ServicePage from "@/components/ServicePage";
import { getLocaleFromSearchParams, type SearchParamsInput } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { translations } from "@/lib/translations";
import type { Metadata } from "next";

type AnniversaryPageProps = {
  searchParams?: SearchParamsInput;
};

export async function generateMetadata({
  searchParams,
}: AnniversaryPageProps): Promise<Metadata> {
  const locale = await getLocaleFromSearchParams(searchParams);
  const page = translations[locale].pages.anniversary;

  return buildPageMetadata({
    locale,
    path: "/anniversary",
    title: page.metaTitle,
    description: page.description,
  });
}

export default async function AnniversaryPage({
  searchParams,
}: AnniversaryPageProps) {
  const locale = await getLocaleFromSearchParams(searchParams);

  return (
    <ServicePage
      locale={locale}
      page="anniversary"
      successPath="/anniversary"
    />
  );
}
