import { Toaster } from "@/components/ui/sonner";
import ProgressProviders from "@/providers/ProgressProvider";
import { params } from "@/types/search-params";
import { ReactNode } from "react";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: params;
}) {
  const { lang } = await params;

  return (
    <html lang={lang?.toString()}>
      <body>
        <ProgressProviders>
          {children}
          <Toaster closeButton richColors position="top-right" />
        </ProgressProviders>
      </body>
    </html>
  );
}
