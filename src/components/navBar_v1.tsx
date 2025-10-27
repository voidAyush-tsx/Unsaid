"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./vibrate.module.css";
import menuStyles from "./MenuButton.module.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Refs for the menu button animation
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

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

  const onEnter = () => {
    tlRef.current?.play();
    setIsMenuOpen(true);
  };
  const onLeave = () => {
    tlRef.current?.reverse();
    setIsMenuOpen(false);
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
      {/* Menu button */}
      <div
        className="relative group"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
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
        {isMenuOpen && (
          <div className="absolute top-0 right-0 h-full flex items-center pr-16">
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;