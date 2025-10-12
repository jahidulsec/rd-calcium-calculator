import { BackButton } from "@/components/buttons/button";
import { Header, Section } from "@/components/section/section";
import { PageHeading } from "@/components/typography/heading";
import UserForm from "@/features/user/components/user-form";
import React from "react";

export default function ProfilePage() {
  return (
    <>
      <Header className="flex flex-col gap-6">
        <BackButton />
        <PageHeading>Setup Your Personal Information</PageHeading>
      </Header>

      <Section>
        <UserForm />
      </Section>
    </>
  );
}
