"use client"

import React from 'react';
import Image from 'next/image';
import Connect_QS from "@/components/connect/connect_qs";
import CounsellingMode from "@/components/connect/mode_counselling";
import HealingJourney from "@/components/connect/healing_journey";
import Navbar_v2 from '@/components/navBar_v2';
import Footer_v2 from "@/components/footer_v2";

export default function Connect() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden m-0">
      <div className="w-full z-50">
        <Navbar_v2 />
      </div>
      <div className="w-full">
        <Image
          src="/connect/connect_hero_bg.svg"
          alt="Connect bg"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10 flex flex-row items-center justify-center w-full px-40 gap-25">
          <div className="flex flex-col flex-2/5 items-start justify-center gap-0">
            <div
              className='flex flex-row font-unsaid font-extrabold gap-1'
              style={{fontSize: "60px"}}
            >
              <div style={{color: "#A1CDD9"}}>It&apos;s</div>
              <div style={{color: "#E48A39"}}>OKAY!</div>
            </div>
            <div
              className='font-unsaid font-extrabold'
              style={{color: "#A1CDD9", fontSize: "60px"}}
            >
              Let&apos;s untangle it
            </div>
            <div
              className='font-unsaid font-extrabold'
              style={{color: "#A1CDD9", fontSize: "60px"}}
            >
              together
            </div>
          </div>
          <div className="flex flex-3/5">
            <Image
              src="/connect/connect_hero_asset.svg"
              alt="Connect hero"
              width={720}
              height={1280}
              className="relative object-contain"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      <div className='w-full'>
        <Connect_QS />
      </div>
      <div className='w-full'>
        <CounsellingMode />
      </div>

      <div className='w-full px-4'>
        <HealingJourney />
      </div>

      <div className='w-full py-2 px-4'>
        <div className='flex flex-col py-24 gap-10 rounded-4xl bg-[#FACC15] overflow-hidden'>
          <div className='scrolling-text_1 flex flex-row gap-4'>
            <div 
            className='font-unsaid font-extrabold bg-[#EAB308] rounded-full px-8 py-4'
            style={{color: "#FFFFFF", fontSize: "72px"}}
            >
              How
            </div>
            <div 
            className='font-unsaid font-extrabold bg-[#EAB308] rounded-full px-8 py-4'
            style={{color: "#FFFFFF", fontSize: "72px"}}
            >
              Our
            </div>
            <div className='flex items-center justify-center bg-white py-6 px-10 rounded-full'>
              <Image
                src="Fprint.svg"
                alt='Fingerprint Logo'
                width={112}
                height={102}
                className='w-16'
              />
            </div>
            <div 
            className='font-unsaid font-extrabold bg-[#EAB308] rounded-full px-8 py-4'
            style={{color: "#FFFFFF", fontSize: "72px"}}
            >
              Counselling
            </div>
          </div>
          <div className='scrolling-text_2 flex flex-row gap-4'>
            <div 
            className='font-unsaid font-extrabold bg-[#EAB308] rounded-full px-8 py-4'
            style={{color: "#FFFFFF", fontSize: "72px"}}
            >
              How
            </div>
            <div 
            className='font-unsaid font-extrabold bg-[#EAB308] rounded-full px-8 py-4'
            style={{color: "#FFFFFF", fontSize: "72px"}}
            >
              Our
            </div>
            <div className='flex items-center justify-center bg-white py-6 px-10 rounded-full'>
              <Image
                src="Fprint.svg"
                alt='Fingerprint Logo'
                width={112}
                height={102}
                className='w-16'
              />
            </div>
            <div 
            className='font-unsaid font-extrabold bg-[#EAB308] rounded-full px-8 py-4'
            style={{color: "#FFFFFF", fontSize: "72px"}}
            >
              Counselling
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrolling-text_1 {
          white-space: nowrap;
          overflow: hidden;
          animation: scroll_1 10s linear infinite;
        }
        .scrolling-text_2 {
          white-space: nowrap;
          overflow: hidden;
          animation: scroll_2 10s linear infinite;
        }
        @keyframes scroll_1 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes scroll_2 {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .scrolling-text:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .scrolling-text {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="w-full">
        <Footer_v2/>
      </div>
    </div>
  );
}