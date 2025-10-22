import NavUser from "@/components/nav/nav-user";
import TablePagination from "@/components/pagintaion/pagination";
import { Section } from "@/components/section/section";
import CardSection from "@/features/blog/components/card-section";
import { getBlogs } from "@/features/blog/servers/blog";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params, SearchParams } from "@/types/search-params";
import React, { Suspense } from "react";

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: params;
  searchParams: SearchParams;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);
  return (
    <>
      <NavUser
        lang={lang as Locales}
        showBackButton
        pageTitle={dict.blog.pageTitle}
      />

      <Suspense>
        <BlogSection searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const BlogSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, size } = await searchParams;
  const blogs = await getBlogs(Number(page), Number(size));

  return (
    <>
      <CardSection data={blogs.data} />
      <TablePagination className="px-6 md:justify-center" count={blogs?.count ?? 0} />
    </>
  );
};
