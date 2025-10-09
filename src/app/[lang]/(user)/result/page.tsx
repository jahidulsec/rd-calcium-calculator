// "use client";

import NavUser from "@/components/nav/nav-user";
import ProgressSection from "@/features/result/components/progress-section";
// import { useCalculatorContext } from "@/providers/calculator-provider";
import React from "react";

export default function ResultPage() {
  // const { foods } = useCalculatorContext();

  // const totalConsumed = foods.reduce(
  //   (prev, curr) => prev + curr.calcium_mg * curr.qty,
  //   0
  // );

  return (
    <>
      <NavUser showBackButton pageTitle="Result Page" />
      <ProgressSection />
    </>
  );
}
