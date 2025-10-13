import { $Enums } from "@/generated/prisma";

export type AuthUser = {
  mobile: string;
  name?: string;
  role: UserRole;
  age?: $Enums.user_information_age;
  gender?: $Enums.user_information_gender;
};

export type UserRole = "admin" | "user";
