"use client";

import { useRouter } from "@bprogress/next";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const langList = ["en", "bn"];

const SIDEBAR_COOKIE_NAME = "lang_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export default function LangSwitch() {
  const params = useParams();
  const pathname = usePathname();
  const [selected, setSelected] = React.useState(
    params.lang?.toString() ?? "en"
  );
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md">
      {langList.map((item) => (
        <button
          data-active={item === selected}
          key={item}
          className="text-xs p-1.5 data-[active=true]:bg-background rounded-md text-primary font-semibold"
          onClick={() => {
            setSelected(item);
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${item}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
            router.replace(
              pathname.replace(selected, selected == "en" ? "bn" : "en")
            );
          }}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
