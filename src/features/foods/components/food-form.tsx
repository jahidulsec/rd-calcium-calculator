"use client";

import { FormButton } from "@/components/buttons/button";
import { ImageInput } from "@/components/input/input";
import { FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { getCategories } from "@/features/category/servers/category";
import { category } from "@/generated/prisma";
import { FoodSchema, FoodSchemaType } from "@/schema/food";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { createFood } from "../actions/food";
import { toast } from "sonner";

export default function FoodForm({ onClose }: { onClose: () => void }) {
  const form = useForm<FoodSchemaType>({
    resolver: zodResolver(FoodSchema),
  });

  const [categories, setCategories] = React.useState<category[]>([]);

  // watch image upload
  const image = form.getValues("image");
  form.watch("image");

  React.useEffect(() => {
    if (categories.length === 0) {
      getCategories().then((data) => setCategories(data));
    }
  }, []);

  async function onSubmit(values: FoodSchemaType) {
    const res = await createFood(values);
    toast[res.success ? "success" : "error"](res.message);
    if (res.success) {
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 justify-start gap-3"
      >
        <FormField
          name="en_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name (English)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="eg. Eggs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bn_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name (Bangla)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="eg. ডিম" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Select Categories</FormLabel>
              <MultiSelect onValuesChange={field.onChange} values={field.value}>
                <FormControl>
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select categories..." />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {categories.map((item) => (
                      <MultiSelectItem value={item.id} key={item.id}>
                        {item.name}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="calcium_mg"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calcium Value (mg)</FormLabel>
              <FormControl>
                <Input
                  {...form.register("calcium_mg", { valueAsNumber: true })}
                  type="number"
                  placeholder="eg. 50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="unit"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="eg. 1 Pcs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageInput id="image" field={field} formImage={image} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton isPending={form.formState.isSubmitting}>Save</FormButton>
      </form>
    </Form>
  );
}
