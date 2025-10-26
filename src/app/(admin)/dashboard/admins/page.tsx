import { DashboardHeader } from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import CreateButton from "@/features/admin/components/create-button";
import { IconUsersGroup } from "@tabler/icons-react";
import React from "react";

export default function AdminPage() {
  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconUsersGroup /> Admins
        </DashbaordHeading>

        <CreateButton />
      </DashboardHeader>
    </>
  );
}
