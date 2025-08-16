"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { motion, useAnimationControls } from 'framer-motion';
import Navbar from "@/components/navBar_v1";
import Footer from "@/components/footer_v1";

export default function Home() {
  // Animation controls for each element
  const mockupControls = useAnimationControls();
  const patientReplyControls = useAnimationControls();
  const doctorReplyControls = useAnimationControls();

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
  const [wordCount, setWordCount] = useState(0);
  const MAX_WORDS = 250;

  // Trigger animations on component mount
  useEffect(() => {
    mockupControls.start({
      opacity: 1,
      transition: { duration: 0.75, ease: "easeOut" },
    });
    patientReplyControls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.75, ease: "easeOut", delay: 0.2 },
    });
    doctorReplyControls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.75, ease: "easeOut", delay: 0.4 },
    });
  }, [mockupControls, patientReplyControls, doctorReplyControls]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // For phone, allow only digits
    if (name === 'phone' && value !== '' && !/^\d*$/.test(value)) {
      return;
    }

    // For message field, calculate word count
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
  };

  // Handle form submission
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: '', occupation: '', email: '', phone: '', message: '' };

    // Validate required fields
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

    if (!hasError) {
      // Handle successful form submission (e.g., API call)
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({ name: '', occupation: '', email: '', phone: '', message: '' });
      setWordCount(0);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col m-0">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      <div className='relative min-h-screen flex flex-row items-center m-4 p-28 bg-transparent gap-36'>
        <div className="flex-1 flex flex-col h-full items-start justify-center">
          <h1 
            className='font-unsaid font-extrabold'
            style={{ color: "#A1CDD9", fontSize: "60px" }}
          >
            Let&apos;s Get in Touch with Us.
          </h1>

          <p
            className='font-unsaid font-medium mt-8'
            style={{ color: "#736B66", fontSize: "20px" }}
          >
            Have questions or need assistance? We&apos;re here to help you out every step of the way!
          </p>

          <div className='flex flex-row w-full gap-4 mt-12'>
            <div className='flex-1 flex flex-col items-start p-0 m-0'>
              <div className='flex items-center justify-center rounded-full mb-4 w-10 h-10 bg-[#F0F2E8]'>
                <Image 
                  src="/getInTouch/location_logo.svg" 
                  alt="Location" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 bg-transparent"
                />
              </div>
              <div
                className='font-unsaid font-extrabold mb-2'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Our Address
              </div>
              <div
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "18px" }}
              >
                abcd
              </div>
            </div>
            <div className='flex-1 flex flex-col items-start p-0 m-0'>
              <div className='flex items-center justify-center rounded-full mb-4 w-10 h-10 bg-[#F0F2E8]'>
                <Image 
                  src="/getInTouch/contact_logo.svg" 
                  alt="Contact" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 bg-transparent"
                />
              </div>
              <div
                className='font-unsaid font-extrabold mb-2'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Our Contact Info
              </div>
              <div
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "18px" }}
              >
                123456789
              </div>
            </div>
          </div>
          <button className='flex flex-row rounded-full font-unsaid font-extrabold bg-[#A1CDD9] mt-12 px-8 py-4 gap-3 cursor-pointer'>
            <div 
              className="font-unsaid font-extrabold text-left" 
              style={{ color: "#fff", fontSize: "18px" }}
            >
              Or Fill the Form Below
            </div>
            <Image 
              src="/right_arrow.svg" 
              alt="Arrow" 
              width={20} 
              height={27} 
              className="w-5 rotate-90" 
            />
          </button>
        </div>

        <div className="flex-1 flex h-full items-center justify-center">
          <div className='flex items-center justify-center rounded-full bg-[#A1CDD9] w-[500px] h-[500px]'>
            <motion.div
              className="absolute rounded-4xl translate-y-40 w-115 z-2"
              initial={{ opacity: 0 }}
              animate={mockupControls}
            >
              <Image 
                src="/getInTouch/unsaid_mockup.svg" 
                alt="Unsaid Mockup" 
                width={460} 
                height={460} 
              />
            </motion.div>

            <div className='flex flex-col'>
              <motion.div
                className="absolute -translate-x-32 -translate-y-36 w-96 z-3"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={patientReplyControls}
              >
                <Image 
                  src="/getInTouch/patient_reply.svg" 
                  alt="Patient Reply" 
                  width={384} 
                  height={384} 
                />
              </motion.div>

              <motion.div
                className="absolute -translate-x-60 translate-y-0 w-96 z-3"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={doctorReplyControls}
              >
                <Image 
                  src="/getInTouch/doctor_reply.png" 
                  alt="Doctor Reply" 
                  width={384} 
                  height={384} 
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center gap-32 py-24 px-36'>
        <div className='flex flex-col items-start flex-1/3 gap-6'>
          <div
            className='font-unsaid font-extrabold text-left'
            style={{ color: "#A1CDD9", fontSize: "48px" }}
          >
            Or Submit <span className='text-[#926247]'>The Form</span> Directly.
          </div>
          <div
            className='font-unsaid font-medium text-left'
            style={{ color: "#736B66", fontSize: "18px" }}
          >
            We always aim to reply within 24-48 business hours. Thanks!
          </div>
        </div>
        <div className='flex flex-col flex-2/3 gap-6'>
          <div className='flex flex-row w-full items-center justify-center gap-6'>
            {/* Name */}
            <div className='flex w-full flex-col items-start gap-2'>
              <div
                className="font-unsaid font-extrabold"
                style={{ color: "#A1CDD9", fontSize: "14px" }}
              >
                Full Name*
              </div>
              <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2">
                <Image src="/auth/email_icon.svg" alt="name" width={24} height={24} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name..."
                  className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
                  style={{ color: "#736B66", fontSize: "16px" }}
                  required
                />
              </div>
              {errors.name && (
                <div className="font-unsaid text-red-500 text-sm">{errors.name}</div>
              )}
            </div>

            {/* Occupation */}
            <div className='flex w-full flex-col items-start gap-2'>
              <div
                className="font-unsaid font-extrabold"
                style={{ color: "#A1CDD9", fontSize: "14px" }}
              >
                Occupation*
              </div>
              <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2">
                <Image src="/auth/email_icon.svg" alt="occupation" width={24} height={24} />
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="Enter your occupation..."
                  className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
                  style={{ color: "#736B66", fontSize: "16px" }}
                  required
                />
              </div>
              {errors.occupation && (
                <div className="font-unsaid text-red-500 text-sm">{errors.occupation}</div>
              )}
            </div>
          </div>

          <div className='flex flex-row w-full items-center justify-center gap-6'>
            {/* Email */}
            <div className='flex w-full flex-col items-start gap-2'>
              <div
                className="font-unsaid font-extrabold"
                style={{ color: "#A1CDD9", fontSize: "14px" }}
              >
                Email Address*
              </div>
              <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2">
                <Image src="/auth/email_icon.svg" alt="email" width={24} height={24} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email..."
                  className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
                  style={{ color: "#736B66", fontSize: "16px" }}
                  required
                />
              </div>
              {errors.email && (
                <div className="font-unsaid text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div className='flex w-full flex-col items-start gap-2'>
              <div
                className="font-unsaid font-extrabold"
                style={{ color: "#A1CDD9", fontSize: "14px" }}
              >
                Phone Number*
              </div>
              <div className="flex flex-row rounded-full w-full border-2 border-[#F4A258] px-4 py-3 gap-2">
                <Image src="/auth/email_icon.svg" alt="email" width={24} height={24} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number..."
                  pattern="[0-9]*"
                  className="bg-transparent outline-none font-unsaid font-bold rounded-r-full w-full"
                  style={{ color: "#736B66", fontSize: "16px" }}
                  required
                />
              </div>
              {errors.phone && (
                <div className="font-unsaid text-red-500 text-sm">{errors.phone}</div>
              )}
            </div>
          </div>

          {/* Primary Message */}
          <div className='flex w-full flex-col items-start gap-2'>
            <div
              className="font-unsaid font-extrabold"
              style={{ color: "#A1CDD9", fontSize: "14px" }}
            >
              Primary Message*
            </div>
            <div className="flex flex-row rounded-2xl w-full border-2 border-[#F4A258] px-4 py-3 gap-2">
              <Image src="/auth/email_icon.svg" alt="email" width={24} height={24} className="self-start mt-1" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please enter your message here as clear as possible..."
                className="bg-transparent outline-none font-unsaid font-bold w-full resize-none scrollbar-hidden"
                style={{ color: "#736B66", fontSize: "16px", minHeight: "20vh"}}
                required
              />
            </div>
            <div className="flex justify-between w-full">
              <div className="font-unsaid text-sm" style={{ color: wordCount > MAX_WORDS ? "#ef4444" : "#736B66" }}>
                Word count: {wordCount}/{MAX_WORDS}
              </div>
              {errors.message && (
                <div className="font-unsaid text-red-500 text-sm">{errors.message}</div>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className='flex flex-row rounded-full font-unsaid font-extrabold bg-[#A1CDD9] px-8 py-4 gap-3 cursor-pointer self-end'
          >
            <div 
              className="font-unsaid font-extrabold text-left" 
              style={{ color: "#fff", fontSize: "18px" }}
            >
              Submit Form
            </div>
            <Image 
              src="/right_arrow.svg" 
              alt="Arrow" 
              width={20} 
              height={27} 
              className="w-5 rotate-90" 
            />
          </button>
        </div>
      </div>

      <div className="w-full">
        <Footer />
      </div>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}