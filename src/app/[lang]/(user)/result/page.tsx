// "use client";

import NavUser from "@/components/nav/nav-user";
import CircularProgress from "@/components/progress/circular-progress";
import { Section } from "@/components/section/section";
import ProgressSection from "@/features/result/components/progress-section";
import { Circle } from "lucide-react";
// import { useCalculatorContext } from "@/providers/calculator-provider";
import React from "react";

export default function ResultPage() {
  // const { foods } = useCalculatorContext();

  // const totalConsumed = foods.reduce(
  //   (prev, curr) => prev + curr.calcium_mg * curr.qty,
  //   0
  // );

  const status = "Hypocalcemia";

  return (
    <>
      <NavUser showBackButton pageTitle="Result Page" />
      <ProgressSection />
      <Section className="flex justify-center items-center flex-col gap-5 mt-6">
        <p className="text-center text-sm text-balance font-medium">
          Your % of RDA (Recommended Dietary <br /> Allowance)fulfilled?
        </p>
        <CircularProgress progress={15} />
        <div className="bg-chart-5/10 text-chart-5 w-full flex justify-center items-center gap-2 h-10 rounded-md">
          <Circle className="fill-chart-4/50 text-chart-4/50 size-3.5" /> <p className="font-semibold">You have {status}</p>
        </div>
      </Section>
    </>
  );
}
