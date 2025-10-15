"use client"

import { Badge } from "@/components/ui/badge";
import { DictionaryType } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard({
  ...item
}: DictionaryType["home"]["blogs"][number]) {
  return (
    <div className="bg-muted/50 p-2 rounded-md flex flex-col gap-3">
      {/* image */}
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill src={item.image} alt="Blog" objectFit="cover" />
      </div>

      {/* content */}
      <div className="flex flex-col gap-2">
        <Badge variant={"outline"} className="bg-secondary/15 text-primary">
          {item.readTime}
        </Badge>
        <Link href={`/blog/${item.id}`} className="hover:underline">
          <h3 className="font-semibold line-clamp-2">{item.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
