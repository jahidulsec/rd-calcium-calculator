"use client";

import React from "react";
import HeaderSection from "./header-section";
import { DictionaryType } from "@/lib/dictionaries";
import { useAuthContext } from "@/providers/auth-provider";

export default function VerificationHeader({
  data,
}: {
  data: DictionaryType["verification"];
}) {
  const { user } = useAuthContext();

  return (
    <>
      <HeaderSection
        title={data.pageTitle}
        subtitle={`${data.subtitle}  ***** ***${user?.mobile.slice(8)}`}
      />
    </>
  );
}
