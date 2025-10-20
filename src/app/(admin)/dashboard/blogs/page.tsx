import { DashboardHeader } from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/types/search-params";
import { IconFileWord } from "@tabler/icons-react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

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
    </>
  );
}




