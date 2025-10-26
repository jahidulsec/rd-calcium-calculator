"use client";

import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormButton } from "@/components/buttons/button";
import {
  AdminSchema,
  AdminSchemaType,
  UpdateAdminSchemaType,
  UpdateAdminSchema,
} from "@/schema/admin";
import { toast } from "sonner";
import { PasswordInput } from "@/components/input/password";
import { createAdmin, updateAdmin } from "../actions/admin";
import { admin } from "@/generated/prisma";

export function AdminForm({
  onClose,
  admin,
}: {
  onClose: () => void;
  admin?: admin;
}) {
  const form = useForm<
    typeof admin extends undefined ? AdminSchemaType : UpdateAdminSchemaType
  >({
    resolver: zodResolver(admin ? UpdateAdminSchema : AdminSchema),
    defaultValues: {
      full_name: admin?.full_name,
      username: admin?.username,
    },
  });

  async function onSubmit(
    values: typeof admin extends undefined
      ? AdminSchemaType
      : UpdateAdminSchemaType
  ) {
    const res = admin
      ? await updateAdmin(admin.id, values)
      : await createAdmin(values as AdminSchemaType);

    console.log(values);
    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      onClose();
    }
  }

  return (
    <div className={"flex flex-col gap-6"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input id="username" placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton isPending={form.formState.isSubmitting}>
              Create
            </FormButton>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
}
