import { ErrorBoundary } from "@/components/boundary/error-boundary";
import TablePagination from "@/components/pagintaion/pagination";
import {
  DashboardHeader,
  DashboardSection,
} from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import AddFoodButton from "@/features/foods/components/add-food-button";
import FoodTable from "@/features/foods/components/food-table";
import { getFoods } from "@/features/foods/servers/food";
import { SearchParams } from "@/types/search-params";
import { IconListDetails } from "@tabler/icons-react";
import React from "react";

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
      <TableSection searchParams={searchParams} />
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
      <DashboardSection>
        <FoodTable data={foods.data} />
        <TablePagination count={foods?.count ?? 0} />
      </DashboardSection>
    </ErrorBoundary>
  );
};
