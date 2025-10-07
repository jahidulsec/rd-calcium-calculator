import { cn } from "@/lib/utils";
import React from "react";

const PageHeading = ({ className, ...props }: React.ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "text-xl font-semibold text-balance",
        className
      )}
      {...props}
    />
  );
};

const PageSubtitle = ({ className, ...props }: React.ComponentProps<"h2">) => {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
};

export { PageHeading, PageSubtitle };
