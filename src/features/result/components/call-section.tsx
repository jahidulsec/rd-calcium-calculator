import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/dictionaries";
import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CallSection({
  data,
}: {
  data: DictionaryType["result"];
}) {
  return (
    <div className="bg-secondary text-background p-4 rounded-md grid gap-2">
      <p className="text-sm">{data.callSectionPara}</p>
      <Button className="w-full text-secondary" variant={"outline"} asChild>
        <Link
          href={`tel:${process.env.NEXT_PUBLIC_TELE_SERVICE}`}
          target="_blank"
        >
          <Phone className="fill-secondary stroke-transparent" />{" "}
          {data.callButtonTitle}
        </Link>
      </Button>
    </div>
  );
}
