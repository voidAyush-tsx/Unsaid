"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { motion, useAnimationControls } from 'framer-motion';

const msgForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    occupation: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formError, setFormError] = useState(""); // ✅ common error
  const [termsAccepted, setTermsAccepted] = useState(false); // ✅ radio/checkbox

  const [wordCount, setWordCount] = useState(0);
  const MAX_WORDS = 250;

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone' && value !== '' && !/^\d*$/.test(value)) return;

    if (name === 'message') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
      if (words.length > MAX_WORDS) {
        setErrors(prev => ({ ...prev, message: `Message exceeds ${MAX_WORDS} words` }));
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormError(""); // clear common error while typing
  };

  // Handle submit
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: '', occupation: '', email: '', phone: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      hasError = true;
    }
    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      hasError = true;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      hasError = true;
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10-15 digits';
      hasError = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      setFormError("⚠️ ERROR: Please fill all of the input fields before moving forward!");
      return;
    }

    setFormError(""); // clear global error
    console.log("Form submitted:", formData);

    // Reset
    setFormData({ name: '', occupation: '', email: '', phone: '', message: '' });
    setWordCount(0);
    setTermsAccepted(false);
  };
  
  return (
    <div className='flex flex-row items-center justify-center gap-32 py-24 px-36'>
    <div className='flex flex-col items-start flex-1/3 gap-6'>
        <div className='font-unsaid font-extrabold text-left' style={{ color: "#A1CDD9", fontSize: "48px" }}>
        Or Submit <span className='text-[#926247]'>The Form</span> Directly.
        </div>
        <div className='font-unsaid font-medium text-left' style={{ color: "#736B66", fontSize: "18px" }}>
        We always aim to reply within 24-48 business hours. Thanks!
        </div>
    </div>

    <div className='flex flex-col flex-2/3 gap-6'>

        <div className='flex flex-row w-full items-center justify-center gap-6'>
        {/* Name */}
        <div className='flex w-full flex-col items-start gap-2'>
            <label className="font-unsaid font-extrabold text-[#A1CDD9] text-sm">Full Name*</label>
            <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] bg-[#F7F4F2] px-4 py-3 gap-2">
            <Image src="/auth/email_icon.svg" alt="name" width={24} height={24} />
            <input
                type="text" name="name" value={formData.name} onChange={handleInputChange}
                placeholder="Enter your name..."
                className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full text-[#736B66]"
                required
            />
            </div>
            {errors.name && <div className="font-unsaid text-red-500 text-sm">{errors.name}</div>}
        </div>

        {/* Occupation */}
        <div className='flex w-full flex-col items-start gap-2'>
            <label className="font-unsaid font-extrabold text-[#A1CDD9] text-sm">Occupation*</label>
            <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] bg-[#F7F4F2] px-4 py-3 gap-2">
            <Image src="/auth/email_icon.svg" alt="occupation" width={24} height={24} />
            <input
                type="text" name="occupation" value={formData.occupation} onChange={handleInputChange}
                placeholder="Enter your occupation..."
                className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full text-[#736B66]"
                required
            />
            </div>
            {errors.occupation && <div className="font-unsaid text-red-500 text-sm">{errors.occupation}</div>}
        </div>
        </div>

        <div className='flex flex-row w-full items-center justify-center gap-6'>
        {/* Email */}
        <div className='flex w-full flex-col items-start gap-2'>
            <label className="font-unsaid font-extrabold text-[#A1CDD9] text-sm">Email Address*</label>
            <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] bg-[#F7F4F2] px-4 py-3 gap-2">
            <Image src="/auth/email_icon.svg" alt="email" width={24} height={24} />
            <input
                type="email" name="email" value={formData.email} onChange={handleInputChange}
                placeholder="Enter your email..."
                className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full text-[#736B66]"
                required
            />
            </div>
            {errors.email && <div className="font-unsaid text-red-500 text-sm">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className='flex w-full flex-col items-start gap-2'>
            <label className="font-unsaid font-extrabold text-[#A1CDD9] text-sm">Phone Number*</label>
            <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] bg-[#F7F4F2] px-4 py-3 gap-2">
            <Image src="/auth/email_icon.svg" alt="phone" width={24} height={24} />
            <input
                type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                placeholder="Enter your phone number..."
                className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full text-[#736B66]"
                required
            />
            </div>
            {errors.phone && <div className="font-unsaid text-red-500 text-sm">{errors.phone}</div>}
        </div>
        </div>

        <div className='flex w-full flex-col items-start gap-2'>
        <label className="font-unsaid font-extrabold text-[#A1CDD9] text-sm">Primary Message*</label>
        <div className="flex flex-row rounded-2xl w-full border-2 border-[#F4A258] bg-[#F7F4F2] px-4 py-3 gap-2">
            <Image src="/auth/email_icon.svg" alt="message" width={24} height={24} className="self-start mt-1" />
            <textarea
            name="message" value={formData.message} onChange={handleInputChange}
            placeholder="Please enter your message here as clear as possible..."
            className="bg-transparent outline-none font-unsaid font-bold w-full resize-none scrollbar-hidden text-[#736B66]"
            style={{ minHeight: "20vh" }}
            required
            />
        </div>
        <div className="flex flex-row-reverse justify-between w-full">
            <div className={`font-unsaid text-sm ${wordCount > MAX_WORDS ? "text-red-500" : "text-[#736B66]"}`}>
            Word count: {wordCount}/{MAX_WORDS}
            </div>
            {errors.message && <div className="font-unsaid text-red-500 text-sm">{errors.message}</div>}
        </div>
        </div>

        {formError && (
        <div className="flex items-center justify-center rounded-full border-2 border-red-400 bg-red-100 px-4 py-2 text-red-600 font-unsaid font-bold text-sm">
            {formError}
        </div>
        )}

        <div className='flex flex-row items-center justify-between w-full mt-6'>
        <div className="flex flex-row items-center gap-3 mt-2">
            <input
            type="radio"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="w-4 h-4 cursor-pointer"
            />
            <label 
            htmlFor="terms" 
            className="font-unsaid font-semibold text-[#736B66]">
            I have agreed to the <span className="text-[#A1CDD9] cursor-pointer" onClick={() => window.location.href = "/privacy"}>Terms & Conditions</span>
            </label>
        </div>

        <button
            onClick={handleSubmit}
            disabled={!termsAccepted}
            className={`flex flex-row rounded-full font-unsaid font-extrabold px-8 py-4 gap-3 self-end
            ${termsAccepted ? "bg-[#A1CDD9] cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
        >
            <div className="font-unsaid font-extrabold text-left text-white text-lg">Submit Form</div>
            <Image src="/right_arrow.svg" alt="Arrow" width={20} height={27} className="w-5" />
        </button>
        </div>
    </div>
    <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
    </div>
  );
};

export default msgForm;