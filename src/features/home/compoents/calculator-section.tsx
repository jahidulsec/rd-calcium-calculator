import { Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/dictionaries";
import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HomeCalculatorSection({
  data,
}: {
  data: DictionaryType["home"];
}) {
  return (
    <Section>
      <div className="flex flex-col gap-6 bg-gradient-to-b from-violet-300 to-primary p-4 py-6 rounded-md">
        <h2 className="text-center text-primary-foreground font-semibold">
          {data.cardButton}
        </h2>
        <Button
          variant={"outline"}
          size={"lg"}
          className="text-primary font-bold"
          asChild
        >
          <Link href={`/calculator`}>{data.cardTtitle}</Link>
        </Button>
      </div>
    </Section>
  );
}
