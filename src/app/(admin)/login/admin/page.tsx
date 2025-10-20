import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/features/admin/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="w-8 aspect-square overflow-hidden rounded-md bg-background p-1 flex">
            <div className="relative w-8 aspect-square mix-blend-multiply">
              <Image
                src={"/images/logo-i.png"}
                objectFit="cover"
                fill
                alt="Radiant Pharma"
              />
            </div>
          </div>
          Calcium Calculator
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
