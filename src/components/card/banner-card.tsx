import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function BannerCard({
  src,
  alt,
  objectFit,
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <div className={cn("relative w-full aspect-[16/6] rounded-md overflow-hidden bg-muted", className)}>
      <Image
        fill
        src={src}
        alt={alt ?? "Banner"}
        objectFit={objectFit ?? "cover"}
        {...props}
      />
    </div>
  );
}
