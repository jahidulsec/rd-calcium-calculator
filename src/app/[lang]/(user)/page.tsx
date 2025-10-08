import NavUser from "@/components/nav/nav-user";
import BannerSection from "@/features/home/compoents/banner-section";
import BlogSection from "@/features/home/compoents/blog-section";
import CalculatorSection from "@/features/home/compoents/calculator-section";
import React from "react";

export default function HomePage() {
  return (
    <>
      <NavUser />
      <BannerSection />
      <CalculatorSection />
      <BlogSection />
    </>
  );
}
