"use client";

import { Section } from "@/components/section/section";
import { useCalculatorContext } from "@/providers/calculator-provider";
import React from "react";

export default function ResultPage() {
  const { foods } = useCalculatorContext();

  const totalConsumed = foods.reduce(
    (prev, curr) => prev + curr.calcium_mg * curr.qty,
    0
  );

  return (
    <Section>
      <p>{totalConsumed}</p>
    </Section>
  );
}
