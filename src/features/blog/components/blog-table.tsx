"use client";

import { DataTable } from "@/components/table/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { blog, Prisma } from "@/generated/prisma";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AlertModal from "@/components/alert-modal/alert-modal";
import { toast } from "sonner";
import { deleteBlog } from "../actions/blog";

export default function BlogTable({ data }: { data: blog[] }) {
  const [edit, setEdit] = React.useState<blog | boolean>(false);
  const [del, setDel] = React.useState<string | boolean>(false);

  const columns: ColumnDef<blog>[] = [
    {
      id: "Image",
      cell: ({ row }) => (
        <Avatar className="size-10 rounded-md">
          <AvatarImage
            className="object-cover"
            src={`/api/upload/food/${row.original.id}`}
            alt="@johnDoe"
          />
          <AvatarFallback>{row.original.en_title?.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "en_title",
      header: "Title (English)",
    },
    {
      accessorKey: "bn_title",
      header: "Title (Bangla)",
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

      <AlertModal
        title="food"
        open={!!del}
        onOpenChange={setDel}
        onAction={async () => {
          if (typeof del === "boolean") return;
          toast.promise(deleteBlog(del), {
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
