"use client";

import { Section } from "@/components/section/section";
import { VerificationSchema, VerificationFormType } from "@/schema/auth";
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
import { verifyOTP } from "../actions/auth";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { Button } from "@/components/ui/button";

export default function VerificationForm() {
  const form = useForm<VerificationFormType>({
    resolver: zodResolver(VerificationSchema),
  });

  const router = useRouter();

  async function onSubmit(values: VerificationFormType) {
    //TODO: Do something with the form values for verification.
    const res = await verifyOTP(values);

    if (res.success) {
      router.push("/success");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Section className="my-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-start">
                  Verification Code{" "}
                  <Asterisk className="text-destructive" size={10} />
                </FormLabel>
                <FormControl>
                  <Input placeholder="XXX XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-1 my-1">
            <p className="text-xs text-muted-foreground">
              OTP Will Send By a Phone Number.
            </p>
            <Button
              variant={"link"}
              className="text-secondary w-fit px-0"
              type="button"
            >
              Resend Code
            </Button>
          </div>

          <FormButton className="font-bold" size={"lg"}>Continue</FormButton>
        </form>
      </Form>
    </Section>
  );
}
