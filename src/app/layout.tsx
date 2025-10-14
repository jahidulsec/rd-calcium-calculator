import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
