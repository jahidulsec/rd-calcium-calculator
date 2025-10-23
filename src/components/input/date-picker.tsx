"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";

export function DatePicker({ paramName }: { paramName?: string }) {
  const [date, setDate] = React.useState<Date>();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 font-manrepo">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);

            if (paramName) {
              const params = new URLSearchParams(searchParams);
              if (date) {
                params.set(paramName, format(date, "yyyy-MM-dd"));
              } else {
                params.delete(paramName);
              }
              router.push(`${pathname}?${params.toString()}`);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
