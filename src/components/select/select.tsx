"use client";

import React from "react";
import {
  Select as SelectUi,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";

const Select = ({
  data,
  className,
  placeholder,
  onValueChange,
  searchParamsName,
  ...props
}: React.ComponentProps<React.FC<SelectProps>> & {
  className?: string;
  placeholder?: string;
  data: { label: string; value: string }[];
  searchParamsName?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SelectUi
      {...props}
      onValueChange={(value) => {
        if (searchParamsName) {
          const params = new URLSearchParams(searchParams);
          params.set(searchParamsName, value);
          router.push(`${pathname}?${params.toString()}`);
        }

        if (onValueChange) {
          onValueChange(value);
        }
      }}
    >
      <SelectTrigger
        className={cn(
          "[&_svg]:text-primary bg-background border-primary/25",
          className
        )}
      >
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.length > 0 ? (
            data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <SelectLabel className="text-xs text-muted-foreground">
              No data.
            </SelectLabel>
          )}
        </SelectGroup>
      </SelectContent>
    </SelectUi>
  );
};

export { Select };
