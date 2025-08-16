"use client"

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className='flex flex-col items-center rounded-t-4xl bg-[#A1CDD9] relative overflow-hidden'>

        <div className='flex flex-col items-center px-32 py-28 z-50'>
            <div className='flex flex-col items-center justify-center gap-16 p-4 w-full'>
                <Image 
                  src="/unsaid_logo_white.svg" 
                  alt="Unsaid Logo" 
                  width={176}
                  height={176}
                  className="w-44"
                />
                <div className='flex flex-row gap-2'>
                    <div className='flex flex-row font-unsaid font-medium rounded-full p-4 pr-40 items-center justify-center bg-[#372315] text-white w-full'
                    style={{ color: "#C9C7C5", fontSize:"18px"}}
                    >
                        <Image 
                          src="/footer/mail_icon.svg" 
                          alt="mail" 
                          width={24}
                          height={24}
                          className="mr-2" 
                        />
                        Leave a Message
                    </div>
                    <div className='flex items-center justify-center rounded-full p-8 bg-[#E48A39]'>
                        <Image 
                          src="/right_arrow.svg" 
                          alt="Arrow" 
                          width={24}
                          height={24}
                          className="absolute" 
                        />
                    </div>
                </div>
                <div 
                className='flex flex-row min-w-full font-unsaid font-medium gap-16'
                style={{ color: "#fff", fontSize:"36px"}}
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
        <div 
        className='flex flex-row items-center gap-4 mb-8 font-unsaid font-black z-50'
        style={{ color: "#fff", fontSize:"14px"}}
        >
            <div 
            className="text-left"
            >
                COPYRIGHT 2025, ALL RIGHTS RESERVED
            </div>
            <div className='rounded-full bg-[#926247] w-2 h-2'></div>
            <div 
            className="text-left cursor-pointer"
            onClick={() => window.location.href = "/privacy"}
            >
                TERMS & CONDITIONS
            </div>
            <div className='rounded-full bg-[#926247] w-2 h-2'></div>
            <div 
            className="text-left cursor-pointer"
            onClick={() => window.location.href = "/privacy"}
            >
                PRIVACY POLICY
            </div>
        </div>
        <Image
            src="/footer/footer_bg.svg"
            alt="footer bg"
            width={1200}
            height={400}
            className="absolute inset-0 w-full h-full object-cover rounded-t-4xl"
            style={{ zIndex: 0 }}
        />
    </footer>
  );
};

export default Footer;