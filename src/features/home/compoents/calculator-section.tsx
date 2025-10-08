import { Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HomeCalculatorSection() {
  return (
    <Section>
      <div className="flex flex-col gap-6 bg-gradient-to-b from-primary to-violet-300 p-4 rounded-md">
        <h2 className="flex items-center gap-3 text-primary-foreground font-semibold">
          Calculate Now <Info className="fill-muted text-primary" />
        </h2>
        <Button
          variant={"outline"}
          size={"lg"}
          className="text-primary font-bold"
          asChild
        >
          <Link href={`/calculator`}>Measure Your Daily Calcium Intake</Link>
        </Button>
      </div>
    </Section>
  );
}
