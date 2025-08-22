"use client";

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const HealingJourney: React.FC = () => {
  // References for DOM elements to animate
  const parentCircleRef = useRef<HTMLDivElement>(null);
  const childCircle1Ref = useRef<HTMLDivElement>(null);
  const childCircle2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent server-side execution in Next.js
    if (typeof window === "undefined") return;

    const parentCircle = parentCircleRef.current;
    const childCircle1 = childCircle1Ref.current;
    const childCircle2 = childCircle2Ref.current;
    const container = containerRef.current;

    if (parentCircle && childCircle1 && childCircle2 && container) {
      // Set initial states: parent at scale 0, child circles at center
      gsap.set(parentCircle, { scale: 0, transformOrigin: "center center" });
      gsap.set([childCircle1, childCircle2], { x: 0, y: 0 });

      // Create a GSAP timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%", // Trigger when container is 80% in viewport
          end: "top 80%",   // End immediately to prevent repeat
          once: true,       // Play animation only once
          markers: false,   // Set to true for debugging
        },
        defaults: { ease: "power2.out", duration: 1.5 },
      });

      // Animate parent circle to full size (scale: 1)
      tl.to(parentCircle, {
        scale: 1,
      });

      // Simultaneously animate child circles to their final positions
      tl.to(
        childCircle1,
        {
          x: 112, // translate-x-28 = 28 * 4px = 112px
          y: 112, // translate-y-28 = 28 * 4px = 112px
          duration: 1.5,
        },
        0 // Start at the same time as parent animation
      ).to(
        childCircle2,
        {
          x: -64, // -translate-x-16 = -16 * 4px = -64px
          y: -144, // -translate-y-36 = -36 * 4px = -144px
          duration: 1.5,
        },
        0 // Start at the same time as parent animation
      );
    }

    // Cleanup: Kill animations and ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([parentCircle, childCircle1, childCircle2]);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen px-6 py-10">
      <div className="flex items-center justify-center">
        {/* Parent Circle */}
        <div
          ref={parentCircleRef}
          className="p-40 bg-[#FB8728] rounded-full"
        ></div>

        {/* Child Circle 1 */}
        <div
          ref={childCircle1Ref}
          className="p-8 bg-[#FB8728] absolute rounded-full border-8 border-white"
        ></div>

        {/* Child Circle 2 */}
        <div
          ref={childCircle2Ref}
          className="p-8 bg-[#FB8728] absolute rounded-full border-8 border-white"
        ></div>

        {/* Mental Health */}
        <div className='flex flex-col gap-2 absolute bg-white p-4 rounded-3xl '>
          <div className='flex flex-row items-center gap-10 justify-between w-full'>
            <div 
              className='font-unsaid font-extrabold rounded-full'
              style={{color: "#251404A3", fontSize: "16px"}}
            >
              Mental Health
            </div>
            <Image
              src="/healthJourney/mental_health_bracket.svg"
              alt="Mental Health"
              width={32}
              height={32}
              className='w-5'
            />
          </div>
          <div 
          className='w-full font-unsaid font-extrabold'
          style={{color: "#A1CDD9", fontSize: "36px"}}>
            98.92%
          </div>
          <div className='w-full h-2 bg-[#E8DDD9] rounded-full relative'>
            <div className='absolute w-11/12 h-2 bg-[#F4A258] rounded-full'></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HealingJourney;