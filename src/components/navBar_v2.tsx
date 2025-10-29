"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar_v2: React.FC = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home page after logout
    setIsDropdownOpen(false);
  };

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
        className="font-unsaid font-bold cursor-pointer text-[#736B66] hover:text-[#3A3633] px-4 py-2 transition-colors"
        style={{ fontSize: "18px" }}
        onClick={() => (window.location.href = "/about?scroll=allcounsellors")}
      >
        Connect
      </button>
      <button
        className="font-unsaid font-bold cursor-pointer text-[#736B66] hover:text-[#3A3633] px-4 py-2 transition-colors"
        style={{ fontSize: "18px" }}
        onClick={() => (window.location.href = "/assessment")}
      >
        Assessment
      </button>
      <button
        className="font-unsaid font-bold cursor-pointer text-[#736B66] hover:text-[#3A3633] px-4 py-2 transition-colors"
        style={{ fontSize: "18px" }}
        onClick={() => (window.location.href = "/about")}
      >
        About Us
      </button>
      <button
        className="font-unsaid font-bold cursor-pointer text-[#736B66] hover:text-[#3A3633] px-4 py-2 transition-colors"
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
      <div className="flex items-center gap-4">
        <button
          className="flex items-center justify-center bg-[#A1CDD9] px-6 py-3 gap-2 rounded-4xl hover:bg-[#E48A39] hover:text-white transition-colors cursor-pointer"
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
        {session && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-12 h-12 bg-[#A1CDD9] rounded-full hover:bg-[#E48A39] hover:text-white transition-colors cursor-pointer"
            >
              <User className="w-6 h-6 text-white" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#A1CDD9] rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    window.location.href = "/profile";
                  }}
                  className="block w-full rounded-t-md text-left px-4 py-2 text-base font-unsaid font-bold text-[#F7F4F2] hover:bg-[#99C3CE] hover:text-white cursor-pointer"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-b-md text-left px-4 py-2 text-base font-unsaid font-bold text-[#F7F4F2] hover:bg-[#99C3CE] hover:text-white cursor-pointer"
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar_v2;