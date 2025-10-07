import { RDFooter } from "@/components/footer/footer";
import React from "react";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="relative">
      <main className="min-h-[calc(100svh-70px)]">{children}</main>
      <RDFooter />
    </div>
  );
}
