import HeaderSection from "@/features/auth/components/header-section";
import VerificationForm from "@/features/auth/components/verification-form";
import React from "react";

export default function VerifyPage() {
  return (
    <>
      <HeaderSection
        title="Confirm your Number"
        subtitle={`We sent a code to ********24`}
      />
      <VerificationForm />
    </>
  );
}
