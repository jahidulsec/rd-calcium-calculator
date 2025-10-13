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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AuthUser } from "@/types/auth-user";
import { DictionaryType } from "@/lib/dictionaries";
import { Prisma } from "@/generated/prisma";

export default function ProfileForm({
  user,
  data,
  userData,
}: {
  user: AuthUser;
  userData?: Prisma.userGetPayload<{
    include: { user_information: { include: { user_image: true } } };
  }>;
  data: DictionaryType["profileForm"];
}) {
  const form = useForm<UpdateUserFormType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      fullName: userData?.user_information?.full_name,
      age: userData?.user_information?.age,
      gender: userData?.user_information?.gender,
      district: userData?.user_information?.district,
    },
  });

  // watch image upload
  const image = form.getValues("image");
  form.watch("image");

  async function onSubmit(values: UpdateUserFormType) {
    values.userId = userData?.mobile;

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
          <div className="relative">
            <Avatar className="size-20">
              <AvatarImage
                className="object-cover"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : userData?.user_information?.user_image?.file_name
                }
                alt="@johnDoe"
              />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
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

        <BaseForm data={data} form={form as any} />

        <FormButton isPending={form.formState.isSubmitting}>
          {data.save}
        </FormButton>
      </form>
    </Form>
  );
}
