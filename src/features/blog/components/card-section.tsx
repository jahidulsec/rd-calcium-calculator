import BlogCard from "@/components/card/blog-card";
import { Section } from "@/components/section/section";
import React from "react";
import { BlogTableProps } from "./blog-table";

export default function CardSection({
  data,
}: {
  data: BlogTableProps[];
}) {
  return (
    <Section className="flex flex-col gap-6">
      {data.map((item, index) => (
        <BlogCard key={index} {...item} />
      ))}
    </Section>
  );
}
