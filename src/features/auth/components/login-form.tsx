"use client";

import { Section } from "@/components/section/section";
import { LoginFormType, LoginSchema } from "@/schema/auth";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Asterisk } from "lucide-react";
import { FormButton } from "@/components/buttons/button";
import { login } from "../actions/auth";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { DictionaryType } from "@/lib/dictionaries";

export default function LoginForm({
  data,
}: {
  data: DictionaryType["loginForm"];
}) {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  async function onSubmit(values: LoginFormType) {
    //TODO: Do something with the form values for login.
    const res = await login(values);

    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      router.push("/verify");
    }
  }

  return (
    <Section className="my-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-start">
                  {data.phoneLabel}{" "}
                  <Asterisk className="text-destructive" size={10} />
                </FormLabel>
                <FormControl>
                  <Input placeholder="01 XXX XXX XXX" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton size={"lg"} className="font-bold">
            {data.buttonTitle}
          </FormButton>
        </form>
      </Form>
    </Section>
  );
}
