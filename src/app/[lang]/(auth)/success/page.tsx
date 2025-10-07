"use client";

import { Section } from "@/components/section/section";
import React from "react";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import Image from "next/image";
import { useRouter } from "@bprogress/next/app";

export default function SuccessPage() {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  }, [router]);

  return (
    <Section className="flex flex-col justify-center items-center gap-5 min-h-[75vh]">
      <Empty>
        <EmptyHeader>
          <Image
            width={100}
            height={100}
            src={"/images/Verfication.svg"}
            alt="verification icon"
          />
        </EmptyHeader>
        <EmptyTitle>Verification Successful</EmptyTitle>
      </Empty>
    </Section>
  );
}
