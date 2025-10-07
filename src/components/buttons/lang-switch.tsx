"use client";

import React from "react";

const langList = ["en", "bn"];

export default function LangSwitch() {
  const [selected, setSelected] = React.useState("en");

  return (
    <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md">
      {langList.map((item) => (
        <button
          data-active={item === selected}
          key={item}
          className="text-xs p-1.5 data-[active=true]:bg-background rounded-md text-primary font-semibold"
          onClick={() => setSelected(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
