"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Navbar_v2: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavItems = () => (
    <div className="flex flex-row items-center gap-4">
      <div className="flex items-center rounded-full p-2 cursor-pointer">
        <Image
          src="/Fprint.svg"
          alt="Fingerprint"
          width={112}
          height={102}
          className="w-10"
          onClick={() => (window.location.href = "/")}
        />
      </div>
      <button
        className="font-unsaid font-semibold cursor-pointer text-[#251404] hover:text-[#E48A39] px-4 py-2 transition-colors"
        style={{ fontSize: "18px" }}
        onClick={() => (window.location.href = "/about?scroll=allcounsellors")}
      >
        Connect
      </button>
      <button
        className="font-unsaid font-semibold cursor-pointer text-[#251404] hover:text-[#E48A39] px-4 py-2 transition-colors"
        style={{ fontSize: "18px" }}
        onClick={() => (window.location.href = "/assessment")}
      >
        Assessment
      </button>
      <button
        className="font-unsaid font-semibold cursor-pointer text-[#251404] hover:text-[#E48A39] px-4 py-2 transition-colors"
        style={{ fontSize: "18px" }}
        onClick={() => (window.location.href = "/about")}
      >
        About Us
      </button>
      <button
        className="font-unsaid font-semibold cursor-pointer text-[#251404] hover:text-[#E48A39] px-4 py-2 transition-colors"
        style={{ fontSize: "18px" }}
        onClick={() => (window.location.href = "/about?scroll=allcounsellors")}
      >
        Counsellor
      </button>
    </div>
  );

  return (
    <nav
      className={`w-full mx-auto flex flex-row items-center justify-between py-4 px-8 fixed top-0 left-0 right-0 z-50 transform-gpu transition-all duration-500 ease-in-out translate-y-0 opacity-100 pointer-events-auto ${
        isScrolled ? "backdrop-blur-xl" : ""
      }`}
    >
      <NavItems />
      <button
        className="flex items-center justify-center bg-[#A1CDD9] px-6 py-3 gap-2 rounded-4xl hover:bg-[#E48A39] transition-colors cursor-pointer"
        onClick={() =>
          (window.location.href = "/get_in_touch?scroll=contact_counsellor")
        }
      >
        <div
          className="font-unsaid font-extrabold"
          style={{ color: "#FFFFFF", fontSize: "18px" }}
        >
          Talk to a Counsellor
        </div>
        <Image
          src="/talk_to_counsellor_logo.svg"
          alt="Talk to Counsellor arrow"
          width={24}
          height={24}
          className="w-6"
        />
      </button>
      <button
        className="flex items-center justify-center bg-[#A1CDD9] px-6 py-3 gap-2 rounded-4xl hover:bg-[#E48A39] transition-colors cursor-pointer"
        onClick={() =>
          (window.location.href = "/get_in_touch?scroll=contact_counsellor")
        }
      >
        <div
          className="font-unsaid font-extrabold"
          style={{ color: "#FFFFFF", fontSize: "18px" }}
        >
          Talk to a Counsellor
        </div>
        <Image
          src="/talk_to_counsellor_logo.svg"
          alt="Talk to Counsellor arrow"
          width={24}
          height={24}
          className="w-6"
        />
      </button>
    </nav>
  );
};

export default Navbar_v2;