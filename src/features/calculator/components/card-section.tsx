"use client";

import { Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/dictionaries";
import { Info, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

export default function CardSection({
  data,
}: {
  data: DictionaryType["food"];
}) {
  const searchParams = useSearchParams();
  const validatedCategory = searchParams.get("category") ?? "breakfast";

  return (
    <Section>
      <div className="flex flex-col gap-3">
        {data
          .filter((food) => food.categories.includes(validatedCategory))
          .map((item) => (
            <div
              key={item.item}
              className="border rounded-md p-3 flex gap-5 w-full"
            >
              {/* left */}
              <div className="relative min-w-24 max-h-24 m-auto aspect-square rounded-md overflow-hidden bg-muted">
                <Image
                  src={"/images/blog1.jpg"}
                  fill
                  alt={item.item}
                  objectFit="cover"
                />
              </div>

              {/* right */}
              <div className="flex flex-col gap-1 w-full">
                {/* top */}
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground">
                    {item.unit} | {item.calcium_value}
                  </p>
                  <Info className="fill-muted-foreground/30 text-background size-4" />
                </div>

                {/* middle */}
                <div className="w-full flex justify-between items-center gap-5 flex-wrap">
                  {/* title */}
                  <h3 className="font-bold max-w-[200px]">{item.item}</h3>

                  <Button size={"icon"} className="rounded-full">
                    <Plus className="size-5" />
                  </Button>
                </div>

                {/* bottom */}
                <Select defaultValue="1">
                  <SelectTrigger className="w-[180px] text-primary font-semibold [&_svg:not([class*='text-'])]:text-secondary">
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Unit</SelectLabel>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {index + 1} Unit
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
      </div>
    </Section>
  );
}
