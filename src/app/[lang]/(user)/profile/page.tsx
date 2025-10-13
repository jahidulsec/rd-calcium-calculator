import { BackButton } from "@/components/buttons/button";
import { Header, Section } from "@/components/section/section";
import { PageHeading } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import ProfileForm from "@/features/user/components/profile-form";
import { getUser } from "@/features/user/servers/user";
import { getAuthUser } from "@/lib/dal";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { AuthUser } from "@/types/auth-user";
import { params } from "@/types/search-params";
import { LogOut } from "lucide-react";
import React from "react";

export default async function ProfilePage({ params }: { params: params }) {
  const authUser = await getAuthUser();

  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);

  // get user
  const user = await getUser(authUser?.mobile ?? "");

  return (
    <>
      <Header className="flex justify-between items-center gap-6">
        <BackButton />
        <Button size={"icon"} className="rounded-full" variant={"outline"}>
          <LogOut /> <span className="sr-only">Logout</span>
        </Button>
      </Header>

      <PageHeading className="text-center">
        {dict.profile.sectionTitle}
      </PageHeading>

      <Section>
        <ProfileForm
          userData={user}
          data={dict.profileForm}
          user={authUser as AuthUser}
        />
      </Section>
    </>
  );
}
