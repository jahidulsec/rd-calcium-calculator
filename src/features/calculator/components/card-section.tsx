"use client";

import { Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/dictionaries";
import { Check, Info, Plus, PlusCircle } from "lucide-react";
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
import { useParams, useSearchParams } from "next/navigation";
import { Food, useCalculatorContext } from "@/providers/calculator-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function CardSection({ data }: { data: DictionaryType }) {
  const { foods, onFoods } = useCalculatorContext();
  const [otherFoodCount, setOtherFoodCount] = React.useState(1);

  const searchParams = useSearchParams();
  const params = useParams();
  const validatedCategory = searchParams.get("category") ?? "breakfast";

  return (
    <Section className="relative min-h-[calc(100svh-200px)] flex flex-col">
      <div className="flex flex-col gap-3">
        {data.food
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
      {/* <p className="text-sm my-3">{data.foodTips}</p> */}
      {/* other food section */}
      <section className="w-full flex flex-col gap-3 py-3 border-t mt-3">
        <Button
          className="w-fit ml-auto"
          onClick={() => setOtherFoodCount(otherFoodCount + 1)}
        >
          <PlusCircle /> Food
        </Button>{" "}
        <div className="flex flex-col gap-3">
          {Array.from({ length: otherFoodCount }).map((_, index) => (
            <Card
              key={index}
              type="other"
              selected={foods.find(
                (f) => f.id === index + 1 && f.category === validatedCategory
              )}
              onDelete={(value) => {
                onFoods((prev) => {
                  return prev.filter(
                    (f) => !(f.id === value.id && f.category === value.category)
                  );
                });
              }}
              onSelect={(value) =>
                onFoods((prev) => {
                  const exists = prev.find(
                    (f) => f.id === value.id && f.category === value.category
                  );

                  if (exists) {
                    // If same item with same qty, no change
                    if (exists.qty === value.qty) return prev;

                    // Otherwise replace the existing one with updated qty
                    return prev.map((f) =>
                      f.id === value.id && f.category === value.category
                        ? value
                        : f
                    );
                  }

                  // Add new item
                  return [...prev, value];
                })
              }
              item={{
                ...data.otherFood,
                id: index + 1,
              }}
            />
          ))}
        </div>
      </section>

      {/* button */}
      <div className="sticky bottom-0 pb-5 mt-5 bg-background">
        <Button className="w-full font-bold" asChild>
          <Link href={`/${params.lang}/result`}>
            {data.calculator.buttonTitle}
          </Link>
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
  type = "default",
}: {
  item: DictionaryType["food"][number] & { id?: number };
  onSelect: (value: Food) => void;
  onDelete: (value: Food) => void;
  disable?: boolean;
  selected?: Food;
  type?: "other" | "default";
}) => {
  const [unitNo, setUnitNo] = React.useState(selected?.qty ?? 1);
  const [other, setOther] = React.useState(item);

  const searchParams = useSearchParams();
  const validatedCategory = searchParams.get("category") ?? "breakfast";

  return (
    <div className="border rounded-md p-3 flex gap-5 w-full">
      {/* left */}
      <div className="min-w-20 max-h-20 m-auto flex justify-center items-center rounded-md overflow-hidden bg-muted">
        {item.image ? (
          <div className="relative w-full  aspect-square mix-blend-multiply">
            <Image src={item.image} fill alt={item.item} objectFit="cover" />
          </div>
        ) : (
          <div className="w-full aspect-square"></div>
        )}
      </div>

      {/* right */}
      <div className="flex flex-col gap-2 w-full">
        {/* top */}
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-muted-foreground text-sm">
            {item.unit} |{" "}
            {type === "other" ? (
              <>
                <Input
                  type="number"
                  className="text-sm max-w-20 h-fit"
                  value={other.calcium_mg}
                  onChange={(e) =>
                    setOther((prev) => ({
                      ...prev,
                      calcium_mg: Number(e.target.value),
                    }))
                  }
                />{" "}
                mg
              </>
            ) : (
              item.calcium_value
            )}
          </p>
          <Info className="fill-muted-foreground/30 text-background size-5" />
        </div>

        {/* middle */}
        <div className="w-full flex justify-between items-center gap-5 flex-wrap">
          {/* title */}
          {type === "other" ? (
            <Input
              className="font-bold max-w-[72%]"
              placeholder={other.item}
              onChange={(e) =>
                setOther((prev) => ({
                  ...prev,
                  item: e.target.value,
                }))
              }
            />
          ) : (
            <h3 className="font-bold max-w-[72%]">{item.item.split("(")[0]}</h3>
          )}

          {selected ? (
            <Button
              size={"icon-sm"}
              className={cn("rounded-full", selected ? "bg-chart-2" : "")}
              disabled={disable}
              onClick={() => {
                if (type === "other") {
                  onDelete({
                    id: other.id,
                    name: other.item,
                    qty: unitNo,
                    calcium_mg: other.calcium_mg,
                    category: validatedCategory,
                  });
                } else {
                  onDelete({
                    name: item.item,
                    qty: unitNo,
                    calcium_mg: item.calcium_mg,
                    category: validatedCategory,
                  });
                }
              }}
            >
              <Check />
              <span className="sr-only">Add</span>
            </Button>
          ) : (
            <Button
              size={"icon-sm"}
              className="rounded-full"
              disabled={disable}
              onClick={() => {
                if (type === "other") {
                  onSelect({
                    id: other.id,
                    name: other.item,
                    qty: unitNo,
                    calcium_mg: other.calcium_mg,
                    category: validatedCategory,
                  });
                } else {
                  onSelect({
                    name: item.item,
                    qty: unitNo,
                    calcium_mg: item.calcium_mg,
                    category: validatedCategory,
                  });
                }
              }}
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

            if (type === "other") {
              onSelect({
                id: other.id,
                name: other.item,
                qty: Number(value ?? 1),
                calcium_mg: other.calcium_mg,
                category: validatedCategory,
              });
            } else {
              onSelect({
                name: item.item,
                qty: Number(value ?? 1),
                calcium_mg: item.calcium_mg,
                category: validatedCategory,
              });
            }
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
                  {index + 1} Serving
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
