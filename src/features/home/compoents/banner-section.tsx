"use client"

import { Section } from "@/components/section/section";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function BannerSection() {
  const data = ["/images/banner1.jpg", "/images/banner2.jpg"];

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
            <CarouselItem key={item} className="pt-1 basis-[80%]">
              <div className="relative w-full aspect-[16/6] rounded-md overflow-hidden bg-muted">
                <Image fill src={item} alt="Banner" objectFit="cover" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
