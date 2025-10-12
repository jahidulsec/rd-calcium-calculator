import { BackButton } from "@/components/buttons/button";
import { Header, Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import ProfileForm from "@/features/user/components/profile-form";
import { getAuthUser } from "@/lib/dal";
import { AuthUser } from "@/types/auth-user";
import { LogOut } from "lucide-react";
import React from "react";

export default async function ProfilePage() {
  const user = await getAuthUser();

  return (
    <>
      <Header className="flex justify-between items-center gap-6">
        <BackButton />
        <Button size={"icon"} className="rounded-full" variant={"outline"}>
          <LogOut /> <span className="sr-only">Logout</span>
        </Button>
      </Header>

      <Section>
        <ProfileForm user={user as AuthUser} />
      </Section>
    </>
  );
}
