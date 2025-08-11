"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col items-center overflow-hidden p-0">
      <Image src="/Fprint.svg" alt="fingerprint_logo" width={64} height={64} />
      <div
        className="font-unsaid font-extrabold mt-8 mb-3"
        style={{ color: "#A1CDD9", fontSize: "36px" }}
      >
        Sign Up to Unsaid
      </div>
      <div
        className="font-unsaid font-medium"
        style={{ color: "#736B66", fontSize: "18px" }}
      >
        Create your account & treat yourself today.
      </div>

      <div className="flex flex-col items-start w-full mt-10 gap-4">

        <div className="flex flex-col gap-2 w-full">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "14px" }}
          >
            Email
          </div>
          <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2">
            <Image src="/auth/email_icon.svg" alt="email" width={24} height={24} />
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
              style={{ color: "#736B66", fontSize: "16px" }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "14px" }}
          >
            Password
          </div>
          <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2 items-center">
            <Image src="/auth/lock_icon.svg" alt="lock" width={24} height={24} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create your password"
              className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
              style={{ color: "#736B66", fontSize: "16px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Image
                src={showPassword ? "/auth/lock_eye_show.svg" : "/auth/lock_eye_hide.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="cursor-pointer"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "14px" }}
          >
            Password Confirmation
          </div>
          <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2 items-center">
            <Image src="/auth/lock_icon.svg" alt="lock" width={24} height={24} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
              style={{ color: "#736B66", fontSize: "16px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Image
                src={showPassword ? "/auth/lock_eye_show.svg" : "/auth/lock_eye_hide.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="cursor-pointer"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        
        <div className="flex flex-row justify-center items-center gap-3 rounded-full mt-4 w-full bg-[#F4A258] py-3 px-6">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#FFFFFF", fontSize: "18px" }}
          >
            Sign Up
          </div>
          <Image
          src= "/right_arrow.svg"
          alt="arrow"
          width={20}
          height={27}
          className="w-6"
          />
        </div>

        <div className="flex flex-row items-center justify-center font-unsaid font-semibold w-full gap-2 mt-6">
          <div
          style={{ color: "#A1CDD9", fontSize: "16px" }}
          >
            Already have an account?
          </div>

          <div
          className="cursor-pointer"
          style={{ color: "#F4A258", fontSize: "16px" }}
          >
            Sign In

          </div>
        </div>
      </div>
    </div>
  );
}