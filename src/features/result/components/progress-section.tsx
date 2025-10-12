"use client";

import { Progress } from "@/components/progress/cal-progress";
import CircularProgress from "@/components/progress/circular-progress";
import { Section } from "@/components/section/section";
import { cn } from "@/lib/utils";
import { Circle, Info } from "lucide-react";
import React from "react";
import { useCalculatorContext } from "@/providers/calculator-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "@bprogress/next";
import { useParams } from "next/navigation";
import { DictionaryType } from "@/lib/dictionaries";
import AdviceSection from "./advice-section";
import CallSection from "./call-section";

export default function ProgressSection({
  data,
}: {
  data: DictionaryType["result"];
}) {
  const { foods, onFoods } = useCalculatorContext();
  const router = useRouter();
  const params = useParams();

  const totalConsumed = foods.reduce(
    (prev, curr) => prev + curr.calcium_mg * curr.qty,
    0
  );

  const maxTotal = 1600;
  const consumed = totalConsumed;
  const value = (consumed * 100) / 1600;
  const validatedValue = value > 100 ? 100 : value;
  const validatedRemaingValue = value > 100 ? value - 100 : 100 - value;
  const remaining = maxTotal - consumed;
  const status =
    value < 100
      ? data.hypocalcemia
      : value > 100
      ? data.hypercalcemia
      : data.normal;

  return (
    <>
      <div className="flex-1">
        <Section className="grid gap-6">
          <Field title={data.pTitle1}>
            <div className="bg-secondary relative h-8 w-full overflow-hidden rounded-md flex justify-center items-center">
              <p className="text-background font-semibold">1600mg</p>
            </div>
          </Field>
          <Field title={data.pTitle2}>
            <Progress label={`${consumed}mg`} value={validatedValue} />
          </Field>
          <Field title={value < 100 ? data.pTitle3lt : data.pTitle3gt}>
            <Progress
              colorOption="reverse"
              value={Number(validatedRemaingValue)}
              label={`${Math.abs(remaining)}mg`}
            />
          </Field>
        </Section>

        <Section className="flex justify-center items-center flex-col gap-5 mt-6">
          <p className="text-center text-sm text-balance font-medium">
            {data.circleSectionTitle}
          </p>
          <CircularProgress progress={value} />
          <div
            className={cn(
              " w-full flex justify-center items-center gap-2 h-10 rounded-md",
              value < 100
                ? "bg-chart-5/10 text-chart-5"
                : value > 100
                ? "bg-destructive/10 text-destructive"
                : "bg-chart-2/10 text-chart-2"
            )}
          >
            <Circle
              className={cn(
                "fill-chart-4/50 text-chart-4/50 size-3.5",
                value < 100
                  ? "text-chart-5/10 fill-chart-5"
                  : value > 100
                  ? "text-destructive/10 fill-destructive"
                  : "text-chart-2/10 fill-chart-2"
              )}
            />{" "}
            <p className="font-semibold">
              {params.lang === "en"
                ? `${data.resultCommonTitleFirst} ${data.resultCommonTitleEnd} ${status}`
                : `${data.resultCommonTitleFirst} ${status} ${data.resultCommonTitleEnd}`}
            </p>
          </div>
        </Section>

        {value < 100 && <AdviceSection data={data} />}
      </div>

      <Section className="grid gap-2">
        <CallSection />
        <Button
          className="font-bold w-full"
          onClick={() => {
            onFoods([]);
            router.replace(`/${params.lang}/calculator`);
          }}
        >
          {data.buttonTitle}
        </Button>
      </Section>
    </>
  );
}

const Field = ({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
        {title}{" "}
        <Info size={16} className="fill-muted-foreground/50 text-background" />
      </p>
      {children}
    </div>
  );
};
