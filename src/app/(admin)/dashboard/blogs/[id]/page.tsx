import { DashboardSection } from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import BlogForm from "@/features/blog/components/blog-form";
import { getBlog } from "@/features/blog/servers/blog";
import { params } from "@/types/search-params";
import { notFound } from "next/navigation";
import React from "react";

export default async function EditBlogPage({ params }: { params: params }) {
  const { id } = await params;

  const blog = await getBlog(id as string);

  if (!blog || !blog.data) return notFound();

  return (
    <DashboardSection className="flex flex-col gap-6">
      <DashbaordHeading>Edit Blog</DashbaordHeading>

      <BlogForm blog={blog.data} />
    </DashboardSection>
  );
}
