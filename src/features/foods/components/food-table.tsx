"use client";

import { DataTable } from "@/components/table/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { food, Prisma } from "@/generated/prisma";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";

export type FoodTableProps = Prisma.foodGetPayload<{
  include: {
    food_category: {
      include: {
        category: true;
      };
    };
  };
}>;

export default function FoodTable({ data }: { data: FoodTableProps[] }) {
  const columns: ColumnDef<FoodTableProps>[] = [
    {
      id: "Image",
      cell: ({ row }) => (
        <Avatar className="size-10 rounded-md">
          <AvatarImage
            className="object-cover"
            src={`/api/upload/food/${row.original.id}`}
            alt="@johnDoe"
          />
          <AvatarFallback>{row.original.en_name?.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "en_name",
      header: "Name (English)",
    },
    {
      accessorKey: "bn_name",
      header: "Name (Bangla)",
    },
    {
      header: "Categories",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.food_category.map((item, index) => (
            <Badge variant={"outline"} key={index}>
              {item.category.name}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "unit",
      header: "Unit",
    },
    {
      accessorKey: "calcium_mg",
      header: "Calcium (Mg)",
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} />;
}
