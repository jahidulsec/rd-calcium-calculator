import HeaderSection from "@/features/auth/components/header-section";
import LoginForm from "@/features/auth/components/login-form";
import { getDictionary, Locales } from "@/lib/dictionaries";
import { params } from "@/types/search-params";
import React from "react";

export default async function LoginPage({ params }: { params: params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang?.toString() as Locales);

  return (
    <>
      <HeaderSection title={dict.login.pageTitle} />
      <LoginForm data={dict.loginForm} />
    </>
  );
}
