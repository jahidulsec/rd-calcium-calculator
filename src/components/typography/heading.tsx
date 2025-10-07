import { cn } from "@/lib/utils";
import React from "react";

const PageHeading = ({ className, ...props }: React.ComponentProps<"h2">) => {
  return <h2 className={cn("text-xl font-semibold text-primary text-balance", className)} {...props} />;
};

export { PageHeading };
