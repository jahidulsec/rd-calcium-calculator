"use client";

import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";
import { DEFAULT_PAGE_SIZE } from "@/utils/data";
import { cn } from "@/lib/utils";

export default function TablePagination({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || DEFAULT_PAGE_SIZE;
  const totalPage = Math.ceil(count / size) > 0 ? Math.ceil(count / size) : 1;

  const handleParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("flex items-center justify-end py-4", className)}>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={size.toString()}
            onValueChange={(value) => {
              handleParams(
                "size",
                Number(value || DEFAULT_PAGE_SIZE).toString()
              );
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={size.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {searchParams.get("page") ?? 1} of {totalPage}
          {/* total page count */}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handleParams("page", Number(1).toString())}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => {
              handleParams("page", (page - 1).toString());
            }}
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => {
              handleParams("page", (page + 1).toString());
            }}
            disabled={totalPage === page}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => handleParams("page", totalPage.toString())}
            disabled={totalPage === page}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
