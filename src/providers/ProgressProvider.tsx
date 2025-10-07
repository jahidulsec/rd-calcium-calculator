"use client";

import { ProgressProvider } from "@bprogress/next/app";

const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#251D70"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default ProgressProviders;
