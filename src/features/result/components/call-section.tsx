import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import React from "react";

export default function CallSection() {
  return (
    <div className="bg-secondary text-background p-4 rounded-md grid gap-2">
      <p className="text-sm">
        ঘরে বসেই ফ্রি ডাক্তারের পরামর্শ নিন সকাল ৯ টা থেকে রাত ১২ টা পর্যন্ত
      </p>
      <Button className="w-full text-secondary" variant={'outline'} ><Phone className="fill-secondary stroke-transparent" /> বিনামূল্যে পরামর্শ নিন</Button>
    </div>
  );
}
