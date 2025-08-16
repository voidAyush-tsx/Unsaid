"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";

const faq: React.FC = () => {
  
  return (
    <div className='flex flex-col items-center justify-center bg-[#F7F4F2] rounded-4xl gap-20 mx-3 my-5 py-24 px-80'>
        <div
        className='font-unsaid font-extrabold w-full text-center'
        style={{ color: "#A1CDD9", fontSize: "60px" }}
        >
            Frequently Asked Questions
        </div>

        <div className='flex flex-col w-full items-center justify-center gap-4'>
            <div className='flex flex-row w-full items-center justify-between bg-white shadow-lg p-4 rounded-4xl'>
                <div 
                className='font-unsaid font-extrabold w-full' 
                style={{ color: "#A1CDD9", fontSize: "20px" }}
                >
                    How do I find the right counsellor for me?
                </div>
                <div className='flex flex-row items-center justify-center bg-[#DDDDDD] rounded-full p-3'>
                    <Image src="/faq_arrow.svg" alt="Arrow" width={24} height={24} className="w-5" />
                </div>
                {/* You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication. */}
            </div>
            <div className='flex flex-row w-full items-center justify-between bg-white shadow-lg p-4 rounded-4xl'>
                <div 
                className='font-unsaid font-extrabold w-full' 
                style={{ color: "#A1CDD9", fontSize: "20px" }}
                >
                    What types of sessions are available?
                </div>
                <div className='flex flex-row items-center justify-center bg-[#DDDDDD] rounded-full p-3'>
                    <Image src="/faq_arrow.svg" alt="Arrow" width={24} height={24} className="w-5" />
                </div>
                {/* You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication. */}
            </div>
            <div className='flex flex-row w-full items-center justify-between bg-white shadow-lg p-4 rounded-4xl'>
                <div 
                className='font-unsaid font-extrabold w-full' 
                style={{ color: "#A1CDD9", fontSize: "20px" }}
                >
                    Is my information kept confidential?
                </div>
                <div className='flex flex-row items-center justify-center bg-[#DDDDDD] rounded-full p-3'>
                    <Image src="/faq_arrow.svg" alt="Arrow" width={24} height={24} className="w-5" />
                </div>
                {/* You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication. */}
            </div>
            <div className='flex flex-row w-full items-center justify-between bg-white shadow-lg p-4 rounded-4xl'>
                <div 
                className='font-unsaid font-extrabold w-full' 
                style={{ color: "#A1CDD9", fontSize: "20px" }}
                >
                    How long does a typical counselling session last?
                </div>
                <div className='flex flex-row items-center justify-center bg-[#DDDDDD] rounded-full p-3'>
                    <Image src="/faq_arrow.svg" alt="Arrow" width={24} height={24} className="w-5" />
                </div>
                {/* You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication. */}
            </div>
            <div className='flex flex-row w-full items-center justify-between bg-white shadow-lg p-4 rounded-4xl'>
                <div 
                className='font-unsaid font-extrabold w-full' 
                style={{ color: "#A1CDD9", fontSize: "20px" }}
                >
                    Can I switch my counsellor if it's not a good fit?
                </div>
                <div className='flex flex-row items-center justify-center bg-[#DDDDDD] rounded-full p-3'>
                    <Image src="/faq_arrow.svg" alt="Arrow" width={24} height={24} className="w-5" />
                </div>
                {/* You can choose the type of session that suits you best — whether it’s a video call for a face-to-face experience, an audio call for more comfort, or a chat session for quick and easy communication. */}
            </div>
        </div>
    </div>
  );
};

export default faq;