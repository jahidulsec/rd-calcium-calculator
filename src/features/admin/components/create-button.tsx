"use client";

import FormModal from "@/components/modal/form-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { AdminForm } from "./admin-form";

export default function CreateButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} size={"sm"}>
        <PlusCircle />
        <span>Add</span>
      </Button>

      <FormModal
        open={open}
        onOpenChange={setOpen}
        form={<AdminForm onClose={() => setOpen(false)} />}
        title="Create Admin"
      />
    </>
  );
}
