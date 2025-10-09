"use client";

import { Progress } from "@/components/progress/cal-progress";
import { Section } from "@/components/section/section";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import React from "react";

export default function ProgressSection() {
  const maxTotal = 1600;
  const consumed = 1800;
  const value = (consumed * 100) / 1600;
  const validatedValue = value > 100 ? 100 : value;
  const validatedRemaingValue = value > 100 ? value - 100 : value;
  const remaining = maxTotal - consumed;

  return (
    <Section className="grid gap-6">
      <Field title="Your Daily Calcium Requirement">
        <div className="bg-secondary relative h-8 w-full overflow-hidden rounded-md flex justify-center items-center">
          <p className="text-background font-semibold">1600mg</p>
        </div>
      </Field>
      <Field title="Your Daily Calcium Intake">
        <Progress label={`${consumed}mg`} value={validatedValue} />
      </Field>
      <Field title="Your Daily Calcium Requirement">
        <Progress
          value={Number(validatedRemaingValue)}
          label={`${Math.abs(remaining)}mg`}
        />
      </Field>
    </Section>
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
