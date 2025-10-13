import { BackButton } from "@/components/buttons/button";
import { Header, Section } from "@/components/section/section";
import { PageHeading } from "@/components/typography/heading";
import UserForm from "@/features/user/components/user-form";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function ProfilePage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locales);

  return (
    <>
      <Header className="flex flex-col gap-6">
        <BackButton />
        <PageHeading>{dict.profileSetup.sectionTitle}</PageHeading>
      </Header>

      <Section>
        <UserForm data={dict.profileForm} />
      </Section>
    </>
  );
}
