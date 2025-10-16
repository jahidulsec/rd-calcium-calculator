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
import { DictionaryType } from "@/lib/dictionaries";



export default function OnboardingSection({
  data,
}: {
  data: DictionaryType["onboarding"];
}) {
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
            {data.images.map((item, index) => (
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
          <PageHeading className="text-center text-primary text-wrap">
            {data.title}
          </PageHeading>
          <p className="text-center text-sm text-muted-foreground">
            {data.images[current - 1]?.desc}
          </p>

          <Button className="mt-6 font-bold" asChild size={"lg"}>
            <Link href={"/login"}>
              {data.buttonTitle} <ArrowRight />
            </Link>
          </Button>
        </article>
      </Section>
    </>
  );
}
