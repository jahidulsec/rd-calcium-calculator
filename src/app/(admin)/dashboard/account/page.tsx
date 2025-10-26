import {
  DashboardHeader,
  DashboardSection,
} from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import { AdminForm } from "@/features/admin/components/admin-form";
import { getAdmin } from "@/features/admin/servers/admin";
import { getAuthUser } from "@/lib/dal";
import { IconUser } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminAccountPage() {
  const authUser = await getAuthUser();

  if (!authUser) redirect("/login/admin");

  const admin = await getAdmin(authUser.mobile);

  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconUser /> Account
        </DashbaordHeading>

        <DashboardSection className=" border py-6 rounded-md">
          {admin && <AdminForm admin={admin.data || undefined} />}
        </DashboardSection>
      </DashboardHeader>
    </>
  );
}
