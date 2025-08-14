"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const Features: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.4], [0.5, 1]);
  return (
    <div className='relative min-h-screen flex flex-col items-center m-4 px-28 py-24 rounded-4xl bg-[#FB8728]'>
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
  );
};

export default Features;