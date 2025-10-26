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
import { AdminSchema, AdminSchemaType } from "@/schema/admin";
import { toast } from "sonner";
import { PasswordInput } from "@/components/input/password";
import { createAdmin } from "../actions/admin";

export function AdminForm({ onClose }: { onClose: () => void }) {
  const form = useForm<AdminSchemaType>({
    resolver: zodResolver(AdminSchema),
  });

  async function onSubmit(values: AdminSchemaType) {
    const res = await createAdmin(values);

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
