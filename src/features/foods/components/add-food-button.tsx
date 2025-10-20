"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Food</DialogTitle>
          </DialogHeader>

          <FoodForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
