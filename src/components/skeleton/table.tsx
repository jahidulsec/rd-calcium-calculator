import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

const TableSkeleton = ({
  className,
  columnsNo = 5,
  rowsNo = 5,
}: React.ComponentProps<"div"> & { columnsNo?: number, rowsNo?:number }) => {
  return (
    <div className={cn("my-3 border rounded-md w-full", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columnsNo }).map((_, index) => (
              <TableHead className="min-w-[5rem]" key={index}>
                <div className="h-5 bg-gray-200 animate-pulse"></div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowsNo }).map((item, index) => (
            <TableRow key={index}>
              {Array.from({ length: columnsNo }).map((_, index) => (
                <TableCell className="min-w-[5rem]" key={index}>
                  <div className="h-5 bg-gray-100 animate-pulse"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { TableSkeleton };
