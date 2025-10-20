"use client";

import FormModal from "@/components/modal/form-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import FoodForm from "./food-form";

export default function AddFoodButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button size={"sm"} onClick={() => setOpen(true)}>
        <PlusCircle /> Add
      </Button>

      <FormModal
        open={open}
        onOpenChange={setOpen}
        title="Add Food"
        form={<FoodForm onClose={() => setOpen(false)} />}
      />
    </>
  );
}
