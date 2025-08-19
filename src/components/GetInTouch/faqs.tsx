"use client";

import React, { useState } from "react";
import Image from "next/image";

const Faq: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  const faqs = [
    { question: "How do I find the right counsellor for me?", answer: "You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication." },
    { question: "What types of sessions are available?", answer: "You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication." },
    { question: "Is my information kept confidential?", answer: "You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication." },
    { question: "How long does a typical counselling session last?", answer: "You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication." },
    { question: "Can I switch my counsellor if it's not a good fit?", answer: "You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication." },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-[#F7F4F2] rounded-4xl gap-20 mx-3 my-5 py-24 px-80">
      <div
        className="font-unsaid font-extrabold w-full text-center"
        style={{ color: "#A1CDD9", fontSize: "60px" }}
      >
        Frequently Asked Questions
      </div>

      <div className="flex flex-col w-full items-center justify-center gap-4">
        {faqs.map((item, index) => {
          const isOpen = openItem === index.toString();
          return (
            <div
              key={index}
              className={`flex flex-col w-full shadow-lg rounded-4xl transition-colors duration-300 ${
                isOpen ? "bg-[#A1CDD9]" : "bg-white"
              }`}
            >
              <div
                className="flex flex-row items-center justify-between p-4 cursor-pointer transition-colors duration-300"
                onClick={() => toggleItem(index.toString())}
              >
                <div
                  className="font-unsaid font-extrabold w-full"
                  style={{ color: isOpen ? "#ffffff" : "#A1CDD9", fontSize: "20px" }}
                >
                  {item.question}
                </div>

                <div
                  className={`flex flex-row items-center justify-center rounded-full p-3 transition-colors duration-300 ${
                    isOpen ? "bg-[#74B7C9]" : "bg-[#DDDDDD]"
                  }`}
                >
                  <Image
                    src="/faq_arrow.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                    className={`w-5 transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>

              <div
                className={`font-unsaid font-medium text-lg overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 p-4" : "max-h-0 p-0"
                } text-white`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;