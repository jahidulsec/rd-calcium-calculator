import Image from "next/image";
import React from "react";

export default function LogoSection() {
  return (
    <div className="flex justify-center items-center gap-3 py-2">
      <Image src={`/images/logos/logo1.png`} alt="" width={100} height={80} />
      <Image src={`/images/logos/logo2.png`} alt="" width={100} height={80} />
      <Image src={`/images/logos/vita.jpg`} alt="" width={100} height={80} />
    </div>
  );
}
