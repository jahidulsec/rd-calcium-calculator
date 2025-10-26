"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ ...props }: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={!showPassword ? "password" : "text"}
        name="password"
        id="password"
        {...props}
      />
      <button
        type="button"
        className="eye absolute top-[50%] -translate-y-[50%] right-3 cursor-pointer"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? (
          <Eye className="size-4" />
        ) : (
          <EyeOff className="size-4" />
        )}
      </button>
    </div>
  );
};

export { PasswordInput };
