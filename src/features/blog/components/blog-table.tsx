"use client";

import { DataTable } from "@/components/table/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Prisma } from "@/generated/prisma";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AlertModal from "@/components/alert-modal/alert-modal";
import { toast } from "sonner";
import { deleteBlog } from "../actions/blog";
import Link from "next/link";

export type BlogTableProps = Prisma.blogGetPayload<{
  select: {
    id: true;
    en_title: true;
    bn_title: true;
    en_details: true;
    bn_details: true;
    image: true;
  };
}>;

export default function BlogTable({ data }: { data: BlogTableProps[] }) {
  const [del, setDel] = React.useState<string | boolean>(false);

  const columns: ColumnDef<BlogTableProps>[] = [
    {
      id: "Image",
      cell: ({ row }) => (
        <Avatar className="size-10 rounded-md bg-muted flex justify-center items-center">
          <AvatarImage
            className="object-cover"
            src={`/api/upload/blog/${row.original.id}`}
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
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/blogs/${row.original.id}`}>Edit</Link>
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
        title="blog"
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
