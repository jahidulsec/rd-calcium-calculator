import MarkdownViewer from "@/components/markdown/markdown-viewer";
import NavUser from "@/components/nav/nav-user";
import { Section } from "@/components/section/section";
import { getBlog } from "@/features/blog/servers/blog";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import { notFound } from "next/navigation";
import React from "react";

export default async function BlogPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);

  const { id } = await params;

  const blog = await getBlog(id as string);

  if (!blog) notFound();

  return (
    <>
      <NavUser
        lang={lang as Locales}
        showBackButton
        pageTitle={dict.blog.pageTitle}
      />
      <Section>
        <MarkdownViewer
          content={
            lang === "bn"
              ? blog.data?.bn_details ?? ""
              : blog.data?.en_details ?? ""
          }
        />
      </Section>
    </>
  );
}
