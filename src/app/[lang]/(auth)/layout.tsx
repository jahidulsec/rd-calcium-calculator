import { RDFooter } from "@/components/footer/footer";
import LogoSection from "@/components/footer/logo-section";
import { AuthProvider } from "@/providers/auth-provider";
import React from "react";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <div className="relative">
        <main className="min-h-[calc(100svh-120px)]">{children}</main>
        <LogoSection />
        <RDFooter />
      </div>
    </AuthProvider>
  );
}
