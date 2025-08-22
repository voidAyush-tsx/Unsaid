"use client"

import React from 'react';
import Image from 'next/image';
import styles from './vibrate.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className="top-5 flex flex-row items-center justify-between p-3 bg-[#A1CDD9] text-white shadow-xl rounded-full m-4">
      <div className={`group ${styles.vibrateOnHover} flex items-center rounded-full bg-[#74B7C9] p-4 cursor-pointer`}>
        <Image
          src="/navBar/call_icon.svg" 
          alt="Call Icon" 
          width={16}
          height={16}
          className={`group-hover:scale-150 transition-transform duration-300 w-4 h-4`}
        />
      </div>
      <Image 
        src="/navBar/navBar_logo.svg" 
        alt="Logo" 
        width={200}
        height={50}
        className="w-50 cursor-pointer" 
        onClick={() => (window.location.href = "/")}
      />
      <div className="group flex items-center rounded-full bg-[#74B7C9] p-4 cursor-pointer">
        <Image 
          src="/navBar/menu_icon.svg" 
          alt="Menu Icon" 
          width={16}
          height={16}
          className="w-4 h-4 group-hover:rotate-90 group-hover:scale-120 transition-transform duration-300" 
        />
      </div>
    </nav>
  );
};

export default Navbar;