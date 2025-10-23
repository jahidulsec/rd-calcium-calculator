"use client";

import { FormButton } from "@/components/buttons/button";
import { format } from "date-fns";
import { Download } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { getAllUsersActivities } from "../servers/activities";
import { ageDescription } from "@/utils/data";
import { useSearchParams } from "next/navigation";

export default function ExportSection() {
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();

  // export csv
  const convertToCSV = (objArray: object[]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = `\r\n`;
    str +=
      "SL, Name, Mobile, Age, Gender, District, Calcium Intake, Calcium Required, Calcium Deficiency/Much(-/+), Status, Created At \r\n";

    for (let i = 0; i < array.length; i++) {
      let line = `${i + 1}, `;
      line += `${array[i].user.user_information.full_name},="${
        array[i].user.user_information.userId
      }", ${ageDescription[array[i].user.user_information.age as "TODDLER"]}, ${
        array[i].user.user_information.gender
      }, ${array[i].user.user_information.district}, ${
        array[i].calcium_intake
      }, ${array[i].calcium_required}, ${
        array[i].calcium_intake - array[i].calcium_required
      }, ${
        array[i].calcium_intake - array[i].calcium_required > 0
          ? "hypercalcemia"
          : array[i].calcium_intake - array[i].calcium_required < 0
          ? "hypocalcemia"
          : "normal"
      }, ${format(new Date(array[i].created_at), "dd LLL yyyy - h:mm aaa")}
      `;

      str += line;
    }
    return str;
  };

  const downloadCSV = async (name: string) => {
    const res = await getAllUsersActivities(searchParams.get("date") as string);
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    if (res.data.length == 0) {
      toast.warning("No user found");
      return;
    }

    const csvData = new Blob([convertToCSV(res.data)], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <FormButton
        isPending={isPending}
        onClick={() =>
          startTransition(async () => await downloadCSV("user-list"))
        }
      >
        <Download /> Export
      </FormButton>
    </>
  );
}
