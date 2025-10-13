import OnboardingSection from "@/features/auth/components/onboarding-section";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function OnBoardingPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return <OnboardingSection data={dict.onboarding} />;
}
