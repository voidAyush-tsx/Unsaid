"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";

const GetInTouch: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.575, 0.65], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.6, 0.675], [0.5, 1]);
  
  return (
    <div className='relative min-h-screen flex flex-row items-center m-4 p-28 bg-transparent gap-36'>
      <div className="flex-1 flex flex-col h-full items-start justify-center">
        <h1 
        className='font-unsaid font-extrabold'
        style={{ color: "#A1CDD9", fontSize: "60px" }}
        >
            Let&apos;s Get in Touch with Us.
        </h1>
        <p
        className='font-unsaid font-medium mt-8'
        style={{ color: "#736B66", fontSize: "20px" }}
        >
            Have questions or need assistance? We&apos;re here to help you out every step of the way!
        </p>
        <div
        className='flex flex-row w-full gap-4 mt-12'
        >
          <div className='flex-1 flex flex-col items-start p-0 m-0'>
            <div className='flex items-center justify-center rounded-full mb-4 w-10 h-10 bg-[#F0F2E8]'>
              <Image 
                src="/getInTouch/location_logo.svg" 
                alt="Location" 
                width={24} 
                height={24} 
                className="w-6 h-6 bg-transparent"
              />
            </div>
            <div
            className='font-unsaid font-extrabold mb-2'
            style={{ color: "#A1CDD9", fontSize: "18px" }}
            >
                Our Address
            </div>
            <div
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "18px" }}
            >
                abcd
            </div>
          </div>
          <div className='flex-1 flex flex-col items-start p-0 m-0'>
            <div className='flex items-center justify-center rounded-full mb-4 w-10 h-10 bg-[#F0F2E8]'>
              <Image 
                src="/getInTouch/contact_logo.svg" 
                alt="Contact" 
                width={24} 
                height={24} 
                className="w-6 h-6 bg-transparent"
              />
            </div>
            <div
            className='font-unsaid font-extrabold mb-2'
            style={{ color: "#A1CDD9", fontSize: "18px" }}
            >
                Our Contact Info
            </div>
            <div
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "18px" }}
            >
                123456789
            </div>
          </div>
        </div>
        <button className='flex flex-row rounded-full font-unsaid font-extrabold bg-[#A1CDD9] mt-12 px-8 py-4 gap-3'>
          <div 
          className="font-unsaid font-extrabold text-left" 
          style={{ color: "#fff", fontSize:"18px"}}
          >
            Or Fill the Form
          </div>
          <Image src="/right_arrow.svg" alt="Arrow" width={20} height={27} className="w-5" />
        </button>
      </div>


      <div className="flex-1 flex h-full items-center justify-center">
        <div className='flex items-center justify-center rounded-full bg-[#A1CDD9] w-[500px] h-[500px]'>
          <motion.div
            className="absolute rounded-4xl translate-y-40 w-115 z-2" 
            style={{opacity}}
            initial={{opacity: 0}}
          >
            <Image 
              src="/getInTouch/unsaid_mockup.svg" 
              alt="Unsaid Mockup" 
              width={460} 
              height={460} 
            />
          </motion.div>
          <div className='flex flex-col'>
            <motion.div
              className="absolute -translate-x-32 -translate-y-36 w-96 z-3" 
              style={{scale, opacity}}
              initial={{scale: 0.5, opacity:0}}
            >
              <Image 
                src="/getInTouch/patient_reply.svg" 
                alt="Patient Reply" 
                width={384} 
                height={384} 
              />
            </motion.div>
            <motion.div
              className="absolute -translate-x-60 translate-y-0 w-96 z-3" 
              style={{scale, opacity}}
              initial={{scale: 0.5, opacity:0}}
            >
              <Image 
                src="/getInTouch/doctor_reply.png" 
                alt="Doctor Reply" 
                width={384} 
                height={384} 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;