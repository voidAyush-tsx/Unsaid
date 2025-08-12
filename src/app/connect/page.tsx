// import Navbar from "@/components/navBar_v2";
// import Footer from "@/components/footer_v2";
import React from 'react';
import Image from 'next/image';

export default function Connect() {
  return (
    // <div className="relative w-full min-h-screen flex flex-col m-0">
    <div className="relative flex flex-col items-center overflow-hidden p-96">

      <div style={{ width: "100%" }}>
        <Image
          src="/Connect/connect_hero_bg.svg"
          alt="Connect bg"
          // width={}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      </div>

    </div>
  );
}