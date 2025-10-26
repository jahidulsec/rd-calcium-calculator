import { ErrorBoundary } from "@/components/boundary/error-boundary";
import TablePagination from "@/components/pagintaion/pagination";
import {
  DashboardHeader,
  DashboardSection,
} from "@/components/section/section";
import { TableSkeleton } from "@/components/skeleton/table";
import { DashbaordHeading } from "@/components/typography/heading";
import AdminTable from "@/features/admin/components/admin-table";
import CreateButton from "@/features/admin/components/create-button";
import { getAdmins } from "@/features/admin/servers/admin";
import { getAuthUser } from "@/lib/dal";
import { SearchParams } from "@/types/search-params";
import { IconUsersGroup } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const authUser = await getAuthUser();

  if (authUser?.role === "admin") redirect("/dashboard");

  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconUsersGroup /> Admins
        </DashbaordHeading>

        <CreateButton />
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
  const res = await getAdmins(Number(page), Number(size));

  return (
    <ErrorBoundary error={!res.success ? new Error(res.message) : null}>
      <AdminTable data={res.data} />
      <TablePagination count={res.count || 0} />
    </ErrorBoundary>
  );
};
