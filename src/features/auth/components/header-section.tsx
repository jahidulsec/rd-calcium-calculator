import { BackButton } from "@/components/buttons/button";
import { PageHeading } from "@/components/typography/heading";
import React from "react";

export default function HeaderSection({ title }: { title: string }) {
  return (
    <header className="max-w-md mx-auto p-6 flex flex-col gap-3">
      <BackButton />
      <PageHeading className="text-foreground">{title}</PageHeading>
    </header>
  );
}
