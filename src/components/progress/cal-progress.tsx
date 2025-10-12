"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  label,
  colorOption = "normal",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  label?: string;
  colorOption?: "normal" | "reverse";
}) {
  const validatedValue = value ?? 0;

  let bgColor = "bg-destructive/20";
  let progressColor = "bg-rose-500";
  if (colorOption === "normal") {
    if (validatedValue < 33) {
      bgColor = "bg-destructive/20";
      progressColor = "bg-rose-500";
    } else if (validatedValue < 66) {
      bgColor = "bg-chart-4/20";
      progressColor = "bg-chart-4";
    } else if (validatedValue <= 100) {
      bgColor = "bg-chart-2/20";
      progressColor = "bg-chart-2";
    }
  } else {
    bgColor = "bg-chart-2/20";
    progressColor = "bg-chart-2";

    if (validatedValue < 33) {
      bgColor = "bg-chart-2/20";
      progressColor = "bg-chart-2";
    } else if (validatedValue < 66) {
      bgColor = "bg-chart-4/20";
      progressColor = "bg-chart-4";
    } else if (validatedValue <= 100) {
      bgColor = "bg-destructive/20";
      progressColor = "bg-rose-500";
    }
  }

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-8 w-full overflow-hidden rounded-md",
        bgColor,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "bg-primary h-full w-full flex-1 transition-all",
          progressColor
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      {label && (
        <p
          className={cn(
            "absolute top-1/2 left-1/2 -translate-1/2 font-bold",
            validatedValue > 66 ? "text-background" : ""
          )}
        >
          {label}
        </p>
      )}
    </ProgressPrimitive.Root>
  );
}

export { Progress };
