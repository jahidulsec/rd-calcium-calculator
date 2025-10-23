"use client";

import { DataTable } from "@/components/table/data-table";
import { Prisma } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { format } from "date-fns";
import { ageDescription } from "@/utils/data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type UsersActivitiesTableProps = Prisma.user_calciumGetPayload<{
  include: {
    user: {
      include: {
        user_information: { include: { user_image: true } };
      };
    };
  };
}>;

export default function UsersActivitiesTable({
  data,
}: {
  data: UsersActivitiesTableProps[];
}) {
  const columns: ColumnDef<UsersActivitiesTableProps>[] = [
    {
      id: "image",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={(`/api/upload/user/${row.original.userId}`)} />
          <AvatarFallback>
            {row.original.user.user_information?.full_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "full_name",
      header: "Name",
      cell: ({ row }) => <p>{row.original.user.user_information?.full_name}</p>,
    },
    {
      accessorKey: "userId",
      header: "Mobile",
      cell: ({ row }) => <p>{row.original.user.user_information?.userId}</p>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => (
        <p>
          {ageDescription[row.original.user.user_information?.age as "TODDLER"]}
        </p>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <p>{row.original.user.user_information?.gender}</p>,
    },
    {
      accessorKey: "district",
      header: "District",
      cell: ({ row }) => <p>{row.original.user.user_information?.district}</p>,
    },
    {
      accessorKey: "calcium_intake",
      header: "Calcium Intake",
    },
    {
      accessorKey: "calcium_required",
      header: "Calcium Required",
    },
    {
      header: "Calcium Low/High (-/+)",
      cell: ({ row }) => (
        <p>{row.original.calcium_intake - row.original.calcium_required}</p>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const value = row.original;

        const level = value.calcium_intake - value.calcium_required;

        const status =
          level > 0 ? "hypercalcemia" : level < 0 ? "hypocalcemia" : "normal";

        return (
          <Badge
            data-status={status}
            variant={"outline"}
            className="data-[status=hypercalcemia]:text-destructive data-[status=hypocalcemia]:text-chart-5"
          >
            {status}
          </Badge>
        );
      },
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
