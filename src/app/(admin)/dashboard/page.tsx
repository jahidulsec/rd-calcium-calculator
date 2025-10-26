import { DashboardSection } from "@/components/section/section";
import { SectionLoading } from "@/components/state/loading";
import { prisma } from "@/db/client";
import {
  IconFileWord,
  IconFrame,
  IconListDetails,
  IconReport,
} from "@tabler/icons-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <DashboardSection>
      <Suspense fallback={<SectionLoading />}>
        <CardSection />
      </Suspense>
    </DashboardSection>
  );
}

const CardSection = async () => {
  const dataCount = await Promise.all([
    prisma.food.count(),
    prisma.blog.count(),
    prisma.banner.count(),
    prisma.user_calcium.count(),
  ]);

  const cardList = [
    {
      title: "Foods",
      url: "/dashboard/foods",
      icon: IconListDetails,
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: IconFileWord,
    },
    {
      title: "Banners",
      url: "/dashboard/banners",
      icon: IconFrame,
    },
    {
      title: "Activities",
      url: "/dashboard/activities",
      icon: IconReport,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 ">
      {cardList.map((item, index) => (
        <Link
          href={item.url}
          className="flex justify-between items-center gap-5 p-4 bg-muted hover:bg-secondary/15"
          key={item.url}
        >
          <div className="">
            <p className="text-sm">{item.title}</p>
            <p className="font-semibold text-2xl">{dataCount[index]}</p>
          </div>
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <item.icon className="size-4" />
          </div>
        </Link>
      ))}
    </div>
  );
};
