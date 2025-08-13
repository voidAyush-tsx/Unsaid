import React from 'react';
import Image from 'next/image';
import Connect_QS from "@/components/connect/connect_qs";

export default function Connect() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden">

      <div className='w-full'>
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
              <div style={{color: "#A1CDD9"}}>It's</div>
              <div style={{color: "#E48A39"}}>OKAY!</div>
            </div>

            <div
              className='font-unsaid font-extrabold'
              style={{color: "#A1CDD9", fontSize: "60px"}}
            >
              Let's untangle it
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
    </div>
  );
}