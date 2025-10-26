import { ErrorBoundary } from "@/components/boundary/error-boundary";
import TablePagination from "@/components/pagintaion/pagination";
import {
  DashboardHeader,
  DashboardSection,
} from "@/components/section/section";
import { SectionLoading } from "@/components/state/loading";
import { DashbaordHeading } from "@/components/typography/heading";
import BannerSection from "@/features/banner/components/banner-section";
import CreateBannerSection from "@/features/banner/components/create-section";
import { getBanners } from "@/features/banner/servers/banner";
import { SearchParams } from "@/types/search-params";
import { IconFrame } from "@tabler/icons-react";
import React, { Suspense } from "react";

export default function BannerPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconFrame /> Banners
        </DashbaordHeading>

        <CreateBannerSection />
      </DashboardHeader>

      <DashboardSection>
        <Suspense fallback={<SectionLoading />}>
          <CardSection searchParams={searchParams} />
        </Suspense>
      </DashboardSection>
    </>
  );
}

const CardSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, size } = await searchParams;
  const res = await getBanners(Number(page), Number(size));

  return (
    <ErrorBoundary error={!res.success ? new Error(res.message) : null}>
      <BannerSection data={res.data} />
      <TablePagination count={res.count ?? 0} />
    </ErrorBoundary>
  );
};
