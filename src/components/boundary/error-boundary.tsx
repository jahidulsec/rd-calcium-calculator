"use client";

import { APIError } from "@/types/errors";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ErrorBoundary = ({
  children,
  error,
}: React.PropsWithChildren & { error: APIError | Error | null }) => {
  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    }
  }, [error?.message]);

  return <>{children}</>;
};

export { ErrorBoundary };
