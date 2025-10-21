import { ErrorBoundary } from "@/components/boundary/error-boundary";
import TablePagination from "@/components/pagintaion/pagination";
import {
  DashboardHeader,
  DashboardSection,
} from "@/components/section/section";
import { TableSkeleton } from "@/components/skeleton/table";
import { DashbaordHeading } from "@/components/typography/heading";
import AddFoodButton from "@/features/foods/components/add-food-button";
import FoodTable from "@/features/foods/components/food-table";
import { getFoods } from "@/features/foods/servers/food";
import { SearchParams } from "@/types/search-params";
import { IconListDetails } from "@tabler/icons-react";
import React, { Suspense } from "react";

export default function FoodPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconListDetails /> Foods
        </DashbaordHeading>

        <AddFoodButton />
      </DashboardHeader>

      {/* tablesection */}
      <DashboardSection>
        <Suspense fallback={<TableSkeleton />}>
          <TableSection searchParams={searchParams} />
        </Suspense>
      </DashboardSection>
    </>
  );
}

const TableSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, size } = await searchParams;
  const foods = await getFoods(Number(page), Number(size));

  return (
    <ErrorBoundary error={!foods.success ? new Error(foods.message) : null}>
      <FoodTable data={foods.data} />
      <TablePagination count={foods?.count ?? 0} />
    </ErrorBoundary>
  );
};
