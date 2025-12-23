"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    form: "",
  });
  const [passwordStrength, setPasswordStrength] = useState<
    "Weak" | "Medium" | "Strong" | ""
  >("");
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }));

    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ password: "", form: "" });

    // Validation
    if (formData.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long",
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        form: "Passwords do not match",
      }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      // Force reload to update session
      window.location.href = "/dashboard";
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setErrors((prev) => ({
        ...prev,
        form: errorMessage,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
        <p className="text-gray-600 mt-2">
          Please set a new password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="flex gap-1 mt-1">
              <div
                className={`h-1 flex-1 rounded-full ${
                  passwordStrength === "Weak"
                    ? "bg-red-500"
                    : passwordStrength === "Medium"
                    ? "bg-yellow-500"
                    : passwordStrength === "Strong"
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
              <div
                className={`h-1 flex-1 rounded-full ${
                  passwordStrength === "Strong"
                    ? "bg-green-500"
                    : passwordStrength === "Medium"
                    ? "bg-yellow-500"
                    : "bg-gray-200"
                }`}
              />
              <div
                className={`h-1 flex-1 rounded-full ${
                  passwordStrength === "Strong" ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            </div>
          )}
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {errors.form && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg">
            {errors.form}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-[#F4A258] hover:bg-[#e08b42] text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Updating Password..." : "Update Password"}
        </button>
        
        <div className="text-center mt-4">
            <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/signin' })}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
                Sign out
            </button>
        </div>
      </form>
    </div>
  );
}
