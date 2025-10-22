"use client";

import { FormButton } from "@/components/buttons/button";
import { format } from "date-fns";
import { Download } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { getAllUsers } from "../servers/user";

export default function ExportSection() {
  const [isPending, startTransition] = React.useTransition();

  // export csv
  const convertToCSV = (objArray: object[]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    console.log(array);
    let str = `\r\n`;
    str += "SL, Name, Mobile, Age, Gender, District, Created At \r\n";

    for (let i = 0; i < array.length; i++) {
      let line = `${i + 1}`;
      for (const index in array[i]) {
        if (line !== "") line += ",";
        if (index !== "doctor") {
          if (index === "userId") {
            line += `="${array[i][index]}"`;
          } else if (index !== "created_at") {
            line += array[i][index];
          } else {
            line += format(new Date(array[i][index]), "dd LLL yyyy - h:mm aaa");
          }
        }
      }
      str += line + "\r\n";
    }
    return str;
  };

  const downloadCSV = async (name: string) => {
    const res = await getAllUsers();
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
