"use client"

import React from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="top-5 flex flex-row items-center justify-between p-3 bg-[#A1CDD9] text-white shadow-xl rounded-full m-4">
      <div className="flex items-center rounded-full bg-[#74B7C9] p-4">
        <Image 
          src="/navBar/call_icon.svg" 
          alt="Call Icon" 
          width={16}
          height={16}
          className="w-4 h-4" 
        />
      </div>
      <Image 
        src="/navBar/navBar_logo.svg" 
        alt="Logo" 
        width={200}
        height={50}
        className="w-50" 
      />
      <div className="flex items-center rounded-full bg-[#74B7C9] p-4">
        <Image 
          src="/navBar/menu_icon.svg" 
          alt="Menu Icon" 
          width={16}
          height={16}
          className="w-4 h-4" 
        />
      </div>
    </nav>
  );
};

export default Navbar;