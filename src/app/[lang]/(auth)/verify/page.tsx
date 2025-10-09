import HeaderSection from "@/features/auth/components/header-section";
import VerificationForm from "@/features/auth/components/verification-form";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function VerifyPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return (
    <>
      <HeaderSection
        title={dict.verification.pageTitle}
        subtitle={`${dict.verification.subtitle} ********24`}
      />
      <VerificationForm data={dict.verificationForm} />
    </>
  );
}
