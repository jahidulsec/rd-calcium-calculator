"use client";

import React from "react";
import { BackButton } from "@/components/buttons/button";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/section/section";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/features/auth/actions/auth";
import { useRouter } from "@bprogress/next";

export default function HeaderSection() {
  const [pending, startTransaction] = React.useTransition();
  const router = useRouter();

  return (
    <Header className="flex justify-between items-center gap-6">
      <BackButton />
      <Button
        size={"icon"}
        className="rounded-full text-destructive hover:border-destructive"
        variant={"outline"}
        disabled={pending}
        onClick={() => {
          startTransaction(async () => {
            toast.promise(logout, {
              loading: "Loading...",
              success: (data) => {
                if (!data.success) throw data;
                router.replace("/");
                return data.message;
              },
              error: (data) => data.message,
            });
          });
        }}
      >
        <LogOut /> <span className="sr-only">Logout</span>
      </Button>
    </Header>
  );
}
