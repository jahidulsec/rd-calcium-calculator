import { Footer } from "@/components/footer/footer";
import { getAuthUser } from "@/lib/dal";
import { CalculatorProvider } from "@/providers/calculator-provider";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getAuthUser();

  if (!user) redirect("/onboarding");

  return (
    <CalculatorProvider>
      <div className="relative">
        <main className="flex flex-col gap-6 min-h-[calc(100svh-60px)] w-full">
          {children}
        </main>
        <Footer />
      </div>
    </CalculatorProvider>
  );
}
