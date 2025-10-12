import { cn } from "@/lib/utils";
import React from "react";

const Section = ({ className, ...props }: React.ComponentProps<"section">) => {
  return (
    <section
      className={cn("max-w-md mx-auto px-6 w-full", className)}
      {...props}
    />
  );
};

const Header = ({ className, ...props }: React.ComponentProps<"header">) => {
  return (
    <header
      className={cn("max-w-md mx-auto px-6 py-4 w-full", className)}
      {...props}
    />
  );
};

export { Section, Header };
