import NavUser from "@/components/nav/nav-user";
import { getBlogs } from "@/features/blog/servers/blog";
import BannerSection from "@/features/home/compoents/banner-section";
import BlogSection from "@/features/home/compoents/blog-section";
import CalculatorSection from "@/features/home/compoents/calculator-section";
import { DictionaryType, getDictionary, Locales } from "@/lib/dictionaries";
import { params, SearchParams } from "@/types/search-params";
import React, { Suspense } from "react";

export default async function HomePage({
  searchParams,
  params,
}: {
  params: params;
  searchParams: SearchParams;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return (
    <>
      <NavUser lang={lang as Locales} showProfile />
      <BannerSection />
      <CalculatorSection data={dict.home} />
      <Suspense>
        <BlogContainer data={dict.home} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const BlogContainer = async ({
  data,
  searchParams,
}: {
  data: DictionaryType["home"];
  searchParams: SearchParams;
}) => {
  const { page, size } = await searchParams;
  const blogs = await getBlogs(Number(page), Number(size ?? 5));

  return <BlogSection data={data} blog={blogs.data} />;
};
