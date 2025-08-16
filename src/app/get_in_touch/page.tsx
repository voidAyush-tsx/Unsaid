"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { motion, useAnimationControls } from 'framer-motion';
import MsgForm from "@/components/GetInTouch/msg_form";
import FAQ from "@/components/GetInTouch/faqs"
import Navbar from "@/components/navBar_v1";
import Footer from "@/components/footer_v1";

export default function getInTouch() {
  // Animation controls
  const mockupControls = useAnimationControls();
  const patientReplyControls = useAnimationControls();
  const doctorReplyControls = useAnimationControls();

  // Trigger animations
  useEffect(() => {
    mockupControls.start({ opacity: 1, transition: { duration: 0.75, ease: "easeOut" } });
    patientReplyControls.start({ scale: 1, opacity: 1, transition: { duration: 0.75, ease: "easeOut", delay: 0.2 } });
    doctorReplyControls.start({ scale: 1, opacity: 1, transition: { duration: 0.75, ease: "easeOut", delay: 0.4 } });
  }, [mockupControls, patientReplyControls, doctorReplyControls]);

  return (
    <div className="relative w-full min-h-screen flex flex-col m-0">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

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

          <div className='flex flex-row w-full gap-4 mt-12'>
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
          <button className='flex flex-row rounded-full font-unsaid font-extrabold bg-[#A1CDD9] mt-12 px-8 py-4 gap-3 cursor-pointer'>
            <div 
              className="font-unsaid font-extrabold text-left" 
              style={{ color: "#fff", fontSize: "18px" }}
            >
              Or Fill the Form Below
            </div>
            <Image 
              src="/right_arrow.svg" 
              alt="Arrow" 
              width={20} 
              height={27} 
              className="w-5 rotate-90" 
            />
          </button>
        </div>

        <div className="flex-1 flex h-full items-center justify-center">
          <div className='flex items-center justify-center rounded-full bg-[#A1CDD9] w-[500px] h-[500px]'>
            <motion.div
              className="absolute rounded-4xl translate-y-40 w-115 z-2"
              initial={{ opacity: 0 }}
              animate={mockupControls}
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
                initial={{ scale: 0.5, opacity: 0 }}
                animate={patientReplyControls}
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
                initial={{ scale: 0.5, opacity: 0 }}
                animate={doctorReplyControls}
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

      <MsgForm />

      <FAQ/>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}