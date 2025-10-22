import { ErrorBoundary } from "@/components/boundary/error-boundary";
import TablePagination from "@/components/pagintaion/pagination";
import {
  DashboardHeader,
  DashboardSection,
} from "@/components/section/section";
import { TableSkeleton } from "@/components/skeleton/table";
import { DashbaordHeading } from "@/components/typography/heading";
import UserTable from "@/features/user/components/user-table";
import { getUsers } from "@/features/user/servers/user";
import { SearchParams } from "@/types/search-params";
import { IconUser } from "@tabler/icons-react";
import React, { Suspense } from "react";

export default function UserPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconUser /> Users
        </DashbaordHeading>
      </DashboardHeader>

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
  const users = await getUsers(Number(page), Number(size));

  return (
    <ErrorBoundary error={!users.success ? new Error(users.message) : null}>
      <UserTable data={users.data} />
      <TablePagination count={users?.count ?? 0} />
    </ErrorBoundary>
  );
};
