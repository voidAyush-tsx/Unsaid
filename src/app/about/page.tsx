"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar_v2 from '@/components/navBar_v2';
import Footer_v1 from "@/components/footer_v1";
import Counsellor_Grid from '@/components/about/counsellor_grid';

export default function About() {
  const searchParams = useSearchParams();

  // Ref for form section
  const AllCounsellorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchParams.get("scroll") === "allcounsellors") {
      setTimeout(() => {
        AllCounsellorRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500); // delay so page renders first
    }
  }, [searchParams]);

  // Scroll handler
  const handleScrollToAllCounsellor = () => {
    AllCounsellorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.4], [0.5, 1]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden m-0">
      <div className="w-full z-50">
        <Navbar_v2 />
      </div>

      <div className='flex flex-col items-center px-72 py-4 justify-center w-full'>
        <Image
          src="/about/about_image.png"
          alt="About Us"
          width={500}
          height={300}
          className='w-3xl'
        />
        <div
        className='font-unsaid font-extrabold'
        style={{ color: "#A1CDD9", fontSize: "60px" }}
        >
            Meet the heart of our <span style={{ color: "#FB8728"}}>practise</span>
        </div>
        <div
        className='font-unsaid font-medium'
        style={{ color: "#E48A39", fontSize: "20px" }}>
            Our counselors are here to listen, support, and guide you with care.
        </div>

      </div>

      <div className="flex flex-col px-48 py-36 items-center justify-center align-middle">
        <h1 className="font-unsaid font-extrabold mb-16" style={{ color: "#A1CDD9", fontSize:"60px"}}>Our Story</h1>
        <p
          className="flex flex-col justify-center items-center text-center px-50 font-unsaid"
          style={{ color: "#736B66", fontSize: "20px" }}
        >
          At Unsaid, we believe that every emotion, every struggle, and every unspoken thought deserves to be acknowledged. Our journey began with a simple yet powerful idea—to create a safe and supportive platform for those navigating anxiety, stress, and mental well-being. We understand that sometimes, words fail us, but feelings remain. That&apos;s why we built Unsaid—a space where guidance, support, and healing come together.
        </p>
        <button 
        className="flex flex-row bg-[#A1CDD9] rounded-full font-unsaid mt-16 px-8 py-4 gap-3 cursor-pointer"
        onClick={() => window.location.href = "/get_in_touch"}
        >
            <div 
              className="font-unsaid font-extrabold text-left" 
              style={{ color: "#fff", fontSize:"18px"}}
            >
            Get In Touch
            </div>
          <Image src="/right_arrow.svg" alt="Arrow" width={20} height={27} className="w-5" />
        </button>
      </div>

        <div className='relative min-h-screen flex flex-col items-center m-5 px-28 py-24 rounded-4xl bg-[#FB8728]'>
        <div className='rounded-full px-4 py-2 bg-transparent border-2 border-white font-unsaid font-bold text-white'>
            What We Believe
        </div>
        <div 
        className='font-unsaid font-extrabold mt-6'
        style={{ color: "#fff", fontSize: "60px" }}
        >
            Our Core Values
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4 mt-16">
            <motion.div 
            className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center"
            style={{opacity, scale}}
            initial={{opacity:0, scale:0.5}}
            >
            <Image 
                src="/features/logo_feature_1.svg" 
                alt="feature_1" 
                width={96}
                height={96}
                className="rounded-full"
            />
            <div className='mt-12 text-left'>
                <div 
                className='font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "24px" }}
                >
                Safe Space
                </div>
                <div 
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px" }}
                >
                A place where you can be yourself without fear or judgment.
                </div>
            </div>
            </motion.div>
            <motion.div 
            className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center"
            style={{opacity, scale}}
            initial={{opacity:0, scale:0.5}}
            >
            <Image 
                src="/features/logo_feature_2.svg" 
                alt="feature_2" 
                width={96}
                height={96}
                className="rounded-full"
            />
            <div className='mt-12 text-left'>
                <div 
                className='font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "24px" }}
                >
                Understanding
                </div>
                <div 
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px" }}
                >
                Every emotion matters, and every story is heard.
                </div>
            </div>
            </motion.div>
            <motion.div 
            className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center"
            style={{opacity, scale}}
            initial={{opacity:0, scale:0.5}}
            >
            <Image 
                src="/features/logo_feature_3.svg" 
                alt="feature_3" 
                width={96}
                height={96}
                className="rounded-full"
            />
            <div className='mt-12 text-left'>
                <div 
                className='font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "24px" }}
                >
                Support
                </div>
                <div 
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px" }}
                >
                You&apos;re never alone in your journey toward healing.
                </div>
            </div>
            </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <motion.div 
            className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center"
            style={{opacity, scale}}
            initial={{opacity:0, scale:0.5}}
            >
            <Image 
                src="/features/logo_feature_4.svg" 
                alt="feature_4" 
                width={96}
                height={96}
                className="rounded-full"
            />
            <div className='mt-12 text-left'>
                <div 
                className='font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "24px" }}
                >
                Empowerment
                </div>
                <div 
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px" }}
                >
                Helping you regain control and confidence in life.
                </div>
            </div>
            </motion.div>
            <motion.div 
            className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center"
            style={{opacity, scale}}
            initial={{opacity:0, scale:0.5}}
            >
            <Image 
                src="/features/logo_feature_5.svg" 
                alt="feature_5" 
                width={96}
                height={96}
                className="rounded-full"
            />
            <div className='mt-12 text-left'>
                <div 
                className='font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "24px" }}
                >
                Clarity
                </div>
                <div 
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px" }}
                >
                Guiding you toward self-awareness and inner peace.
                </div>
            </div>
            </motion.div>
            <motion.div 
            className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center"
            style={{opacity, scale}}
            initial={{opacity:0, scale:0.5}}
            >
            <Image 
                src="/features/logo_feature_6.svg" 
                alt="feature_6" 
                width={96}
                height={96}
                className="rounded-full"
            />
            <div className='mt-12 text-left'>
                <div 
                className='font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "24px" }}
                >
                Hope
                </div>
                <div 
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px" }}
                >
                A reminder that better days are always ahead.
                </div>
            </div>
            </motion.div>
        </div>
        </div>

      <div ref={AllCounsellorRef} >
        <Counsellor_Grid/>
      </div>

      <div className="flex w-full p-5">
        <div className="relative w-full h-[500px] rounded-4xl overflow-hidden">
          {/* Background Image */}
          <Image
            src="/about/about_cta.png"
            alt="CTA Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
            <div 
            className="font-unsaid font-extrabold text-white text-center"
            style={{ fontSize: "48px" }}>
              Let us help you find the counsellor that's right for you.
            </div>

            <button
              onClick={() => (window.location.href = "/signin")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#E48A39] hover:bg-[#d97c28] transition-colors font-unsaid"
            >
              <span className="text-lg font-extrabold text-white">Get Matched</span>
              <Image
                src="/right_arrow.svg"
                alt="Arrow"
                width={20}
                height={27}
                className="w-5 h-auto"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer_v1/>
      </div>
    </div>
  );
}