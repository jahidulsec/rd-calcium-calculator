"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type User = {
  mobile: string;
};

type ContextType = {
  user: User | undefined;
  onUser: Dispatch<SetStateAction<User | undefined>>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        user,
        onUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context is not defined");

  return context;
};
