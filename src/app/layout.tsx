import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ProgressProviders from "@/providers/ProgressProvider";

export const metadata: Metadata = {
  title: "Calcium Calculator - Radiant Digital",
  description: "An app to help you maintain your calcium level with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-manrepo antialiased`}>
        <ProgressProviders>
          {children}
          <Toaster closeButton richColors position="top-right" />
        </ProgressProviders>
      </body>
    </html>
  );
}
