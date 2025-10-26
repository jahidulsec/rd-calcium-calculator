import { banner } from "@/generated/prisma";
import React from "react";

export default function BannerSection({ data }: { data: banner[] }) {
  return <div>{JSON.stringify(data)}</div>;
}
