"use client";

import { DataTable } from "@/components/table/data-table";
import { food, Prisma } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type FoodTableProps = Prisma.foodGetPayload<{
  include: { food_category: true };
}>;

export default function FoodTable({ data }: { data: FoodTableProps[] }) {
  const columns: ColumnDef<food>[] = [
    {
      accessorKey: "en_name",
      header: "Name (English)",
    },
    {
      accessorKey: "bn_name",
      header: "Name (Bangla)",
    },
    {
      accessorKey: "unit",
      header: "Unit",
    },
    {
      accessorKey: "calcium_mg",
      header: "Calcium (Mg)",
    },
  ];

  return <DataTable data={data} columns={columns} />;
}
