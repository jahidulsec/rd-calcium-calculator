"use client";

import AlertModal from "@/components/alert-modal/alert-modal";
import { DataTable } from "@/components/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { admin } from "@/generated/prisma";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { deleteAdmin } from "../actions/admin";

export default function AdminTable({ data }: { data: admin[] }) {
  const [del, setDel] = React.useState<string | boolean>(false);
  const [edit, setEdit] = React.useState<admin | boolean>(false);

  const columns: ColumnDef<admin>[] = [
    {
      accessorKey: "full_name",
      header: "Full name",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <Badge variant={"outline"}>{row.original.role}</Badge>,
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => (
        <p>
          {row.original.created_at
            ? format(row.original.created_at, "LLL dd, yyyy")
            : "-"}
        </p>
      ),
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
        title="admin"
        open={!!del}
        onOpenChange={setDel}
        onAction={async () => {
          if (typeof del === "boolean") return;
          toast.promise(deleteAdmin(del), {
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
