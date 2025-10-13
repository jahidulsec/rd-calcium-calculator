"use client";

import { Section } from "@/components/section/section";
import { VerificationSchema, VerificationFormType } from "@/schema/auth";
import React, { useTransition } from "react";
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
import { resentOtp, verifyOTP } from "../actions/auth";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/dictionaries";
import { Spinner } from "@/components/ui/spinner";
import { useAuthContext } from "@/providers/auth-provider";

export default function VerificationForm({
  data,
}: {
  data: DictionaryType["verificationForm"];
}) {
  const form = useForm<VerificationFormType>({
    resolver: zodResolver(VerificationSchema),
  });

  const { user } = useAuthContext();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: VerificationFormType) {
    // set user mobile
    values.mobile = user?.mobile ?? "";

    const res = await verifyOTP(values);

    if (res.success) {
      if (res.data?.user.user_information) {
        router.push("/success");
      } else {
        // if no user profile, redirect setup page
        router.push("/profile/setup");
      }
    } else {
      toast.error(res.message);
    }
  }

  React.useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  });

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
                  {data.label}{" "}
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
            <p className="text-xs text-muted-foreground">{data.desc}</p>
            <Button
              variant={"link"}
              className="text-secondary w-fit px-0"
              type="button"
              onClick={() => {
                startTransition(async () => {
                  toast.promise(resentOtp({ mobile: user?.mobile ?? "" }), {
                    loading: "Sending...",
                    success: (data) => {
                      if (!data.success) {
                        throw data;
                      }
                      return data.message;
                    },
                    error: (data) => data.message,
                  });
                });
              }}
            >
              {isPending ? <Spinner /> : data.resend}
            </Button>
          </div>

          <FormButton
            isPending={form.formState.isSubmitting}
            className="font-bold"
            size={"lg"}
          >
            {data.buttonTitle}
          </FormButton>
        </form>
      </Form>
    </Section>
  );
}
