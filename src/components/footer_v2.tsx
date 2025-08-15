"use client";
import React from "react";
import Image from "next/image";

const Footer_v2: React.FC = () => {
  return (
    <footer
      className="relative flex flex-row rounded-t-4xl items-center justify-between bg-[#A1CDD9] w-full overflow-hidden px-36 py-30"
      style={{ maxHeight: "100vh" }}
    >
      <div
        className="absolute bg-[#74B7C9A3] rounded-full"
        style={{
          width: "min(90vw, 2050px)", // Scales to 50% of viewport width, capped at 400px
          height: "min(90vw, 2050px)", // Same for height to maintain circle shape
          transform: "translate(-50%, -50%)",
          left: "-15%", // Positions circle towards left side
          top: "8%", // Positions circle towards top
        }}
      ></div>
      <div
        className="absolute bg-[#74B7C9A3] rounded-full"
        style={{
          width: "min(150vw)", // Scales to 50% of viewport width, capped at 400px
          height: "min(150vw)", // Same for height to maintain circle shape
          transform: "translate(50%, 50%)", // Centers circle relative to its own size
          right: "22%", // Positions circle towards right side
          bottom: "-90%", // Positions circle towards bottom
        }}
      ></div>

      <div className="flex flex-row w-full items-start justify-between z-10">
        <div 
        className='flex flex-2/5 flex-col items-start font-unsaid font-medium gap-8'
        style={{ color: "#fff", fontSize:"48px"}}
        >
            <button
            className='cursor-pointer'
            onClick={() => window.location.href = "/connect"}
            >
                <div>
                    Connect
                </div>
            </button>

            <button
            className='cursor-pointer'
            onClick={() => window.location.href = "/assessment"}
            >
                <div>
                    Assessment
                </div>
            </button>

            <button
            className='cursor-pointer'
            onClick={() => window.location.href = "/about"}
            >
                <div>
                    About Us
                </div>
            </button>

            <button
            className='cursor-pointer'
            onClick={() => window.location.href = "/support"}
            >
                <div>
                    Support
                </div>
            </button>

            <button
            className='cursor-pointer'
            onClick={() => window.location.href = "/blog"}
            >
                <div>
                    Blog
                </div>
            </button>
        </div>
        <div className="flex flex-3/5 flex-col gap-12">

            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-6">
                    <Image
                    src="/unsaid_logo_white.svg"
                    alt="Unsaid Logo"
                    width={176}
                    height={176}
                    className="w-50"
                    />
                    <div
                    className="font-unsaid font-black text-[#FFFFFFA3]"
                    style={{fontSize: "12px" }}
                    >
                        COPYRIGHT 2025, ALL RIGHTS RESERVED

                    </div>
                </div>


                <div 
                className="font-unsaid font-semibold"
                style={{ color: "white", fontSize: "30px" }}
                >
                    With You
                </div>
            </div>


            <div className='flex flex-row gap-4'>
                <Image 
                    src="/footer/insta_icon.svg" 
                    alt="Instagram Icon" 
                    width={48}
                    height={48}
                    className="rounded-full w-16 cursor-pointer p-4 border-2 border-white"
                    onClick={() => window.location.href = "/insta"} 
                />
                <Image 
                    src="/footer/facebook_icon.svg" 
                    alt="Facebook Icon" 
                    width={48}
                    height={48}
                    className="rounded-full w-16 cursor-pointer p-4 border-2 border-white"
                    onClick={() => window.location.href = "/meta"} 
                />
                <Image 
                    src="/footer/twitter_icon.svg" 
                    alt="Twitter Icon" 
                    width={48}
                    height={48}
                    className="rounded-full w-16 cursor-pointer p-4 border-2 border-white"
                    onClick={() => window.location.href = "/twitter"} 
                />
            </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer_v2;