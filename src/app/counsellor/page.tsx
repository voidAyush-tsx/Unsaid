"use client"

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navBar_v1";
import Footer from "@/components/footer_v1";

export default function Counsellor() {
  const rightSectionRef = useRef<HTMLDivElement>(null);

  // Measure the height of the right section on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      if (rightSectionRef.current) {
        // Height calculation logic retained for potential future use
        // const height = rightSectionRef.current.offsetHeight;
      }
    };

    updateHeight(); // Initial height calculation
    window.addEventListener("resize", updateHeight); // Update on window resize

    return () => window.removeEventListener("resize", updateHeight); // Cleanup
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col m-0">
        <div className="fixed w-full z-50">
            <Navbar/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-16 mt-32 items-stretch">
            {/* Counsellor Image */}
            <div className="relative rounded-4xl overflow-hidden md:min-h-[600px]">
                <Image
                src="/counsellors/counsellor.png"
                alt="Counsellor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Counsellor Details */}
            <div className="flex flex-col justify-end gap-8">
                <div className="flex flex-col gap-4">
                <div
                    className="font-unsaid font-extrabold"
                    style={{ color: "#E48A39", fontSize: "60px" }}
                >
                    Dr. Priya Sharma
                </div>
                <div
                    className="font-unsaid font-semibold"
                    style={{ color: "#736B66", fontSize: "18px" }}
                >
                    Licensed Clinical Psychologist | Anxiety, Depression, and Trauma Specialist
                </div>
                </div>

                <div
                className="font-unsaid font-medium"
                style={{ color: "#736B66", fontSize: "24px" }}
                >
                Hi, I&apos;m Dr. Priya Sharma, a licensed clinical psychologist specializing in anxiety, depression, and trauma recovery. My approach is warm, empathetic, and empowering, and I&apos;m here to help you navigate life&apos;s challenges with confidence and calm.
                </div>
            </div>
        </div>

        <div className="flex flex-row items-start justify-center gap-16 py-24 px-36">
            <div className="flex flex-col flex-2/5 items-start gap-12">
                <div className="flex flex-col items-start">
                    <div
                    className="font-unsaid font-extrabold"
                    style={{ color: "#736B66", fontSize: "16px" }}
                    >
                        Specialisations
                    </div>
                    <div
                    className="flex flex-col items-start font-unsaid font-bold"
                    style={{ color: "#A1CDD9", fontSize: "20px" }}
                    >
                        <div>Anxiety & Stress Management</div>
                        <div>Depression Recovery</div>
                        <div>Trauma-Informed Therapy</div>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <div
                    className="font-unsaid font-extrabold"
                    style={{ color: "#736B66", fontSize: "16px" }}
                    >
                        Experience
                    </div>
                    <div
                    className="flex flex-col items-start font-unsaid font-bold"
                    style={{ color: "#A1CDD9", fontSize: "20px" }}
                    >
                        With over 10 years of experience working with individuals facing diverse challenges, I strive to create a safe and non-judgmental space for healing.
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <div
                    className="font-unsaid font-extrabold"
                    style={{ color: "#736B66", fontSize: "16px" }}
                    >
                        Qualifications & Credentials
                    </div>
                    <div
                    className="flex flex-col items-start font-unsaid font-bold"
                    style={{ color: "#A1CDD9", fontSize: "20px" }}
                    >
                        <div>Ph.D. in Clinical Psychology, XYZ University</div>
                        <div>Licensed Therapist, ABC Association</div>
                    </div>
                </div>
                <div className='flex flex-row gap-4'>
                    <Image 
                      src="/counsellors/insta_icon_brown.svg" 
                      alt="Instagram Icon" 
                      width={48}
                      height={48}
                      className="rounded-full w-16 cursor-pointer p-4 bg-[#F7F4F2]"
                      onClick={() => window.location.href = "/"} 
                    />
                    <Image 
                      src="/counsellors/facebook_icon_brown.svg" 
                      alt="Facebook Icon" 
                      width={48}
                      height={48}
                      className="rounded-full w-16 cursor-pointer p-4 bg-[#F7F4F2]"
                      onClick={() => window.location.href = "/"} 
                    />
                    <Image 
                      src="/counsellors/yt_icon_brown.svg" 
                      alt="YouTube Icon" 
                      width={48}
                      height={48}
                      className="rounded-full w-16 cursor-pointer p-4 bg-[#F7F4F2]"
                      onClick={() => window.location.href = "/"} 
                    />
                    <Image 
                      src="/counsellors/linkedin_icon_brown.svg" 
                      alt="Linkedin Icon" 
                      width={48}
                      height={48}
                      className="rounded-full w-16 cursor-pointer p-4 bg-[#F7F4F2]"
                      onClick={() => window.location.href = "/"} 
                    />
                </div>
            </div>

            <div className="flex flex-3/5">
                <div className="flex flex-row items-start rounded-4xl gap-2 py-12 px-8 bg-[#A1CDD9]">
                    <Image
                    src="/quote_icon.svg"
                    alt="Quote"
                    width={120}
                    height={120}
                    className="w-16"
                    />
                    <div
                    className="font-unsaid font-semibold text-white text-left"
                    style={{fontSize: "36px" }}
                    >
                        “Healthcare is not just about treating ailments, but also about empowering individuals to take charge of their well-being and lead fulfilling lives.”
                    </div>
                </div>
            </div>
        </div>

        <div className='relative min-h-screen px-6 py-4'>
            <div className='flex flex-row px-30 py-25 gap-32 bg-[#F4A258] rounded-4xl'>
                <div className='flex flex-col items-start gap-12'>
                    <div
                        className='font-unsaid font-extrabold leading-14'
                        style={{ color: "#F0F2E8", fontSize: "48px"}}
                    >
                        We believe that mental health support should be <span className='w-fit' style={{ color: "#A1CDD9"}}>accessible</span> to everyone.
                    </div>
                    <div className='flex flex-col items-start gap-3'>
                        <div 
                            className='font-unsaid font-black text-left'
                            style={{ color: "#F0F2E8", fontSize: "14px"}}
                        >
                            MODE OF COUNSELLING
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row items-center rounded-full bg-[#FB8728] p-4'>
                                <div className='bg-[#A1CDD9] rounded-full p-4'>
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
                                    className='font-unsaid font-semibold text-white'
                                    style={{fontSize: "18px"}}
                                    >
                                        We provide personalized support AI
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center rounded-full bg-[#FB8728] p-4'>
                                <div className='bg-[#A1CDD9] rounded-full p-4'>
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
                                    className='font-unsaid font-semibold text-white'
                                    style={{fontSize: "18px"}}
                                    >
                                        As well as weekly articles for your health
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center rounded-full bg-[#FB8728] p-4'>
                                <div className='bg-[#A1CDD9] rounded-full p-4'>
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
                                    className='font-unsaid font-semibold text-white'
                                    style={{fontSize: "18px"}}
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

        <div className="w-full">
            <Footer/>
        </div>
    </div>
  );
}