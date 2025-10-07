import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="my-3">
      <p className="text-center text-xs md:text-sm">
        Designed & Developed By{" "}
        <em className="not-italic font-bold ">
          <Link
            href={"https://impalaintech.com"}
            target="_blank"
            className="hover:underline hover:text-primary"
          >
            Impala Intech LTD.
          </Link>
        </em>
      </p>
    </footer>
  );
};

const RDFooter = () => {
  return (
    <footer className="my-3 flex justify-center">
      <Image width={150} height={41} src={"/images/rd-logo.png"} alt="" />
    </footer>
  );
};

export { Footer, RDFooter };
