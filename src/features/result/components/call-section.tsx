import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/dictionaries";
import { Phone } from "lucide-react";
import React from "react";

export default function CallSection({
  data,
}: {
  data: DictionaryType["result"];
}) {
  return (
    <div className="bg-secondary text-background p-4 rounded-md grid gap-2">
      <p className="text-sm">{data.callSectionPara}</p>
      <Button className="w-full text-secondary" variant={"outline"}>
        <Phone className="fill-secondary stroke-transparent" />{" "}
        {data.callButtonTitle}
      </Button>
    </div>
  );
}
