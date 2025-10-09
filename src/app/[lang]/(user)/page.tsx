import NavUser from "@/components/nav/nav-user";
import BannerSection from "@/features/home/compoents/banner-section";
import BlogSection from "@/features/home/compoents/blog-section";
import CalculatorSection from "@/features/home/compoents/calculator-section";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function HomePage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return (
    <>
      <NavUser showProfile />
      <BannerSection />
      <CalculatorSection data={dict.home} />
      <BlogSection data={dict.home} />
    </>
  );
}
