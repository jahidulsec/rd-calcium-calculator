import { Footer } from "@/components/footer/footer";
import React from "react";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="relative">
      <main className="flex flex-col gap-6 min-h-[calc(100svh-60px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
