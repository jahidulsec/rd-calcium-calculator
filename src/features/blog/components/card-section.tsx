import BlogCard from "@/components/card/blog-card";
import { Section } from "@/components/section/section";
import { DictionaryType } from "@/lib/dictionaries";
import React from "react";

export default function CardSection({
  data,
}: {
  data: DictionaryType["home"]["blogs"];
}) {
  return (
    <Section className="flex flex-col gap-6">
      {data.map((item, index) => (
        <BlogCard key={index} {...item} />
      ))}
    </Section>
  );
}
