import NavUser from "@/components/nav/nav-user";
import { Section } from "@/components/section/section";
import ProgressSection from "@/features/result/components/progress-section";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import { Check } from "lucide-react";
import React from "react";

export default async function ResultPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return (
    <>
      <NavUser showBackButton pageTitle={dict.result.sectionTitle} />

      <ProgressSection data={dict.result} />

      <Section className="flex flex-col gap-3">
        <p className="text-sm">{dict.result.adviceParagraph}</p>

        <ul className="pl-4">
          {dict.result.advicePoints.map((item, index) => (
            <div className="flex gap-1 items-center py-2" key={index}>
              <div className="min-w-5 h-5 rounded-full flex items-center justify-center bg-primary">
                <Check className="size-3 text-primary-foreground" />
              </div>
              <li className="text-muted-foreground text-sm pl-3">{item}</li>
            </div>
          ))}
        </ul>
      </Section>
    </>
  );
}
