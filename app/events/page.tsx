import ServicePage from "@/components/ServicePage";
import { getLocaleFromSearchParams, type SearchParamsInput } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { translations } from "@/lib/translations";
import type { Metadata } from "next";

type EventsPageProps = {
  searchParams?: SearchParamsInput;
};

export async function generateMetadata({
  searchParams,
}: EventsPageProps): Promise<Metadata> {
  const locale = await getLocaleFromSearchParams(searchParams);
  const page = translations[locale].pages.events;

  return buildPageMetadata({
    locale,
    path: "/events",
    title: page.metaTitle,
    description: page.description,
  });
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const locale = await getLocaleFromSearchParams(searchParams);

  return <ServicePage locale={locale} page="events" successPath="/events" />;
}
