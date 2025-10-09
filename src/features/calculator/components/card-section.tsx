"use client";

import { Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/dictionaries";
import { Check, Info, Plus } from "lucide-react";
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
import { Food, useCalculatorContext } from "@/providers/calculator-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CardSection({
  data,
}: {
  data: DictionaryType["food"];
}) {
  const { foods, onFoods } = useCalculatorContext();

  const searchParams = useSearchParams();
  const validatedCategory = searchParams.get("category") ?? "breakfast";

  return (
    <Section className="relative min-h-[calc(100svh-200px)] flex flex-col">
      <div className="flex flex-col gap-3">
        {data
          .filter((food) => food.categories.includes(validatedCategory))
          .map((item) => (
            <Card
              key={`${item.item}-${validatedCategory}`}
              selected={foods.find(
                (f) => f.name === item.item && f.category === validatedCategory
              )}
              onDelete={(value) => {
                onFoods((prev) => {
                  return prev.filter(
                    (f) =>
                      !(f.name === value.name && f.category === value.category)
                  );
                });
              }}
              onSelect={(value) =>
                onFoods((prev) => {
                  const exists = prev.find(
                    (f) =>
                      f.name === value.name && f.category === value.category
                  );

                  if (exists) {
                    // If same item with same qty, no change
                    if (exists.qty === value.qty) return prev;

                    // Otherwise replace the existing one with updated qty
                    return prev.map((f) =>
                      f.name === value.name && f.category === value.category
                        ? value
                        : f
                    );
                  }

                  // Add new item
                  return [...prev, value];
                })
              }
              item={item}
            />
          ))}
      </div>

      <div className="sticky bottom-0 pb-5 mt-5 bg-background">
        <Button className="w-full font-bold" asChild>
          <Link href={`/result`}>Calculate Now</Link>
        </Button>
      </div>
    </Section>
  );
}

const Card = ({
  item,
  onSelect,
  disable,
  selected,
  onDelete,
}: {
  item: DictionaryType["food"][number];
  onSelect: (value: Food) => void;
  onDelete: (value: Food) => void;
  disable?: boolean;
  selected?: Food;
}) => {
  const [unitNo, setUnitNo] = React.useState(selected?.qty ?? 1);

  const searchParams = useSearchParams();
  const validatedCategory = searchParams.get("category") ?? "breakfast";

  return (
    <div className="border rounded-md p-3 flex gap-5 w-full">
      {/* left */}
      <div className="relative min-w-20 max-h-20 m-auto aspect-square rounded-md overflow-hidden bg-muted">
        <Image
          src={item.image}
          fill
          alt={item.item}
          objectFit="cover"
        />
      </div>

      {/* right */}
      <div className="flex flex-col gap-2 w-full">
        {/* top */}
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-muted-foreground text-sm">
            {item.unit} | {item.calcium_value}
          </p>
          <Info className="fill-muted-foreground/30 text-background size-5" />
        </div>

        {/* middle */}
        <div className="w-full flex justify-between items-center gap-5 flex-wrap">
          {/* title */}
          <h3 className="font-bold max-w-[72%]">{item.item.split("(")[0]}</h3>

          {selected ? (
            <Button
              size={"icon-sm"}
              className={cn("rounded-full", selected ? "bg-chart-2" : '')}
              disabled={disable}
              onClick={() =>
                onDelete({
                  name: item.item,
                  qty: unitNo,
                  calcium_mg: item.calcium_mg,
                  category: validatedCategory,
                })
              }
            >
              <Check />
              <span className="sr-only">Add</span>
            </Button>
          ) : (
            <Button
              size={"icon-sm"}
              className="rounded-full"
              disabled={disable}
              onClick={() =>
                onSelect({
                  name: item.item,
                  qty: unitNo,
                  calcium_mg: item.calcium_mg,
                  category: validatedCategory,
                })
              }
            >
              <Plus />
              <span className="sr-only">Add</span>
            </Button>
          )}
        </div>

        {/* bottom */}
        <Select
          value={unitNo.toString()}
          onValueChange={(value) => {
            setUnitNo(Number(value ?? 1));
            onSelect({
              name: item.item,
              qty: Number(value ?? 1),
              calcium_mg: item.calcium_mg,
              category: validatedCategory,
            });
          }}
        >
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
  );
};
