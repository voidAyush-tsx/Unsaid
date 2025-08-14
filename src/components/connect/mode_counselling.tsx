"use client";

import React from 'react';
import Image from "next/image";

const counselling_mode: React.FC = () => {
  
  return (
    <div className='relative min-h-screen px-6 py-4'>
        <div className='flex flex-row px-30 py-25 gap-32 bg-[#A1CDD9] rounded-4xl'>
            <div className='flex flex-col items-start gap-12'>
                <div
                    className='font-unsaid font-extrabold leading-14'
                    style={{ color: "#F0F2E8", fontSize: "48px"}}
                >
                    We believe that mental health support should be <span className='w-fit' style={{ color: "#E48A39"}}>accessible</span> to everyone.
                </div>
                <div className='flex flex-col items-start gap-3'>
                    <div 
                        className='font-unsaid font-black text-left'
                        style={{ color: "#F0F2E8", fontSize: "14px"}}
                    >
                        MODE OF COUNSELLING
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row items-center rounded-full bg-[#74B7C9] p-4'>
                            <div className='bg-[#926247] rounded-full p-4'>
                                <Image
                                src="/connect/mode_counselling/chat_icon.png"
                                alt='Chat'
                                width={120}
                                height={120}
                                className='w-6'
                                />
                            </div>
                            <div className='flex flex-col gap-0 mx-5'>
                                <div
                                className='font-unsaid font-extrabold'
                                style={{ color: "#F0F2E8", fontSize: "24px"}}
                                >
                                    Chat (Text-Based Support)
                                </div>
                                <div 
                                className='font-unsaid font-semibold'
                                style={{ color: "#F0F2E8", fontSize: "18px"}}
                                >
                                    We provide personalized support AI
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center rounded-full bg-[#74B7C9] p-4'>
                            <div className='bg-[#926247] rounded-full p-4'>
                                <Image
                                src="/connect/mode_counselling/call_icon.png"
                                alt='Chat'
                                width={120}
                                height={120}
                                className='w-6'
                                />
                            </div>
                            <div className='flex flex-col gap-0 mx-5'>
                                <div
                                className='font-unsaid font-extrabold'
                                style={{ color: "#F0F2E8", fontSize: "24px"}}
                                >
                                    Voice Call
                                </div>
                                <div 
                                className='font-unsaid font-semibold'
                                style={{ color: "#F0F2E8", fontSize: "18px"}}
                                >
                                    As well as weekly articles for your health
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center rounded-full bg-[#74B7C9] p-4'>
                            <div className='bg-[#926247] rounded-full p-4'>
                                <Image
                                src="/connect/mode_counselling/video_icon.png"
                                alt='Chat'
                                width={120}
                                height={120}
                                className='w-6'
                                />
                            </div>
                            <div className='flex flex-col gap-0 mx-5'>
                                <div
                                className='font-unsaid font-extrabold'
                                style={{ color: "#F0F2E8", fontSize: "24px"}}
                                >
                                    Video Call
                                </div>
                                <div 
                                className='font-unsaid font-semibold'
                                style={{ color: "#F0F2E8", fontSize: "18px"}}
                                >
                                    We provide personalized support AI
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-full'>
                <Image
                src= "/connect/mode_counselling_asset.svg"
                alt="Mode of Counselling"
                width={458}
                height={622}
                className='w-115 h-auto'
                />
            </div>
        </div>

    </div>
  );
};

export default counselling_mode;