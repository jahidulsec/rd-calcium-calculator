import { ErrorBoundary } from "@/components/boundary/error-boundary";
import TablePagination from "@/components/pagintaion/pagination";
import {
  DashboardHeader,
  DashboardSection,
} from "@/components/section/section";
import { TableSkeleton } from "@/components/skeleton/table";
import { DashbaordHeading } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import BlogTable from "@/features/blog/components/blog-table";
import { getBlogs } from "@/features/blog/servers/blog";
import { SearchParams } from "@/types/search-params";
import { IconFileWord } from "@tabler/icons-react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconFileWord /> Blogs
        </DashbaordHeading>

        <Button size={"sm"} asChild>
          <Link href={`/dashboard/blogs/add`}>
            <PlusCircle /> Add
          </Link>
        </Button>
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
  const blogs = await getBlogs(Number(page), Number(size));

  return (
    <ErrorBoundary error={!blogs.success ? new Error(blogs.message) : null}>
      <BlogTable data={blogs.data} />
      <TablePagination count={blogs?.count ?? 0} />
    </ErrorBoundary>
  );
};
