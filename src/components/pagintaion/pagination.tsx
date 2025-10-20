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

export default function TablePagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || DEFAULT_PAGE_SIZE;

  const handleParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end py-4">
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
          Page {searchParams.get("page") ?? 1} of {Math.ceil(count / size)}
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
            disabled={Math.ceil(count / size) === page}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() =>
              handleParams("page", Math.ceil(count / size).toString())
            }
            disabled={Math.ceil(count / size) === page}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
