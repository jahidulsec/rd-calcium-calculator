import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LangSwitch from "../buttons/lang-switch";
import { getAuthUser } from "@/lib/dal";
import { BackButton } from "../buttons/button";
import { PageHeading } from "../typography/heading";
import { getDictionary, Locales } from "@/lib/dictionaries";

export default async function NavUser({
  showBackButton = false,
  showProfile = false,
  pageTitle,
  lang,
}: {
  showBackButton?: boolean;
  showProfile?: boolean;
  pageTitle?: string;
  lang: Locales;
}) {
  const autUser = await getAuthUser();
  const dict = await getDictionary(lang as Locales);

  return (
    <header className="w-full max-w-md mx-auto px-6 py-4">
      <div className="flex justify-between items-center gap-5">
        {showBackButton && <BackButton />}

        {showProfile && (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@johnDoe" />
              <AvatarFallback>{autUser?.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{autUser?.name}</h3>
          </div>
        )}

        {pageTitle && (
          <PageHeading className="font-bold">{pageTitle}</PageHeading>
        )}
        <LangSwitch data={dict.nav} />
      </div>
    </header>
  );
}
