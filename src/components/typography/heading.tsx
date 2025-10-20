import { cn } from "@/lib/utils";
import React from "react";

const PageHeading = ({ className, ...props }: React.ComponentProps<"h2">) => {
  return (
    <h2 className={cn("font-semibold text-nowrap", className)} {...props} />
  );
};

const PageSubtitle = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
};

const PageDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return <p className={cn("text-sm", className)} {...props} />;
};

const DashbaordHeading = ({
  className,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <PageHeading
      className={cn(
        "flex items-center gap-3 [&_svg]:size-4 [&_svg]:text-primary",
        className
      )}
      {...props}
    />
  );
};

export { PageHeading, PageSubtitle, PageDescription, DashbaordHeading };
