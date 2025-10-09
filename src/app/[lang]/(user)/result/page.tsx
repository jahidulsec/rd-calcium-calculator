import NavUser from "@/components/nav/nav-user";
import ProgressSection from "@/features/result/components/progress-section";
import React from "react";

export default function ResultPage() {
  return (
    <>
      <NavUser showBackButton pageTitle="Result Page" />

      <ProgressSection />
    </>
  );
}
