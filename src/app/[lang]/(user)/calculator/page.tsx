import NavUser from "@/components/nav/nav-user";
import { Section } from "@/components/section/section";
import { PageDescription } from "@/components/typography/heading";
import CardSection from "@/features/calculator/components/card-section";
import TabSection from "@/features/calculator/components/tab-section";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function CalculatorPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);

  return (
    <>
      <NavUser showBackButton pageTitle={dict.calculator.pagetitle} />
      <Section className="-mt-6">
        <PageDescription>
          {dict.calculator.subtitle}
        </PageDescription>
      </Section>

      <TabSection data={dict.category} />

      <CardSection data={dict} />
    </>
  );
}
