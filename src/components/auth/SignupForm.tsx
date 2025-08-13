"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuthContext();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password, confirmPassword } = formData;

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { user, error } = await signUp(email, password);

      if (error) {
        setError(error);
      } else if (user) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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

      {error && (
        <div className="mt-4 p-3 text-red-500 bg-red-50 border border-red-200 rounded-md text-sm w-full text-center">
          {error}
        </div>
      )}

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
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              disabled={loading}
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create your password"
              disabled={loading}
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
                src={
                  showPassword
                    ? "/auth/lock_eye_show.svg"
                    : "/auth/lock_eye_hide.svg"
                }
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              disabled={loading}
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
                src={
                  showPassword
                    ? "/auth/lock_eye_show.svg"
                    : "/auth/lock_eye_hide.svg"
                }
                alt={showPassword ? "Hide password" : "Show password"}
                className="cursor-pointer"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`flex flex-row justify-center items-center gap-2 rounded-full mt-4 w-full py-3 px-6 transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F4A258] hover:bg-[#e6954f]"
          }`}
        >
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#FFFFFF", fontSize: "18px" }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </div>
          <Image
            src="/right_arrow.svg"
            alt="arrow"
            width={20}
            height={27}
            className="w-6"
          />
        </button>

        <div className="flex flex-row items-center justify-center font-unsaid font-semibold w-full gap-2 mt-6">
          <div style={{ color: "#A1CDD9", fontSize: "16px" }}>
            Already have an account?
          </div>
          <div
            className="cursor-pointer hover:underline"
            style={{ color: "#F4A258", fontSize: "16px" }}
            onClick={() => window.location.href = "/signin"}
          >
            Sign In
          </div>
        </div>
      </div>
    </div>
  );
}
