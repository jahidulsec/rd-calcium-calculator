"use client";

import { Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DictionaryType } from "@/lib/dictionaries";
import { useRouter } from "@bprogress/next/app";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function TabSection({
  data,
}: {
  data: DictionaryType["category"];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const validatedCategory = searchParams.get("category") ?? "breakfast";

  return (
    <Section>
      <Carousel>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.slug} className="max-w-fit">
              <Button
                variant={
                  validatedCategory === item.slug ? "default" : "outline"
                }
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("category", item.slug);
                  router.push(`${pathname}?${params.toString()}`);
                }}
              >
                {item.name}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
