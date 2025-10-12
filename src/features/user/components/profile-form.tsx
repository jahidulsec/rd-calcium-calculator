"use client";

import { UpdateUserFormType, UpdateUserSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateProfile } from "../actions/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormButton } from "@/components/buttons/button";
import BaseForm from "./base-form";
import { PageHeading } from "@/components/typography/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AuthUser } from "@/types/auth-user";

export default function ProfileForm({ user }: { user: AuthUser }) {
  const form = useForm<UpdateUserFormType>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const image = form.getValues("image");

  form.watch("image");

  async function onSubmit(values: UpdateUserFormType) {
    //TODO: Do something with the form values for profile update.
    const res = await updateProfile(values);

    toast[res.success ? "success" : "error"](res.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <PageHeading>Personal Information</PageHeading>
          <div className="relative">
            <Avatar className="size-20">
              <AvatarImage
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "https://github.com/shadcn.png"
                }
                alt="@johnDoe"
              />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant={"outline"}
              className="absolute bottom-0 right-0 rounded-full"
              size={"icon-sm"}
              asChild
            >
              <Label htmlFor="image">
                <Camera /> <span className="sr-only">Add Image</span>
              </Label>
            </Button>
          </div>
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <BaseForm form={form as any} />

        <FormButton isPending={form.formState.isSubmitting}>Save</FormButton>
      </form>
    </Form>
  );
}
