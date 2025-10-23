import { DashboardAction, DashboardHeader } from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import { IconReport } from "@tabler/icons-react";
import React from "react";
import ExportSection from "./export-section";
import { DatePicker } from "@/components/input/date-picker";

export default function HeaderSection() {
  return (
    <DashboardHeader>
      <DashbaordHeading>
        <IconReport /> Users Activities
      </DashbaordHeading>

      <DashboardAction>
        <DatePicker paramName="date" />
        <ExportSection />
      </DashboardAction>
    </DashboardHeader>
  );
}
