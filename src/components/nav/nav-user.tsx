import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LangSwitch from "../buttons/lang-switch";

export default function NavUser() {
  return (
    <header className="w-full max-w-md mx-auto px-6 py-4">
      <div className="flex justify-between items-center gap-5">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@johnDoe"
          />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>

        <LangSwitch />
      </div>
    </header>
  );
}
