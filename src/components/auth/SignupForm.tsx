"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    form: "",
  });
  const [passwordStrength, setPasswordStrength] = useState<
    "Weak" | "Medium" | "Strong" | ""
  >("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Password strength regex components
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*]/;
  const hasUpperCase = /[A-Z]/;

  const evaluatePasswordStrength = (password: string): "Weak" | "Medium" | "Strong" | "" => {
    if (!password) return "";
    const length = password.length;
    const hasNum = hasNumber.test(password);
    const hasSpecial = hasSpecialChar.test(password);
    const hasUpper = hasUpperCase.test(password);
    const strengthScore = [hasNum, hasSpecial, hasUpper].filter(Boolean).length;

    if (length < 8) return "Weak";
    if (length >= 12 && strengthScore >= 3) return "Strong";
    if (length >= 8 && strengthScore >= 2) return "Medium";
    return "Weak";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time email validation
    if (name === "email") {
      if (value && !emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }
    }

    // Real-time password validation and strength evaluation
    if (name === "password") {
      const strength = evaluatePasswordStrength(value);
      setPasswordStrength(strength);
      if (value && value.length < 6) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be atleast 6 characters long",
        }));
      } else if (value && !hasNumber.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must include number",
        }));
      } else if (value && !hasSpecialChar.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must include special character",
        }));
      } else if (value && !hasUpperCase.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must include uppercase letter",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ name: "", email: "", password: "", form: "" });
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    // Sanitize inputs
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    // Validation
    if (!sanitizedName || !sanitizedEmail || !sanitizedPassword || !confirmPassword) {
      setErrors((prev) => ({ ...prev, form: "Please fill in all fields" }));
      setLoading(false);
      return;
    }

    if (!emailRegex.test(sanitizedEmail)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address (e.g., example@domain.com)",
      }));
      setLoading(false);
      return;
    }

    if (sanitizedName.length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 2 characters long",
      }));
      setLoading(false);
      return;
    }

    if (sanitizedPassword.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long",
      }));
      setLoading(false);
      return;
    }

    if (!hasNumber.test(sanitizedPassword)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must include at least 1 number",
      }));
      setLoading(false);
      return;
    }

    if (!hasSpecialChar.test(sanitizedPassword)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must include at least 1 special character (!@#$%^&*)",
      }));
      setLoading(false);
      return;
    }

    if (!hasUpperCase.test(sanitizedPassword)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must include at least 1 uppercase letter",
      }));
      setLoading(false);
      return;
    }

    if (sanitizedPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, form: "Passwords do not match" }));
      setLoading(false);
      return;
    }

    try {
      const r = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: sanitizedName,
          email: sanitizedEmail, 
          password: sanitizedPassword 
        }),
      });
      const json = await r.json();
      if (!r.ok) {
        setErrors((prev) => ({ ...prev, form: json.error || 'Signup failed' }));
      } else {
        window.location.href = '/connect';
      }
    } catch {
      setErrors((prev) => ({ ...prev, form: "An unexpected error occurred" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="relative flex flex-col items-center overflow-hidden p-0 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <Image 
      src="/Fprint.svg" 
      alt="fingerprint_logo" 
      width={64} 
      height={64} 
      className="cursor-pointer"
      onClick={() => window.location.href = "/"} 
      />
      <div
        className="font-unsaid font-extrabold mt-2 mb-1"
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

      {errors.form && (
        <div className="mt-4 p-3 text-red-500 bg-red-50 border border-red-200 rounded-md text-sm w-full text-center">
          {errors.form}
        </div>
      )}

      <div className="flex flex-col items-start w-full mt-10 gap-4">
        <div className="flex flex-col gap-1 w-full">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "14px" }}
          >
            Name
          </div>
          <div
            className={`flex flex-row rounded-full w-full border-2 ${
              errors.name ? "border-red-500" : "border-[#F4A258]"
            } px-4 py-3 gap-2`}
          >
            <Image src="/auth/email_icon.svg" alt="email" width={24} height={24} />
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
              style={{ color: "#736B66", fontSize: "16px" }}
              disabled={loading}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </div>
          {errors.name && (
            <div
              id="name-error"
              className="text-red-500 text-sm font-unsaid font-medium"
            >
              {errors.name}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "14px" }}
          >
            Email
          </div>
          <div
            className={`flex flex-row rounded-full w-full border-2 ${
              errors.email ? "border-red-500" : "border-[#F4A258]"
            } px-4 py-3 gap-2`}
          >
            <Image src="/auth/email_icon.svg" alt="email" width={24} height={24} />
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
              style={{ color: "#736B66", fontSize: "16px" }}
              disabled={loading}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <div
              id="email-error"
              className="text-red-500 text-sm font-unsaid font-medium"
            >
              {errors.email}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "14px" }}
          >
            Password
          </div>
          <div
            className={`flex flex-row rounded-full w-full border-2 ${
              errors.password ? "border-red-500" : "border-[#F4A258]"
            } px-4 py-3 gap-2 items-center`}
          >
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
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={
                errors.password
                  ? "password-error"
                  : passwordStrength
                  ? "password-strength"
                  : undefined
              }
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
          {errors.password && (
            <div
              id="password-error"
              className="text-red-500 text-sm font-unsaid font-medium"
            >
              {errors.password}
            </div>
          )}
          {passwordStrength && !errors.password && (
            <div
              id="password-strength"
              className={`text-sm font-unsaid font-medium ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Password Strength: {passwordStrength}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div
            className="font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "14px" }}
          >
            Password Confirmation
          </div>
          <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2 items-center">
            <Image src="/auth/lock_icon.svg" alt="lock" width={24} height={24} />
            <input
              type={showConfirmPassword ? "text" : "password"}
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
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="focus:outline-none"
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              <Image
                src={
                  showConfirmPassword
                    ? "/auth/lock_eye_show.svg"
                    : "/auth/lock_eye_hide.svg"
                }
                alt={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="cursor-pointer"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex flex-row justify-center items-center gap-2 rounded-full mt-4 w-full py-3 px-6 transition-colors cursor-pointer ${
            loading
              ? "bg-[#F4A258] cursor-not-allowed"
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
            onClick={() => router.push("/signin")}
          >
            Sign In
          </div>
        </div>
      </div>
    </form>
  );
}