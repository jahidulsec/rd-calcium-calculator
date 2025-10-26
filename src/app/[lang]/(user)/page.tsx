import { ErrorBoundary } from "@/components/boundary/error-boundary";
import NavUser from "@/components/nav/nav-user";
import TablePagination from "@/components/pagintaion/pagination";
import { SectionLoading } from "@/components/state/loading";
import { getBanners } from "@/features/banner/servers/banner";
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
      <Suspense fallback={<SectionLoading />}>
        <BannerContainer searchParams={searchParams} />
      </Suspense>
      <CalculatorSection data={dict.home} />
      <Suspense fallback={<SectionLoading />}>
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
  return (
    <ErrorBoundary error={!blogs.success ? new Error(blogs.message) : null}>
      <BlogSection data={data} blog={blogs.data} />
    </ErrorBoundary>
  );
};

const BannerContainer = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, size } = await searchParams;
  const banner = await getBanners(Number(page), Number(size));
  return (
    <ErrorBoundary error={!banner.success ? new Error(banner.message) : null}>
      <BannerSection data={banner.data} />
    </ErrorBoundary>
  );
};
