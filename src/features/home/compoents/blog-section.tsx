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

const blogs = [
  {
    title: "Without Vitamin D, Your Body Can’t Absorb Calcium Properly",
    readTime: 5,
    desc: "Track, manage, and improve your calcium intake with one smart app.",
    image: "/images/blog1.jpg",
  },
  {
    title: "The Smart Way to Take Care of Your Calcium Needs",
    readTime: 5,
    desc: "Stay on top of your bone health with reminders, tracking, and expert tips.",
    image: "/images/blog2.jpg",
  },
];

export default function BlogSection() {
  return (
    <Section className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-5">
        <PageHeading className="font-bold">Our Blogs & Tips</PageHeading>
        <Button asChild variant={"link"} className="text-secondary">
          <Link href={`/blog`}>See All</Link>
        </Button>
      </div>

      <CardSection data={blogs} />
    </Section>
  );
}

const CardSection = ({ data }: { data: typeof blogs }) => {
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
                    {item.readTime} min read
                  </Badge>
                  <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.desc}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
