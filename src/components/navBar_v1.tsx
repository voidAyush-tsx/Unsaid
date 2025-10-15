"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSession, signOut } from 'next-auth/react';
import styles from "./vibrate.module.css";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Refs
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const userLabelRef = useRef<HTMLLIElement | null>(null);
  const logoutRef = useRef<HTMLLIElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    gsap.set(dropdown, { autoAlpha: 0, y: -10, pointerEvents: "none" });

    const items = Array.from(
      dropdown.querySelectorAll<HTMLLIElement>("li[data-anim]")
    );

    tlRef.current = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
      onStart: () => { gsap.set(dropdown, { pointerEvents: "auto" }); },
      onReverseComplete: () => {
        gsap.set(dropdown, { pointerEvents: "none" });
      },
    });

    tlRef.current
      .to(dropdown, { autoAlpha: 1, y: 0, duration: 0.25 }, 0)
      .fromTo(
        items,
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.07 },
        0.05
      );

    const parent = dropdown.parentElement;
    if (!parent) return;

    const open = () => tlRef.current?.play();
    const close = () => tlRef.current?.reverse();

    parent.addEventListener("mouseenter", open);
    parent.addEventListener("mouseleave", close);

    return () => {
      parent.removeEventListener("mouseenter", open);
      parent.removeEventListener("mouseleave", close);
      tlRef.current?.kill();
    };
  }, []);

  // Animate user section when signing in
  useEffect(() => {
    if (user && (userLabelRef.current || logoutRef.current)) {
      const targets = [userLabelRef.current, logoutRef.current].filter(
        Boolean
      ) as Element[];
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: -8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
          stagger: 0.05,
        }
      );
    }
  }, [user]);

  // Smooth logout animation
  const handleLogoutAnimated = async () => {
    const targets = [logoutRef.current, userLabelRef.current].filter(
      Boolean
    ) as Element[];

    if (targets.length) {
      await new Promise<void>((resolve) => {
        gsap.to(targets, {
          autoAlpha: 0,
          y: -8,
          duration: 0.2,
          ease: "power2.in",
          stagger: { each: 0.03, from: "end" },
          onComplete: resolve,
        });
      });
    }

    await signOut({ callbackUrl: '/' });
  };

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
        <div className="flex items-center rounded-full bg-[#74B7C9] p-4 cursor-pointer select-none">
          <Image
            src="/navBar/menu_icon.svg"
            alt="Menu Icon"
            width={16}
            height={16}
            className="w-4 h-4 group-hover:rotate-90 group-hover:scale-120 transition-transform duration-300"
          />
        </div>

        {/* Dropdown */}
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 rounded-xl bg-[#74B7C9] text-white shadow-lg overflow-hidden"
        >
          <ul className="flex flex-col divide-y divide-[#A1CDD9]">
            {user ? (
              <li
                data-anim
                ref={(el) => { userLabelRef.current = el; }}
                className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
                onClick={() => (window.location.href = "/profile")}
              >
                User: {user.id}
              </li>
            ) : (
              <li
                data-anim
                className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
              >
                <a href="/signin">Sign In</a>
              </li>
            )}

            {user && (
              <li
                data-anim
                ref={(el) => { logoutRef.current = el; }}
                className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
              >
                <button onClick={handleLogoutAnimated}>Logout</button>
              </li>
            )}

            <li
              data-anim
              className="px-4 py-2 hover:bg-[#A1CDD9] cursor-pointer"
            >
              Link 3
            </li>
            <li
              data-anim
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