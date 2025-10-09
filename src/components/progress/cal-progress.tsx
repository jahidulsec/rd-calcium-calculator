"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  label,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { label?: string }) {
  const validatedValue = value ?? 0;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-8 w-full overflow-hidden rounded-md",
        validatedValue >= 0 && validatedValue < 33
          ? "bg-destructive/20"
          : validatedValue < 66
          ? "bg-chart-4/20"
          : validatedValue <= 100
          ? "bg-chart-2/20"
          : "bg-destructive/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "bg-primary h-full w-full flex-1 transition-all",
          validatedValue >= 0 && validatedValue < 33
            ? "bg-rose-500"
            : validatedValue < 66
            ? "bg-chart-4"
            : validatedValue <= 100
            ? "bg-chart-2"
            : "bg-rose-500"
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
