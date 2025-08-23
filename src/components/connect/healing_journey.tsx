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
  const mentalHealthRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const moodRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const smileRefs = useRef<HTMLDivElement[]>([]);
  const barRefs = useRef<HTMLDivElement[]>([]);

  // Helper to collect bar refs
  const setBarRef = (el: HTMLDivElement | null, index: number) => {
    if (el) barRefs.current[index] = el;
  };

  // Helper to collect smile refs
  const setSmileRef = (el: HTMLDivElement | null, index: number) => {
    if (el) smileRefs.current[index] = el;
  };

  useEffect(() => {
    // Prevent server-side execution in Next.js
    if (typeof window === "undefined") return;

    const parentCircle = parentCircleRef.current;
    const childCircle1 = childCircle1Ref.current;
    const childCircle2 = childCircle2Ref.current;
    const container = containerRef.current;
    const mentalHealth = mentalHealthRef.current;
    const percentage = percentageRef.current;
    const progressBar = progressBarRef.current;
    const mood = moodRef.current;
    const emoji = emojiRef.current;
    const bars = barRefs.current;
    const smiles = smileRefs.current;

    // Log refs for debugging
    console.log('Refs:', {
      parentCircle,
      childCircle1,
      childCircle2,
      container,
      mentalHealth,
      percentage,
      progressBar,
      mood,
      emoji,
      barsLength: bars.length,
      smilesLength: smiles.length,
    });

    // Check if all refs are valid
    if (!parentCircle || !childCircle1 || !childCircle2 || !container || !mentalHealth || 
        !percentage || !progressBar || !mood || !emoji || bars.length !== 12 || smiles.length !== 7) {
      console.error('Missing refs or incorrect number of bars/smiles:', {
        parentCircle: !!parentCircle,
        childCircle1: !!childCircle1,
        childCircle2: !!childCircle2,
        container: !!container,
        mentalHealth: !!mentalHealth,
        percentage: !!percentage,
        progressBar: !!progressBar,
        mood: !!mood,
        emoji: !!emoji,
        bars: bars.length,
        smiles: smiles.length,
      });
      return;
    }

    // Set initial states
    gsap.set(parentCircle, { scale: 0, transformOrigin: "center center" });
    gsap.set([childCircle1, childCircle2], { x: 0, y: 0 });
    gsap.set(mentalHealth, { scale: 0, transformOrigin: "center center" });
    gsap.set(progressBar, { width: "0%" });
    gsap.set(mood, { scale: 0, transformOrigin: "center center" });
    gsap.set(emoji, { scale: 0, opacity: 0, transformOrigin: "center center" });
    gsap.set(smiles, { scale: 0, transformOrigin: "center center" });
    gsap.set(bars, { height: 0, transformOrigin: "bottom center" });

    // Create a GSAP timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 80%",
        once: true,
        markers: true,
        onEnter: () => console.log('ScrollTrigger entered'),
      },
      defaults: { ease: "power2.out", duration: 1.5 },
    });

    // Animate parent circle to full size
    tl.to(parentCircle, {
      scale: 1,
      onComplete: () => console.log('Parent circle animation complete'),
    });

    // Animate child circles to their final positions
    tl.to(
      childCircle1,
      { x: 220, y: 80, duration: 1.5 },
      0
    ).to(
      childCircle2,
      { x: -80, y: -220, duration: 1.5 },
      0
    );

    // Animate Mental Health section
    tl.to(mentalHealth, {
      scale: 1.20,
      duration: 1.5,
      onComplete: () => console.log('Mental Health section animation complete'),
    });

    // Animate percentage text
    tl.to(
      percentage,
      {
        textContent: 98.92,
        duration: 1.5,
        snap: { textContent: 0.01 },
        onUpdate: function () {
          if (percentage) {
            percentage.textContent = `${this.targets()[0].textContent}%`;
          }
        },
      },
      "<"
    );

    // Animate progress bar
    tl.to(
      progressBar,
      { width: "91.67%", duration: 1.5 },
      "<"
    );

    // Animate Mood section
    tl.to(
      mood,
      {
        scale: 1.8,
        duration: 1.5,
        onComplete: () => console.log('Mood section animation complete'),
      },
      "<"
    );

    // Animate Mood section bars
    tl.to(
      bars,
      {
        height: (index) => {
          const heights = [4, 12, 16, 24, 32, 28, 40, 24, 16, 20, 8, 4];
          return `${heights[index]}px`;
        },
        duration: 1.5,
        stagger: 0.1,
      },
      "<"
    );

    // Animate Emoji section - scale to 1.5 and make visible
    tl.to(
      emoji,
      {
        scale: 1.3,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => console.log('Emoji section animation complete'),
      },
      "<" // Align with mentalHealth, percentage, progressBar, mood, and bars
    );

    // Animate smiley emojis - pop-up effect
    tl.to(
      smiles,
      {
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=1.0" // Start slightly before Emoji section completes
    );

    // Cleanup
    return () => {
      console.log('Cleaning up GSAP animations');
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([
        parentCircle,
        childCircle1,
        childCircle2,
        mentalHealth,
        percentage,
        progressBar,
        mood,
        emoji,
        ...bars,
        ...smiles,
      ]);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen px-6 py-10">
      <div className="flex items-center justify-center">
        {/* Parent Circle */}
        <div
          ref={parentCircleRef}
          className="p-60 bg-[#FB8728] rounded-full"
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
        <div
          ref={mentalHealthRef}
          className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl translate-x-[70%] translate-y-[-95%] shadow-2xl"
        >
          <div className="flex flex-row items-center gap-10 justify-between w-full">
            <div
              className="font-unsaid font-extrabold rounded-full"
              style={{ color: "#251404A3", fontSize: "16px" }}
            >
              Mental Health
            </div>
            <Image
              src="/healthJourney/mental_health_bracket.svg"
              alt="Mental Health"
              width={32}
              height={32}
              className="w-5"
            />
          </div>
          <div
            ref={percentageRef}
            className="w-full font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "36px" }}
          >
            0%
          </div>
          <div className="w-full h-2 bg-[#E8DDD9] rounded-full relative">
            <div
              ref={progressBarRef}
              className="absolute h-2 bg-[#F4A258] rounded-full"
            ></div>
          </div>
        </div>

        {/* Mood */}
        <div
          ref={moodRef}
          className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl translate-x-[-175%] translate-y-[-30%] shadow-2xl"
        >
          <div className="flex flex-row items-center gap-2 w-full">
            <Image
              src="/healthJourney/mood_icon.svg"
              alt="Mood"
              width={32}
              height={32}
              className="w-3.5"
            />
            <div
              className="font-unsaid font-extrabold rounded-full"
              style={{ color: "#251404A3", fontSize: "12px" }}
            >
              Mood
            </div>
          </div>
          <div
            className="w-full font-unsaid font-extrabold"
            style={{ color: "#A1CDD9", fontSize: "24px" }}
          >
            Sad
          </div>
          <div className="flex flex-row items-end gap-0.5">
            <div ref={(el) => setBarRef(el, 0)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 1)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 2)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 3)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 4)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 5)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 6)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 7)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 8)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 9)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 10)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
            <div ref={(el) => setBarRef(el, 11)} className="w-1 bg-[#ACA9A5] rounded-full"></div>
          </div>
        </div>

        {/* Emoji */}
        <div
          ref={emojiRef}
          className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl translate-x-[-50%] translate-y-[220%] shadow-2xl"
        >
          <div className="flex flex-row items-center gap-10 justify-between w-full">
            <div
              className="font-unsaid font-extrabold"
              style={{ color: "#A1CDD9", fontSize: "12px" }}
            >
              Mood History
            </div>
            <Image
              src="/healthJourney/mood_header_image.svg"
              alt="Mood History"
              width={32}
              height={32}
              className="w-3"
            />
          </div>
          <div className="flex flex-row gap-3 w-full">
            <div ref={(el) => setSmileRef(el, 0)} className="flex flex-col items-center gap-1">
              <Image
                src="/healthJourney/smile_1.svg"
                alt="Mood"
                width={32}
                height={32}
                className="w-3.5"
              />
              <div
                className="font-unsaid font-bold"
                style={{ color: "#A1CDD9", fontSize: "9px" }}
              >
                Mon
              </div>
            </div>
            <div ref={(el) => setSmileRef(el, 1)} className="flex flex-col items-center gap-1">
              <Image
                src="/healthJourney/smile_2.svg"
                alt="Mood"
                width={32}
                height={32}
                className="w-3.5"
              />
              <div
                className="font-unsaid font-bold"
                style={{ color: "#A1CDD9", fontSize: "9px" }}
              >
                Tue
              </div>
            </div>
            <div ref={(el) => setSmileRef(el, 2)} className="flex flex-col items-center gap-1">
              <Image
                src="/healthJourney/smile_3.svg"
                alt="Mood"
                width={32}
                height={32}
                className="w-3.5"
              />
              <div
                className="font-unsaid font-bold"
                style={{ color: "#A1CDD9", fontSize: "9px" }}
              >
                Wed
              </div>
            </div>
            <div ref={(el) => setSmileRef(el, 3)} className="flex flex-col items-center gap-1">
              <Image
                src="/healthJourney/smile_1.svg"
                alt="Mood"
                width={32}
                height={32}
                className="w-3.5"
              />
              <div
                className="font-unsaid font-bold"
                style={{ color: "#A1CDD9", fontSize: "9px" }}
              >
                Thu
              </div>
            </div>
            <div ref={(el) => setSmileRef(el, 4)} className="flex flex-col items-center gap-1">
              <Image
                src="/healthJourney/smile_4.svg"
                alt="Mood"
                width={32}
                height={32}
                className="w-3.5"
              />
              <div
                className="font-unsaid font-bold"
                style={{ color: "#A1CDD9", fontSize: "9px" }}
              >
                Fri
              </div>
            </div>
            <div ref={(el) => setSmileRef(el, 5)} className="flex flex-col items-center gap-1">
              <Image
                src="/healthJourney/smile_5.svg"
                alt="Mood"
                width={32}
                height={32}
                className="w-3.5"
              />
              <div
                className="font-unsaid font-bold"
                style={{ color: "#A1CDD9", fontSize: "9px" }}
              >
                Sat
              </div>
            </div>
            <div ref={(el) => setSmileRef(el, 6)} className="flex flex-col items-center gap-1">
              <Image
                src="/healthJourney/smile_1.svg"
                alt="Mood"
                width={32}
                height={32}
                className="w-3.5"
              />
              <div
                className="font-unsaid font-bold"
                style={{ color: "#A1CDD9", fontSize: "9px" }}
              >
                Sun
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealingJourney;