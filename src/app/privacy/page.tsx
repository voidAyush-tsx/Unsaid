"use client"

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar_v2 from '@/components/navBar_v2';
import Footer_v2 from "@/components/footer_v2";

export default function Connect() {
  // Get the date from two days ago
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  // Format the date as "14 August, 2025"
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(twoDaysAgo);

  // References for content sections
  const sectionRefs = {
    information: useRef<HTMLDivElement>(null),
    usage: useRef<HTMLDivElement>(null),
    security: useRef<HTMLDivElement>(null),
    sharing: useRef<HTMLDivElement>(null),
    compliance: useRef<HTMLDivElement>(null),
    choices: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // References for index and content containers
  const indexRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [indexHeight, setIndexHeight] = useState<number | null>(null);

  // Scroll handler for smooth scrolling with 100px offset
  const scrollToSection = (section: keyof typeof sectionRefs) => {
    const element = sectionRefs[section].current;
    if (element && contentRef.current) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = contentRef.current.getBoundingClientRect();
      const offsetTop = elementRect.top - containerRect.top + contentRef.current.scrollTop;
      contentRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Update content height to match index height
  useEffect(() => {
    const updateHeight = () => {
      if (indexRef.current) {
        const height = indexRef.current.getBoundingClientRect().height;
        setIndexHeight(height);
      }
    };

    updateHeight(); // Initial height calculation
    window.addEventListener('resize', updateHeight); // Update on window resize

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden m-0">
      <div className="w-full z-50">
        <Navbar_v2 />
      </div>
      <div className='flex flex-row items-center px-32 py-28'>
        <div className='flex flex-1 flex-col items-start gap-7'>
          <div
            className='font-unsaid font-extrabold text-left'
            style={{ color: "#A1CDD9", fontSize: "60px" }}
          >
            Privacy Policy
          </div>
          <div className='flex flex-row font-unsaid font-medium gap-12 items-center'>
            <div className='flex flex-row items-center gap-2'>
              <Image
                src="/clock_logo.svg"
                alt="Clock Icon"
                width={24}
                height={24}
                className='w-5'
              />
              <div
                className='font-unsaid font-semibold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Updated 2d ago
              </div>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <Image
                src="/calendar_logo.svg"
                alt="Calendar Icon"
                width={24}
                height={24}
                className='w-5'
              />
              <div
                className='font-unsaid font-semibold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col items-start gap-8'>
          <div
            className='font-unsaid font-medium text-left'
            style={{ color: "#736B66", fontSize: "24px" }}
          >
            We take your privacy seriously and are committed to protecting your personal information. This privacy policy explains how we collect.
          </div>
          <button className='flex flex-row items-center rounded-4xl px-8 py-4 gap-4 bg-[#F4A258] cursor-pointer'>
            <div
              className='font-unsaid font-extrabold text-left'
              style={{ color: "#fff", fontSize: "18px" }}
            >
              See Our Privacy
            </div>
            <Image
              src="/right_arrow.svg"
              alt="Down Arrow Icon"
              width={48}
              height={48}
              className="rotate-90 w-6"
              onClick={() => window.location.href = "/privacy"}
            />
          </button>
        </div>
      </div>

      <div className='flex flex-row m-5 py-24 px-30 gap-32 rounded-4xl bg-[#F7F4F2]'>
        {/* Privacy Index */}
        <div ref={indexRef} className='flex flex-1/3 flex-col px-10 py-6 gap-10 rounded-4xl bg-white sticky top-0 self-start h-fit'>
          <div className='flex flex-row items-center justify-center gap-2'>
            <Image
              src="/doc_logo.svg"
              alt="Document Logo"
              width={48}
              height={48}
              className='w-8'
            />
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Unsaid Privacy
            </div>
          </div>

          {/* Bullet Points */}
          <div className='flex flex-col items-start justify-center gap-2'>
            <div
              className="group flex flex-row gap-3 items-center justify-start w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition-colors duration-200"
              onClick={() => scrollToSection('information')}
            >
              <div
                className="flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] group-hover:bg-[#FB8728] transition-colors duration-200"
                style={{ color: '#A1CDD9', fontSize: '12px' }}
              >
                1
              </div>
              <div
                className="font-unsaid font-bold"
                style={{ color: '#A1CDD9', fontSize: '18px' }}
              >
                Information we Collect
              </div>
            </div>
            <div
              className='group flex flex-row gap-3 items-center justify-start w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition-colors duration-200'
              onClick={() => scrollToSection('usage')}
            >
              <div
                className='flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] group-hover:bg-[#FB8728] transition-colors duration-200'
                style={{ color: "#A1CDD9", fontSize: "12px" }}
              >
                2
              </div>
              <div
                className='font-unsaid font-bold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                How We Use Information
              </div>
            </div>
            <div
              className='group flex flex-row gap-3 items-center justify-start w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition-colors duration-200'
              onClick={() => scrollToSection('security')}
            >
              <div
                className='flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] group-hover:bg-[#FB8728] transition-colors duration-200'
                style={{ color: "#A1CDD9", fontSize: "12px" }}
              >
                3
              </div>
              <div
                className='font-unsaid font-bold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Data Security
              </div>
            </div>
            <div
              className='group flex flex-row gap-3 items-center justify-start w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition-colors duration-200'
              onClick={() => scrollToSection('sharing')}
            >
              <div
                className='flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] group-hover:bg-[#FB8728] transition-colors duration-200'
                style={{ color: "#A1CDD9", fontSize: "12px" }}
              >
                4
              </div>
              <div
                className='font-unsaid font-bold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Data Sharing
              </div>
            </div>
            <div
              className='group flex flex-row gap-3 items-center justify-start w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition-colors duration-200'
              onClick={() => scrollToSection('compliance')}
            >
              <div
                className='flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] group-hover:bg-[#FB8728] transition-colors duration-200'
                style={{ color: "#A1CDD9", fontSize: "12px" }}
              >
                5
              </div>
              <div
                className='font-unsaid font-bold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Legal Compliance
              </div>
            </div>
            <div
              className='group flex flex-row gap-3 items-center justify-start w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition-colors duration-200'
              onClick={() => scrollToSection('choices')}
            >
              <div
                className='flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] group-hover:bg-[#FB8728] transition-colors duration-200'
                style={{ color: "#A1CDD9", fontSize: "12px" }}
              >
                6
              </div>
              <div
                className='font-unsaid font-bold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Your Choices
              </div>
            </div>
            <div
              className='group flex flex-row gap-3 items-center justify-start w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition-colors duration-200'
              onClick={() => scrollToSection('contact')}
            >
              <div
                className='flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] group-hover:bg-[#FB8728] transition-colors duration-200'
                style={{ color: "#A1CDD9", fontSize: "12px" }}
              >
                7
              </div>
              <div
                className='font-unsaid font-bold'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
              >
                Contact Us
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div
          ref={contentRef}
          className='flex flex-2/3 flex-col p-0 gap-16 overflow-y-auto scrollbar-hide'
          style={{ height: indexHeight ? `${indexHeight}px` : 'auto' }}
        >
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none; /* Chrome, Safari, and other WebKit browsers */
            }
          `}</style>

          <div
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "24px" }}
          >
            This privacy policy explains how we collect, use, and share your personal information when you use our chatbot.
          </div>

          <hr className='border-[#C9C7C5]' />

          <div className='flex flex-col gap-4' ref={sectionRefs.information}>
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              What personal information do we collect?
            </div>

            <div
              className='flex flex-col font-unsaid font-medium gap-2'
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              <div><span className='font-bold'>Personal Details:</span> We collect basic information like your name, email, and age to personalize your counseling experience.</div>
              <div><span className='font-bold'>Chat Data:</span> Your conversations with counselors are analyzed to enhance service quality while maintaining confidentiality.</div>
              <div><span className='font-bold'>Usage Patterns:</span> We track session frequency and duration to improve platform performance and user experience.</div>
              <div><span className='font-bold'>Assessment Data:</span> If you choose to take the GAD-7 anxiety screening test (developed by Drs. Robert L. Spitzer, Kurt Kroenke, Janet B.W. Williams, and Bernd Löwe), your responses may be used to tailor your counseling support. This data is stored securely and treated with strict confidentiality.</div>
            </div>
          </div>

          <hr className='border-[#C9C7C5]' />

          <div className='flex flex-col gap-4' ref={sectionRefs.usage}>
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              How we use your information
            </div>

            <div
              className='flex flex-col font-unsaid font-medium gap-2'
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              <div><span className='font-bold'>Personalized Support:</span> Your information helps us provide tailored mental health guidance and counseling.</div>
              <div><span className='font-bold'>Service Enhancement:</span> We analyze chat data and usage patterns to improve platform performance and effectiveness.</div>
              <div><span className='font-bold'>Communication:</span> We may send updates or important service information, with the option to opt out anytime.</div>
            </div>
          </div>

          <hr className='border-[#C9C7C5]' />

          <div className='flex flex-col gap-4' ref={sectionRefs.security}>
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Data Security
            </div>

            <div
              className='font-unsaid font-medium'
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction. However, no data transmission or storage method can guarantee absolute security. We do our best to protect your information, but we cannot guarantee its security.
            </div>
          </div>

          <hr className='border-[#C9C7C5]' />

          <div className='flex flex-col gap-4' ref={sectionRefs.sharing}>
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Data Sharing
            </div>

            <div
              className='font-unsaid font-medium'
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              Unsaid does not sell, trade, or rent your personal information to third parties. We may share aggregated and anonymized data for research and statistical purposes, but this data will not identify you personally.
            </div>
          </div>

          <hr className='border-[#C9C7C5]' />

          <div className='flex flex-col gap-4' ref={sectionRefs.compliance}>
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Legal Compliance
            </div>

            <div
              className='font-unsaid font-medium'
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              Unsaid does not sell, trade, or rent your personal information to third parties. We may share aggregated and anonymized data for research and statistical purposes, but this data will not identify you personally.
            </div>
          </div>

          <hr className='border-[#C9C7C5]' />

          <div className='flex flex-col gap-4' ref={sectionRefs.choices}>
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Your Choices
            </div>

            <div
              className='font-unsaid font-medium'
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              You can access, correct, or delete your personal information at any time by contacting us. You can also opt-out of receiving promotional emails from us.
            </div>
          </div>

          <hr className='border-[#C9C7C5]' />

          <div className='flex flex-col gap-4' ref={sectionRefs.contact}>
            <div
              className='font-unsaid font-extrabold'
              style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Contact Us
            </div>

            <div
              className='font-unsaid font-medium'
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              If you have questions or concerns about our Privacy Policy, please contact us at contact@unsaid.com.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer_v2 />
      </div>
    </div>
  );
}