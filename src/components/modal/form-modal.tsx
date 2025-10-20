import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

export default function FormModal({
  title,
  form,
  ...props
}: DialogProps & { title: string; form: React.ReactNode }) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {form}
      </DialogContent>
    </Dialog>
  );
}
