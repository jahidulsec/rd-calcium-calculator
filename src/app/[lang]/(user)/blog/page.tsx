import NavUser from "@/components/nav/nav-user";
import CardSection from "@/features/blog/components/card-section";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function BlogPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);
  return (
    <>
      <NavUser
        lang={lang as Locales}
        showBackButton
        pageTitle={dict.blog.pageTitle}
      />

      <CardSection data={dict.home.blogs} />
    </>
  );
}
