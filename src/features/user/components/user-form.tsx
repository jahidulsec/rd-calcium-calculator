"use client";

import { UserFormType, UserSchema } from "@/schema/user";
import { useRouter } from "@bprogress/next";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProfile } from "../actions/user";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/buttons/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import BaseForm from "./base-form";
import { DictionaryType } from "@/lib/dictionaries";

export default function UserForm({
  data,
}: {
  data: DictionaryType["profileForm"];
}) {
  const form = useForm<UserFormType>({
    resolver: zodResolver(UserSchema),
  });

  const router = useRouter();

  async function onSubmit(values: UserFormType) {
    const res = await createProfile(values);

    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <BaseForm data={data} form={form as any} />

        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <p className="text-xs text-muted-foreground [&>a]:text-foreground tracking-wide">
            You agree to our{" "}
            <Link href={""} className="hover:underline font-semibold">
              Term of Service
            </Link>{" "}
            And{" "}
            <Link href={""} className="hover:underline font-semibold">
              Privacy Policy
            </Link>
          </p>
        </div>

        <FormButton isPending={form.formState.isSubmitting}>Submit</FormButton>
      </form>
    </Form>
  );
}
