"use client";

import React from 'react';
import Image from "next/image";

const connect_qs: React.FC = () => {
  
  return (
    <div className='relative min-h-screen flex flex-col items-center px-34 py-24 bg-transparent gap-12'>

        <div className='flex flex-col items-center gap-5'>
            <div
                className='flex flex-col items-center font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "48px" }}
            >
                <div className='flex flex-row gap-3'>
                    <div> What is it that is </div> <div style={{ color: "#E48A39"}}> not </div>
                </div>
                <div>
                    making you smile?
                </div>
            </div>
            <div
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px"}}
            >
                Your experience matters - pick all that fit
            </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_1.png'
            alt='Card-1'
            width={925}
            height={900}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Family- The Pressure Push?
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_2.png'
            alt='Card-2'
            width={1025}
            height={1025}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Buried under Books and Deadlines?
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_3.png'
            alt='Card-3'
            width={1040}
            height={1040}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Tired of Society's Outdated Rules?
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_4.png'
            alt='Card-4'
            width={1040}
            height={1040}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Friendship Dilemmas
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_5.png'
            alt='Card-5'
            width={1025}
            height={1025}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Love Life in a Tangle?
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_6.png'
            alt='Card-6'
            width={1040}
            height={1040}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Celebrating your Identity
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-fit">
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_7.png'
            alt='Card-7'
            width={1040}
            height={1040}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Healing from Substance Dependence
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-4 p-4 bg-[#F7F4F2] rounded-4xl">
            <Image
            src='/connect/grid_assets/card_8.png'
            alt='Card-8'
            width={1040}
            height={1040}
            className='w-50 h-auto'
            />
            <div 
            className='flex items-center justify-center w-full font-unsaid font-extrabold px-8 py-4 rounded-4xl border-2 border-[#74B7C9] bg-transparent'
            style={{ color: "#A1CDD9", fontSize: "18px"}}
            >
              Figuring out your Dream Path?
            </div>
          </div>
        </div>
        
        <button 
          className='flex items-center justify-center mt-2 bg-[#A1CDD9] px-8 py-4 rounded-4xl'
        >
          <div 
            className='font-unsaid font-extrabold'
            style={{ color: "#FFFFFF", fontSize: "18px"}}
          >
            Talk to a Counsellor
          </div>
          <Image
            src="/talk_to_counsellor_logo.svg"
            alt='Talk to Counsellor arrow'
            width={24}
            height={24}
            className='w-6'
          />
        </button>
    </div>
  );
};

export default connect_qs;