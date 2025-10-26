import { cn } from "@/lib/utils";
import React from "react";
import { Spinner } from "../ui/spinner";

const SectionLoading = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "min-h-40 w-full flex items-center justify-center [&_svg]:size-20",
        className
      )}
      {...props}
    >
      <Spinner />
    </div>
  );
};

export { SectionLoading };
