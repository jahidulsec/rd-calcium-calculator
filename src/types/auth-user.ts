export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
};

export type UserRole = "admin" | "user";
