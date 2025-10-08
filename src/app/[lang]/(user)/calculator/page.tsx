import NavUser from "@/components/nav/nav-user";
import { Section } from "@/components/section/section";
import { PageDescription } from "@/components/typography/heading";
import TabSection from "@/features/calculator/components/tab-section";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function CalculatorPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);

  return (
    <>
      <NavUser showBackButton pageTitle="Add Your Food" />
      <Section className="-mt-6">
        <PageDescription>
          Calculate how much you usually consume each day for each food type.
          Below are the approximate calcium amounts per standard serving.
        </PageDescription>
      </Section>

      <TabSection data={dict.category} />
    </>
  );
}
