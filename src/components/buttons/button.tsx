"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "@bprogress/next/app";
import { Spinner } from "../ui/spinner";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className="rounded-full border-0 shadow-none"
      onClick={() => router.back()}
    >
      <ArrowLeft /> <span className="sr-only">Back to previous page</span>
    </Button>
  );
};

const ActionButton = ({
  children,
  isPending = false,
  ...props
}: ButtonProps & { isPending?: boolean }) => {
  return (
    <Button {...props} disabled={isPending || props.disabled}>
      {isPending && <Loader className="animate-spin" />}
      {children}
    </Button>
  );
};

const FormButton = ({
  children, isPending,
  ...props
}: ButtonProps & { isPending?: boolean }) => {
  return (
    <Button type="submit" {...props} disabled={isPending || props.disabled}>
      {isPending && <Spinner />}
      {children}
    </Button>
  );
};

export { BackButton, ActionButton, FormButton };
