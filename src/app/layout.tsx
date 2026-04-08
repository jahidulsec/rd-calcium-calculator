import type { Metadata } from "next";
import ProgressProviders from "@/providers/ProgressProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "@mdxeditor/editor/style.css";

export const metadata: Metadata = {
  title: "Calcium Calculator - Radiant Digital",
  description: "An app to help you maintain your calcium level with ease",
};

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ProgressProviders>
          {children}
          <Toaster closeButton richColors position="top-right" />
        </ProgressProviders>
      </body>
    </html>
  );
}
