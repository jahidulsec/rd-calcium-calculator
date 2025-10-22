"use client";

import { DataTable } from "@/components/table/data-table";
import { user_information } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { format } from "date-fns";
import { ageDescription } from "@/utils/data";

export default function UserTable({ data }: { data: user_information[] }) {
  const columns: ColumnDef<user_information>[] = [
    {
      accessorKey: "full_name",
      header: "Name",
    },
    {
      accessorKey: "userId",
      header: "Mobile",
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => <p>{ageDescription[row.original.age]}</p>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "district",
      header: "District",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => (
        <div className="">
          {format(row.getValue("created_at"), "LLL dd, yyyy (h:mm aaa)")}
        </div>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} />;
}
