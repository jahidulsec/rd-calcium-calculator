import VerificationForm from "@/features/auth/components/verification-form";
import VerificationHeader from "@/features/auth/components/verification-header";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function VerifyPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return (
    <>
      <VerificationHeader data={dict.verification} />
      <VerificationForm data={dict.verificationForm} />
    </>
  );
}
