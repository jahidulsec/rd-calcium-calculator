import { DashboardSection } from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import BlogForm from "@/features/blog/components/blog-form";
import React from "react";

export default function AddBlogPage() {
  return (
    <DashboardSection className="flex flex-col gap-6">
      <DashbaordHeading>Create Blog</DashbaordHeading>

      <BlogForm />
    </DashboardSection>
  );
}
