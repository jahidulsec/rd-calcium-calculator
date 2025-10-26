"use client";

import { BannerSchema, BannerSchemaType } from "@/schema/banner";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { createBanner } from "../actions/banner";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/input/input";
import { FormButton } from "@/components/buttons/button";

export default function BannerForm({ onclose }: { onclose: () => void }) {
  const form = useForm<BannerSchemaType>({
    resolver: zodResolver(BannerSchema),
  });

  // watch image upload
  const image = form.getValues("image");
  form.watch("image");

  async function onSubmit(values: BannerSchemaType) {
    const res = await createBanner(values);
    toast[res.success ? "success" : "error"](res.message);
    if (res.success) {
      onclose();
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageInput id="image" field={field} imageClassName="w-full aspect-video size-auto flex justify-center" formImage={image} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton
          className="w-fit min-w-[18rem]"
          isPending={form.formState.isSubmitting}
        >
          Save
        </FormButton>
      </form>
    </Form>
  );
}
