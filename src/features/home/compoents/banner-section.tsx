"use client";

import { Section } from "@/components/section/section";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import BannerCard from "@/components/card/banner-card";
import { banner } from "@/generated/prisma";

export default function BannerSection({ data }: { data: banner[] }) {
  // const data = ["/images/banner1.png", "/images/banner2.png"];

  return (
    <Section className="-mt-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id} className="pt-1 basis-[80%]">
              <BannerCard alt="Banner" src={`/api/upload/banner/${item.id}`} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
