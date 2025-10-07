"use client";

import React from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Section } from "@/components/section/section";
import Autoplay from "embla-carousel-autoplay";
import { PageHeading } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const imageData = [
  {
    image: "/images/image-1.png",
    desc: `Deficiency may cause weak bones along with conditions like osteogenesis, tetany,
and hypothyroidism.`,
  },
  {
    image: "/images/image-2.png",
    desc: `During pregnancy, calcium deficiency may weaken the mother’s bones, cause tetany
and other complications, and affect the baby’s bone and teeth development.`,
  },
];

export default function OnboardingSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Section className="p-0 w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          setApi={setApi}
        >
          <CarouselContent>
            {imageData.map((item, index) => (
              <CarouselItem key={index}>
                <div className="w-full aspect-square bg-muted pt-10">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={item.image}
                      alt="image"
                      fill
                      objectFit="contain"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-end items-center gap-1 my-3 pr-4">
          {Array.from({ length: count }).map((_, index) => (
            <div
              data-active={index + 1 === current}
              key={index}
              className={`h-2 w-4 rounded-full bg-violet-300 data-[active=true]:w-2 data-[active=true]:bg-secondary transition-all duration-300`}
            ></div>
          ))}
        </div>
      </Section>

      <Section>
        <article className="flex flex-col gap-3 mt-8">
          <PageHeading className="text-center">
            Keep track of your calcium intake, keep your bones healthy.
          </PageHeading>
          <p className="text-center text-sm text-muted-foreground">
            {imageData[current - 1]?.desc}
          </p>

          <Button className="mt-6" asChild size={"lg"}>
            <Link href={"/login"}>
              Calculate Now <ArrowRight />
            </Link>
          </Button>
        </article>
      </Section>
    </>
  );
}
