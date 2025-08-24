"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useAuthContext } from "@/contexts/AuthContext";
import styles from "./vibrate.module.css";

const Navbar: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]); // ✅ array of refs
  const { user, logout } = useAuthContext();

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    gsap.set(dropdown, { autoAlpha: 0, y: -10 });
    gsap.set(listRefs.current, { autoAlpha: 0, y: -10 });

    const showDropdown = () => {
      gsap.to(dropdown, {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(listRefs.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08,
      });
    };

    const hideDropdown = () => {
      gsap.to(dropdown, {
        autoAlpha: 0,
        y: -10,
        duration: 0.25,
        ease: "power3.in",
      });

      gsap.to(listRefs.current, {
        autoAlpha: 0,
        y: -10,
        duration: 0.2,
        ease: "power3.in",
        stagger: 0.05,
      });
    };

    const parent = dropdown.parentElement;
    if (!parent) return;

    parent.addEventListener("mouseenter", showDropdown);
    parent.addEventListener("mouseleave", hideDropdown);

    return () => {
      parent.removeEventListener("mouseenter", showDropdown);
      parent.removeEventListener("mouseleave", hideDropdown);
    };
  }, []);

  return (
    <nav className="top-5 flex flex-row items-center justify-between p-3 bg-[#A1CDD9] text-white shadow-xl rounded-full m-4">
      {/* Call button */}
      <div
        className={`group ${styles.vibrateOnHover} flex items-center rounded-full bg-[#74B7C9] p-4 cursor-pointer`}
      >
        <Image
          src="/navBar/call_icon.svg"
          alt="Call Icon"
          width={16}
          height={16}
          className="group-hover:scale-150 transition-transform duration-300 w-4 h-4"
        />
      </div>

      {/* Logo */}
      <Image
        src="/navBar/navBar_logo.svg"
        alt="Logo"
        width={200}
        height={50}
        className="w-50 cursor-pointer"
        onClick={() => (window.location.href = "/")}
      />

      {/* Menu with Dropdown */}
      <div className="relative group">
        <div className="flex items-center rounded-full bg-[#74B7C9] p-4 cursor-pointer">
          <Image
            src="/navBar/menu_icon.svg"
            alt="Menu Icon"
            width={16}
            height={16}
            className="w-4 h-4 group-hover:rotate-90 group-hover:scale-120 transition-transform duration-300"
          />
        </div>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-52 rounded-xl bg-[#74B7C9] text-white shadow-lg overflow-hidden"
        >
          <ul className="flex flex-col divide-y divide-[#A1CDD9]">
            {/* Auth-based rendering */}
            <li
              ref={(el) => {
                listRefs.current[0] = el;
              }}
              className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
            >
              {user ? (
                <span>User: {user.uid}</span>
              ) : (
                <a href="/signin">Sign In</a>
              )}
            </li>

            {user && (
              <li
                ref={(el) => {
                  listRefs.current[1] = el;
                }}
                className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
              >
                <button onClick={logout}>Logout</button>
              </li>
            )}

            <li
              ref={(el) => {
                listRefs.current[2] = el;
              }}
              className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
            >
              Link 3
            </li>
            <li
              ref={(el) => {
                listRefs.current[3] = el;
              }}
              className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
            >
              Link 4
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;