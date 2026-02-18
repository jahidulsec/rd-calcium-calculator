"use client";

import { Badge } from "@/components/ui/badge";
import { BlogTableProps } from "@/features/blog/components/blog-table";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function BlogCard({ ...item }: BlogTableProps) {
  const { lang } = useParams();

  const title = lang === "bn" ? item.bn_title : item.en_title;
  const desc = lang === "bn" ? item.bn_description : item.en_description;

  return (
    <div className="bg-muted/50 p-2 rounded-md flex flex-col gap-3">
      {/* image */}
      <div className="relative w-full min-w-40 aspect-video rounded-md overflow-hidden">
        <Image
          fill
          src={`/api/upload/blog/${item.id}`}
          alt="Blog"
          objectFit="cover"
        />
      </div>

      {/* content */}
      <div className="flex flex-col gap-2">
        {/* <Badge variant={"outline"} className="bg-secondary/15 text-primary">
          {item.readTime}
        </Badge> */}
        <Link href={`/blog/${item.id}`} className="hover:underline">
          <h3 className="font-semibold line-clamp-2">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{desc}</p>
      </div>
    </div>
  );
}
