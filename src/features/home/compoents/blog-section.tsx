"use client";

import { Section } from "@/components/section/section";
import { PageHeading } from "@/components/typography/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DictionaryType } from "@/lib/dictionaries";
import BlogCard from "@/components/card/blog-card";
import { BlogTableProps } from "@/features/blog/components/blog-table";

export default function BlogSection({
  data,
  blog,
}: {
  data: DictionaryType["home"];
  blog: BlogTableProps[];
}) {
  return (
    <Section className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-5">
        <PageHeading className="font-bold">{data.blogSectionTitle}</PageHeading>
        <Button asChild variant={"link"} className="text-secondary">
          <Link href={`/blog`}>{data.blogAllButton}</Link>
        </Button>
      </div>

      <CardSection data={blog} />
    </Section>
  );
}

const CardSection = ({ data }: { data: BlogTableProps[] }) => {
  return (
    <div className="">
      <Carousel>
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-[60%]">
              <BlogCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
