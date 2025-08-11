"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="relative flex flex-col items-center overflow-hidden p-0">
      <Image src="/Fprint.svg" alt="fingerprint_logo" width={64} height={64} />
      <div
        className="font-unsaid font-extrabold mt-8 mb-3"
        style={{ color: "#A1CDD9", fontSize: "36px" }}
      >
        Sign In to Unsaid
      </div>
      <div
        className="font-unsaid font-medium"
        style={{ color: "#736B66", fontSize: "18px" }}
      >
        Let's get your mental health personalized with us.
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
              placeholder="Enter your password"
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

        <div className="flex flex-row mt-4 w-full justify-between">
          <div className="flex flex-row gap-2 items-center relative">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-6 h-6 rounded-full border-2 border-[#F4A258] appearance-none checked:bg-[#F7F4F2] focus:cursor-pointer relative"
              style={{
                borderRadius: "50%",
                // accentColor: "#F4A258",
              }}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            {/* Custom checkmark */}
            <span
              className={`pointer-events-none absolute ml-0.5 w-5 h-5 flex items-center justify-center ${
                !rememberMe ? "hidden" : ""
              }`}
            >
              <Image
                src="/auth/checkmark.svg"
                alt="checkbox_tick"
                width={20}
                height={20}
              />
            </span>
            <label
              htmlFor="rememberMe"
              className="font-unsaid font-semibold"
              style={{ color: "#A1CDD9", fontSize: "14px" }}
            >
              Remember for 30 days
            </label>
          </div>
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#F4A258", fontSize: "16px" }}
          >
            Forgot Password
          </div>
        </div>
        
        <div className="flex flex-row justify-center items-center gap-2 rounded-full mt-4 w-full bg-[#F4A258] py-4 px-6">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#FFFFFF", fontSize: "18px" }}
          >
            Sign In
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
            Don't have an account?
          </div>

          <div
          className="cursor-pointer"
          style={{ color: "#F4A258", fontSize: "16px" }}
          >
            Sign Up

          </div>
        </div>
      </div>
    </div>
  );
}