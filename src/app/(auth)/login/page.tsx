import HeaderSection from "@/features/auth/components/header-section";
import LoginForm from "@/features/auth/components/login-form";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <HeaderSection title="Let’s create your account" />
      <LoginForm />
    </>
  );
}
