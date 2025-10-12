"use client";

import { DictionaryType } from "@/lib/dictionaries";
import { useRouter } from "@bprogress/next";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const SIDEBAR_COOKIE_NAME = "lang_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export default function LangSwitch({ data }: { data: DictionaryType["nav"] }) {
  const params = useParams();
  const pathname = usePathname();
  const [selected, setSelected] = React.useState(
    params.lang?.toString() ?? "en"
  );
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md">
      {data.langList.map((item) => (
        <button
          data-active={item.value === selected}
          key={item.value}
          className="text-[10px] p-1.5 data-[active=true]:bg-background rounded-md text-primary font-semibold"
          onClick={() => {
            setSelected(item.value);
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${item.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
            router.replace(
              pathname.replace(selected, selected == "en" ? "bn" : "en")
            );
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
