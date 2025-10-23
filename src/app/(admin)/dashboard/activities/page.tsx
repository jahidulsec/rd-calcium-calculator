import { ErrorBoundary } from "@/components/boundary/error-boundary";
import TablePagination from "@/components/pagintaion/pagination";
import { DashboardSection } from "@/components/section/section";
import { TableSkeleton } from "@/components/skeleton/table";
import HeaderSection from "@/features/activities/components/header-section";
import UsersActivitiesTable from "@/features/activities/components/user-activities-table";
import { getUsersActivities } from "@/features/activities/servers/activities";
import { SearchParams } from "@/types/search-params";
import React, { Suspense } from "react";

export default function ActivitiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <HeaderSection />

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
  const { page, size, date } = await searchParams;
  const users = await getUsersActivities(
    Number(page),
    Number(size),
    date as string
  );

  return (
    <ErrorBoundary error={!users.success ? new Error(users.message) : null}>
      <UsersActivitiesTable data={users.data} />
      <TablePagination count={users?.count ?? 0} />
    </ErrorBoundary>
  );
};
