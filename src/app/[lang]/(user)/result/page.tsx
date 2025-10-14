import NavUser from "@/components/nav/nav-user";
import ProgressSection from "@/features/result/components/progress-section";
import { getAuthUser } from "@/lib/dal";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { AuthUser } from "@/types/auth-user";
import { params } from "@/types/search-params";
import React from "react";

export default async function ResultPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);
  const authUser = await getAuthUser();

  return (
    <>
      <NavUser
        lang={lang as Locales}
        showBackButton
        pageTitle={dict.result.sectionTitle}
      />

      <ProgressSection user={authUser as AuthUser} data={dict.result} />
    </>
  );
}
