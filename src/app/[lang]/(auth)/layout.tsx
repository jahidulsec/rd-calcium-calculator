import { RDFooter } from "@/components/footer/footer";
import { AuthProvider } from "@/providers/auth-provider";
import React from "react";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <div className="relative">
        <main className="min-h-[calc(100svh-70px)]">{children}</main>
        <RDFooter />
      </div>
    </AuthProvider>
  );
}
