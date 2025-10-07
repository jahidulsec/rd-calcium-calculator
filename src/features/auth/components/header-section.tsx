import { BackButton } from "@/components/buttons/button";
import { PageHeading, PageSubtitle } from "@/components/typography/heading";
import React from "react";

export default function HeaderSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="max-w-md mx-auto p-6 flex flex-col gap-3">
      <BackButton />
      <PageHeading>{title}</PageHeading>
      <PageSubtitle>{subtitle}</PageSubtitle>
    </header>
  );
}
