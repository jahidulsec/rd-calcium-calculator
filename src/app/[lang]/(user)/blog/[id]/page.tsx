import MmarkdownViewer from "@/components/markdown/markdown-viewer";
import NavUser from "@/components/nav/nav-user";
import { Section } from "@/components/section/section";
import { blogs } from "@/lib/blog";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

export default async function BlogPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);

  const { id } = await params;

  const blog = await blogs[Number(id) - 1](lang as Locales);

  if (!blog) notFound();

  return (
    <>
      <NavUser
        lang={lang as Locales}
        showBackButton
        pageTitle={dict.blog.pageTitle}
      />
      <Section>
        <MmarkdownViewer content={blog.props.content} />
      </Section>
    </>
  );
}
