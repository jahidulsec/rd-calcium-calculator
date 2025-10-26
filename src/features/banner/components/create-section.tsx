"use client";

import FormModal from "@/components/modal/form-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

export default function CreateBannerSection() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button size={"sm"} onClick={() => setOpen(true)}>
        <PlusCircle /> Add
      </Button>

      <FormModal
        title="Banner"
        open={open}
        onOpenChange={setOpen}
        form={<></>}
      />
    </>
  );
}
