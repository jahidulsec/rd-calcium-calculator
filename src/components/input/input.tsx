"use client";

import { ControllerRenderProps } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Label } from "../ui/label";

const ImageInput = ({
  field,
  className,
  onChange,
  formImage,
  id,
  ...props
}: React.ComponentProps<"input"> & {
  field?: ControllerRenderProps<any>;
  formImage?: File;
}) => {
  const validatedId = id ?? crypto.randomUUID();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="h-8 px-6 bg-muted border rounded-md w-fit">
        Upload
      </Label>
      <div className="w-14 flex items-center justify-center aspect-square bg-muted border rounded-md overflow-hidden">
        <div className="relative w-full aspect-square mix-blend-multiply">
          <Image
            fill
            objectFit="cover"
            src={
              formImage
                ? URL.createObjectURL(formImage)
                : "/images/file-icon.svg"
            }
            alt=""
          />
        </div>
      </div>
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
