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

export default function BlogSection({
  data,
}: {
  data: DictionaryType["home"];
}) {
  return (
    <Section className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-5">
        <PageHeading className="font-bold">{data.blogSectionTitle}</PageHeading>
        <Button asChild variant={"link"} className="text-secondary">
          <Link href={`/blog`}>{data.blogAllButton}</Link>
        </Button>
      </div>

      <CardSection data={data.blogs} />
    </Section>
  );
}

const CardSection = ({ data }: { data: DictionaryType["home"]["blogs"] }) => {
  return (
    <div className="">
      <Carousel>
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-[60%]">
              <div className="bg-muted/50 p-2 rounded-md flex flex-col gap-3">
                {/* image */}
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <Image fill src={item.image} alt="Blog" objectFit="cover" />
                </div>

                {/* content */}
                <div className="flex flex-col gap-2">
                  <Badge
                    variant={"outline"}
                    className="bg-secondary/15 text-primary"
                  >
                    {item.readTime}
                  </Badge>
                  <Link href={`/blog/${item.id}`} className="hover:underline">
                    <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
