"use client";

import { ControllerRenderProps } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const ImageInput = ({
  field,
  className,
  onChange,
  formImage,
  imageUrl,
  imageClassName,
  id,
  ...props
}: React.ComponentProps<"input"> & {
  field?: ControllerRenderProps<any>;
  formImage?: File;
  imageUrl?: string;
  imageClassName?: string;
}) => {
  const validatedId = id ?? crypto.randomUUID();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="h-8 px-6 bg-muted border rounded-md w-fit">
        Upload
      </Label>
      <Avatar className={cn("rounded-md size-14 bg-muted", imageClassName)}>
        <AvatarImage
          className={"object-cover"}
          src={
            formImage
              ? URL.createObjectURL(formImage)
              : imageUrl || "/images/file-icon.svg"
          }
        />
      </Avatar>

      <Input
        id={validatedId}
        type="file"
        className={cn("hidden", className)}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          field?.onChange(file);
          onChange?.(e);
        }}
        {...props}
      />
    </div>
  );
};

export { ImageInput };
