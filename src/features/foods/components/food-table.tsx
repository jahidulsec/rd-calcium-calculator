"use client";

import FormModal from "@/components/modal/form-modal";
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
import { Prisma } from "@/generated/prisma";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import FoodForm from "./food-form";
import AlertModal from "@/components/alert-modal/alert-modal";
import { toast } from "sonner";
import { deleteFood } from "../actions/food";

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
  const [edit, setEdit] = React.useState<FoodTableProps | boolean>(false);
  const [del, setDel] = React.useState<string | boolean>(false);

  const columns: ColumnDef<FoodTableProps>[] = [
    {
      id: "Image",
      cell: ({ row }) => (
        <Avatar className="size-10 rounded-md bg-muted flex justify-center items-center">
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
      cell: ({ row }) => (
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
              <DropdownMenuItem onClick={() => setEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDel(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable data={data} columns={columns} />
      <FormModal
        title="Edit Food"
        open={!!edit}
        onOpenChange={setEdit}
        form={
          <FoodForm
            food={typeof edit !== "boolean" ? edit : undefined}
            onClose={() => setEdit(false)}
          />
        }
      />

      <AlertModal
        title="food"
        open={!!del}
        onOpenChange={setDel}
        onAction={async () => {
          if (typeof del === "boolean") return;
          toast.promise(deleteFood(del), {
            loading: "Loading...",
            success: (data) => {
              if (data.success === false) throw data;
              return data.message;
            },
            error: (data) => data.message,
          });
        }}
      />
    </>
  );
}
