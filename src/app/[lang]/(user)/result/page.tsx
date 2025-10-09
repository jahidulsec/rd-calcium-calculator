import NavUser from "@/components/nav/nav-user";
import ProgressSection from "@/features/result/components/progress-section";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function ResultPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return (
    <>
      <NavUser showBackButton pageTitle={dict.result.sectionTitle} />

      <ProgressSection data={dict.result} />
    </>
  );
}
