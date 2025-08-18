"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Navbar_v2 from "@/components/navBar_v2";
import Footer_v2 from "@/components/footer_v2";

export default function Connect() {
  // Two days ago date
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(twoDaysAgo);

  // Refs for each section
  const sectionRefs: Record<string, React.MutableRefObject<HTMLDivElement | null>> = {};
  const sections = [
    {
      key: "information",
      title: "Information we Collect",
      heading: "What personal information do we collect?",
      content: [
        "<b>Personal Details:</b> We collect basic information like your name, email, and age to personalize your counseling experience.",
        "<b>Chat Data:</b> Your conversations with counselors are analyzed to enhance service quality while maintaining confidentiality.",
        "<b>Usage Patterns:</b> We track session frequency and duration to improve platform performance and user experience.",
        "<b>Assessment Data:</b> If you take the GAD-7 anxiety screening test, your responses may be used to tailor support. Stored securely.",
      ],
    },
    {
      key: "usage",
      title: "How We Use Information",
      heading: "How we use your information",
      content: [
        "<b>Personalized Support:</b> Your info helps us provide tailored mental health guidance.",
        "<b>Service Enhancement:</b> We analyze chat data and usage patterns to improve effectiveness.",
        "<b>Communication:</b> We may send updates or service info (you can opt out).",
      ],
    },
    {
      key: "security",
      title: "Data Security",
      heading: "Data Security",
      content: [
        "We employ industry-standard security measures to protect your data. No system is 100% secure, but we strive to safeguard your information.",
      ],
    },
    {
      key: "sharing",
      title: "Data Sharing",
      heading: "Data Sharing",
      content: [
        "We do not sell or rent your information. We may share anonymized data for research/statistics, without identifying you personally.",
      ],
    },
    {
      key: "compliance",
      title: "Legal Compliance",
      heading: "Legal Compliance",
      content: [
        "We may share information if legally required, or to protect rights, safety, and compliance obligations.",
      ],
    },
    {
      key: "choices",
      title: "Your Choices",
      heading: "Your Choices",
      content: [
        "You may access, correct, or delete your data anytime. You can also opt out of promotional emails.",
      ],
    },
    {
      key: "contact",
      title: "Contact Us",
      heading: "Contact Us",
      content: [
        `If you have concerns, email us at <a href="mailto:contact@unsaid.com" 
          class="font-bold hover:underline">contact@unsaid.com</a>.`,
      ],
    },
  ];

  // Initialize refs for each section
  sections.forEach((s) => {
  sectionRefs[s.key] = useRef<HTMLDivElement | null>(null);
});

  // For scroll syncing and active section tracking
  const indexRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [indexHeight, setIndexHeight] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll to section with smooth behavior
  const scrollToSection = (key: string) => {
    const element = sectionRefs[key]?.current;
    if (element && contentRef.current) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = contentRef.current.getBoundingClientRect();
      const offsetTop =
        elementRect.top - containerRect.top + contentRef.current.scrollTop;
      contentRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveSection(key); // Set active section on click
    }
  };

  // Debounced height update for performance
  useEffect(() => {
    const debounce = (fn: Function, ms: number) => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(), ms);
      };
    };

    const updateHeight = debounce(() => {
      if (indexRef.current) {
        setIndexHeight(indexRef.current.getBoundingClientRect().height);
      }
    }, 100);

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollPosition = contentRef.current.scrollTop;
        let closestSection: string | null = null;
        let minDistance = Infinity;

        Object.entries(sectionRefs).forEach(([key, ref]) => {
          const element = ref.current;
          if (element) {
            const elementRect = element.getBoundingClientRect();
            const containerRect = contentRef.current!.getBoundingClientRect();
            const elementTop =
              elementRect.top - containerRect.top + contentRef.current!.scrollTop;
            const distance = Math.abs(scrollPosition - elementTop);
            if (distance < minDistance && elementRect.top <= 100) {
              minDistance = distance;
              closestSection = key;
            }
          }
        });

        if (closestSection) {
          setActiveSection(closestSection);
        }
      }
    };

    contentRef.current?.addEventListener("scroll", handleScroll);
    return () => contentRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden m-0">
      <div className="w-full z-50">
        <Navbar_v2 />
      </div>

      {/* Header */}
      <div className="flex flex-row items-center px-32 py-28">
        <div className="flex flex-1 flex-col items-start gap-7">
          <h1 className="font-unsaid font-extrabold text-left text-[60px] text-[#A1CDD9]">
            Privacy Policy
          </h1>
          <div className="flex flex-row font-unsaid font-medium gap-12 items-center">
            {[
              { icon: "/clock_logo.svg", text: "Updated 2d ago" },
              { icon: "/calendar_logo.svg", text: formattedDate },
            ].map((item, i) => (
              <div key={i} className="flex flex-row items-center gap-2">
                <Image src={item.icon} alt="icon" width={24} height={24} />
                <span className="font-unsaid font-semibold text-[18px] text-[#A1CDD9]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start gap-8">
          <p className="font-unsaid font-medium text-left text-[24px] text-[#736B66]">
            We take your privacy seriously and are committed to protecting your
            personal information.
          </p>
          <button
            onClick={() => scrollToSection("information")}
            className="flex flex-row items-center rounded-4xl px-8 py-4 gap-4 bg-[#F4A258] cursor-pointer"
            aria-label="View our Privacy Policy details"
          >
            <span className="font-unsaid font-extrabold text-[18px] text-white">
              See Our Privacy
            </span>
            <Image
              src="/right_arrow.svg"
              alt="Down Arrow Icon"
              width={24}
              height={24}
              className="rotate-90 w-6"
            />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row m-5 py-24 px-30 gap-32 rounded-4xl bg-[#F7F4F2]">
        {/* Sidebar Index */}
        <div
          ref={indexRef}
          className="flex flex-1/3 flex-col px-10 py-6 gap-10 rounded-4xl bg-white sticky top-0 self-start h-fit"
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <Image src="/doc_logo.svg" alt="doc" width={32} height={32} />
            <h2 className="font-unsaid font-extrabold text-[24px] text-[#A1CDD9]">
              Unsaid Privacy
            </h2>
          </div>

          {/* Map Index */}
          <div className="flex flex-col gap-2">
            {sections.map((s, i) => (
              <div
                key={s.key}
                onClick={() => scrollToSection(s.key)}
                className={`group flex flex-row gap-3 items-center w-full p-3 cursor-pointer rounded-4xl hover:bg-[#FFEDD5] transition ${
                  activeSection === s.key ? "bg-[#FFEDD5]" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center rounded-full font-unsaid font-extrabold py-3 px-5 bg-[#F7F4F2] ${
                    activeSection === s.key
                      ? "bg-[#FB8728]"
                      : "group-hover:bg-[#FB8728]"
                  } transition`}
                  style={{ fontSize: "12px", color: "#A1CDD9" }}
                >
                  {i + 1}
                </div>
                <span className="font-unsaid font-bold text-[18px] text-[#A1CDD9]">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Content */}
        <div
          ref={contentRef}
          className="flex flex-2/3 flex-col px-4 gap-16 overflow-y-auto custom-scrollbar"
          style={{ height: indexHeight ? `${indexHeight}px` : "auto" }}
        >
          {/* Custom Scrollbar */}
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f7f4f2;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #a1cdd9;
              border-radius: 10px;
              border: 2px solid #f7f4f2;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #7db7c7;
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #a1cdd9 #f7f4f2;
            }
          `}</style>

          {sections.map((s) => (
            <div key={s.key} ref={sectionRefs[s.key]} className="flex flex-col gap-4">
              <h3 className="font-unsaid font-extrabold text-[24px] text-[#A1CDD9]">
                {s.heading}
              </h3>
              <div
                className="font-unsaid font-medium text-[20px] text-[#736B66] flex flex-col gap-2"
                dangerouslySetInnerHTML={{
                  __html: s.content.map((c) => `<div>${c}</div>`).join(""),
                }}
              />
              <hr className="border-[#C9C7C5]" />
            </div>
          ))}
        </div>
      </div>

      <Footer_v2 />
    </div>
  );
}