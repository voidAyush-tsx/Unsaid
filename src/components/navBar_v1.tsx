"use client";

import React, { useRef, useEffect, useState } from "react"; // Added useState
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./vibrate.module.css";
import menuStyles from "./MenuButton.module.css";

const Navbar: React.FC = () => {
  // Refs for the menu button animation
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/close

  useEffect(() => {
    const refs = [
      containerRef.current,
      centerRef.current,
      topRef.current,
      rightRef.current,
      bottomRef.current,
      leftRef.current,
    ];
    if (refs.some((ref) => !ref)) return;

    const parts = [
      topRef.current,
      rightRef.current,
      bottomRef.current,
      leftRef.current,
    ];

    gsap.set(centerRef.current, { scale: 0, transformOrigin: "center center" });

    gsap.set(parts, { borderRadius: "50%" });
    // Adjust initial positions for the dot animation to form a square
    gsap.set(topRef.current, { x: -6, y: -6 });
    gsap.set(rightRef.current, { x: 6, y: -6 });
    gsap.set(bottomRef.current, { x: 6, y: 6 });
    gsap.set(leftRef.current, { x: -6, y: 6 });

    tlRef.current = gsap
      .timeline({
        paused: true,
        defaults: { duration: 0.3, ease: "power2.inOut" },
      })
      .to(containerRef.current, { rotate: 45 })
      .to(parts, { x: 0, y: 0, borderRadius: "2.5px" }, "<")
      .to([topRef.current, bottomRef.current], { scaleY: 4 }, "<")
      .to([leftRef.current, rightRef.current], { scaleX: 4 }, "<")
      .to(centerRef.current, { scale: 1 }, "<");

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);

    if (!menuOpen) {
      tlRef.current?.play();

      // Kill any existing timeline
      menuTlRef.current?.kill();

      // Create smooth coordinated timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      menuTlRef.current = tl;

      tl.to(menuRef.current, {
        width: "calc(100% - 80px)",
        opacity: 1,
        duration: 0.8,
      })
        .to(
          logoRef.current,
          {
            scale: 0.3,
            opacity: 0,
            duration: 0.8,
          },
          "<"
        )
        .fromTo(
          menuItemsRef.current.filter((item): item is HTMLLIElement => item !== null),
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.5"
        );
    } else {
      tlRef.current?.reverse();

      // Kill any existing timeline
      menuTlRef.current?.kill();

      const tl = gsap.timeline({ defaults: { ease: "power3.in" } });
      menuTlRef.current = tl;

      tl.to(menuItemsRef.current.filter((item): item is HTMLLIElement => item !== null), {
        opacity: 0,
        x: 40,
        duration: 0.3,
        stagger: 0.05,
      })
        .to(
          menuRef.current,
          {
            width: 0,
            opacity: 0,
            duration: 0.3,
          },
          "-=0.15"
        )
        .to(
          logoRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
          },
          "<"
        );
    }
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
        ref={logoRef}
        src="/navBar/navBar_logo.svg"
        alt="Logo"
        width={200}
        height={50}
        className="w-50 cursor-pointer absolute left-1/2 transform -translate-x-1/2 z-10"
        onClick={() => (window.location.href = "/")}
      />

      {/* Menu button */}
      <div className="relative group" onClick={toggleMenu}>
        <div className="flex items-center rounded-full bg-[#74B7C9] p-4 cursor-pointer select-none">
          <div ref={containerRef} className={menuStyles.iconContainer}>
            <div
              ref={centerRef}
              className={`${menuStyles.iconPart} ${menuStyles.partCenter}`}
            ></div>
            <div
              ref={topRef}
              className={`${menuStyles.iconPart} ${menuStyles.partTop}`}
            ></div>
            <div
              ref={rightRef}
              className={`${menuStyles.iconPart} ${menuStyles.partRight}`}
            ></div>
            <div
              ref={bottomRef}
              className={`${menuStyles.iconPart} ${menuStyles.partBottom}`}
            ></div>
            <div
              ref={leftRef}
              className={`${menuStyles.iconPart} ${menuStyles.partLeft}`}
            ></div>
          </div>
        </div>
        <div
          ref={menuRef}
          className={`absolute top-0 right-0 h-full bg-transparent rounded-full opacity-0 w-0 overflow-visible flex items-center justify-end pr-20 z-20 ${
            menuOpen ? "" : "pointer-events-none"
          }`}
        >
          <ul className="flex flex-row space-x-8 text-base font-extrabold text-white whitespace-nowrap">
            {["Connect", "Assessment", "About Us", "Support", "Blog", "Account"].map(
              (item, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  className={menuOpen ? "cursor-pointer" : "cursor-default"}
                >
                  <a
                    href={menuOpen ? "#" : undefined}
                    className={`font-unsaid text-xl ${
                      menuOpen ? "hover:text-[#926247]" : "pointer-events-none"
                    } inline-block transition-transform`}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;