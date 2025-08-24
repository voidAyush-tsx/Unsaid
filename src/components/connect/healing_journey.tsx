"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once (safe in module scope)
gsap.registerPlugin(ScrollTrigger);

/**
 * Production optimizations applied:
 * - gsap.context for scoped selectors & auto‑cleanup
 * - useLayoutEffect for layout-sensitive animations
 * - Data attributes instead of dozens of refs
 * - Shared helpers: number tween, bar heights, orbit sync
 * - ScrollTrigger "once" per section; reduced allocations
 * - Respect prefers-reduced-motion
 */

const BAR_HEIGHTS = [4, 12, 16, 24, 32, 28, 40, 24, 16, 20, 8, 4];

function tweenNumber(el: Element | null, to: number, opts?: { suffix?: string; duration?: number; snap?: number }) {
  if (!el) return;
  const { suffix = "", duration = 1, snap = 1 } = opts || {};
  const obj = { value: 0 };
  gsap.to(obj, {
    value: to,
    duration,
    snap: { value: snap },
    onUpdate: () => {
      (el as HTMLElement).textContent = `${Math.round(obj.value)}${suffix}`;
    },
  });
}

function tweenDecimal(el: Element | null, to: number, opts?: { suffix?: string; duration?: number; snap?: number }) {
  if (!el) return;
  const { suffix = "", duration = 1, snap = 0.01 } = opts || {};
  const obj = { value: 0 };
  gsap.to(obj, {
    value: to,
    duration,
    snap: { value: snap },
    onUpdate: () => {
      (el as HTMLElement).textContent = `${obj.value.toFixed(2)}${suffix}`;
    },
  });
}

export default function HealingJourney() {
  // Section roots only
  const healRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    // Reduced-motion: jump to end states
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const healCtx = gsap.context((self) => {
        const q = self.selector!;
        gsap.set(q('[data-el="parent"]'), { scale: 1 });
        gsap.set([q('[data-el="child1"]'), q('[data-el="child2"]')], { x: (i) => (i === 0 ? 220 : -80), y: (i) => (i === 0 ? 80 : -220) });
        gsap.set(q('[data-el="mental"]'), { scale: 1 });
        gsap.set(q('[data-el="progress"]'), { width: "91.67%" });
        gsap.set(q('[data-el="mood"]'), { scale: 1.8 });
        gsap.set(q('[data-el="emoji"]'), { scale: 1.3, opacity: 1 });
        gsap.set(q('[data-bar]'), { height: (i: number) => `${BAR_HEIGHTS[i]}px` });
        gsap.set(q('[data-smile]'), { scale: 1 });
        const pct = q('[data-num="percent"]')[0];
        const users = q('[data-num="users"]')[0];
        const streakNum = q('[data-num="streak"]')[0];
        if (pct) (pct as HTMLElement).textContent = `98.92%`;
        if (users) (users as HTMLElement).textContent = `241 users`;
        if (streakNum) (streakNum as HTMLElement).textContent = `64`;
      }, healRef);
      const connCtx = gsap.context((self) => {
        const q = self.selector!;
        gsap.set(q('[data-el="parent"]'), { scale: 1 });
        gsap.set([q('[data-el="child1"]'), q('[data-el="child2"]')], { x: (i) => (i === 0 ? 232 : -224), y: (i) => (i === 0 ? 64 : -80) });
        gsap.set(q('[data-el="card"]'), { scale: 1, opacity: 1 });
        gsap.set(q('[data-star]'), { scale: 1 });
      }, connectRef);
      const growCtx = gsap.context((self) => {
        const q = self.selector!;
        gsap.set(q('[data-el="parent"]'), { scale: 1 });
        gsap.set([q('[data-el="child1"]'), q('[data-el="child2"]')], { x: (i) => (i === 0 ? -224 : 240), y: (i) => (i === 0 ? 80 : 32) });
        gsap.set(q('[data-el="streak"]'), { scale: 1 });
        gsap.set(q('[data-badge]'), { scale: 1 });
      }, growRef);
      return () => {
        healCtx.revert();
        connCtx.revert();
        growCtx.revert();
      };
    });

    // Default motion animations
    const healCtx = gsap.context((self) => {
      const q = self.selector!;

      // Initial
      gsap.set(q('[data-el="parent"]'), { scale: 0, transformOrigin: "center center" });
      gsap.set([q('[data-el="child1"]'), q('[data-el="child2"]')], { x: 0, y: 0 });
      gsap.set(q('[data-el="mental"]'), { scale: 0 });
      gsap.set(q('[data-el="progress"]'), { width: "0%" });
      gsap.set(q('[data-el="mood"]'), { scale: 0 });
      gsap.set(q('[data-el="emoji"]'), { scale: 0, opacity: 0 });
      gsap.set(q('[data-smile]'), { scale: 0 });
      gsap.set(q('[data-bar]'), { height: 0, transformOrigin: "bottom center" });

      // Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
        scrollTrigger: { trigger: healRef.current, start: "top 80%", once: true },
      });

      // Parent + children orbits in a single tween using onUpdate
      const final1 = { x: 220, y: 80 };
      const final2 = { x: -80, y: -220 };
      const rev = 0.5; // half revolution
      const r1 = Math.hypot(final1.x, final1.y), a1 = Math.atan2(final1.y, final1.x);
      const r2 = Math.hypot(final2.x, final2.y), a2 = Math.atan2(final2.y, final2.x);
      const startA1 = a1 - Math.PI * 2 * rev;
      const startA2 = a2 - Math.PI * 2 * rev;

      tl.to(q('[data-el="parent"]'), {
        scale: 1,
        onUpdate: function () {
          const eased = (this as any).ratio as number;
          const ang1 = startA1 + Math.PI * 2 * rev * eased;
          const ang2 = startA2 + Math.PI * 2 * rev * eased;
          gsap.set(q('[data-el="child1"]'), { x: r1 * eased * Math.cos(ang1), y: r1 * eased * Math.sin(ang1) });
          gsap.set(q('[data-el="child2"]'), { x: r2 * eased * Math.cos(ang2), y: r2 * eased * Math.sin(ang2) });
        },
      })
        .to(q('[data-el="mental"]'), { scale: 1.2 })
        .to(q('[data-el="mood"]'), { scale: 1.8 }, "<")
        .to(q('[data-el="emoji"]'), { scale: 1.3, opacity: 1, ease: "elastic.out(1,0.5)" }, "<")
        .to(q('[data-bar]'), { height: (i: number) => `${BAR_HEIGHTS[i]}px`, stagger: 0.08 }, "<")
        .to(q('[data-smile]'), { scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }, "-=0.8")
        .to(q('[data-el="progress"]'), { width: "91.67%" }, "<")
        .add(() => {
          const pct = q('[data-num="percent"]')[0];
          tweenDecimal(pct, 98.92, { suffix: "%", duration: 1, snap: 0.01 });
        }, "<");
    }, healRef);

    const connectCtx = gsap.context((self) => {
      const q = self.selector!;
      gsap.set(q('[data-el="parent"]'), { scale: 0 });
      gsap.set([q('[data-el="child1"]'), q('[data-el="child2"]')], { x: 0, y: 0 });
      gsap.set(q('[data-el="card"]'), { scale: 0, opacity: 0 });
      gsap.set(q('[data-star]'), { scale: 0 });
      gsap.set(q('[data-num="users"]'), { textContent: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
        scrollTrigger: { trigger: connectRef.current, start: "top 80%", once: true },
      });

      const final1 = { x: 232, y: 64 };
      const final2 = { x: -224, y: -80 };
      const rev = 0.5;
      const r1 = Math.hypot(final1.x, final1.y), a1 = Math.atan2(final1.y, final1.x);
      const r2 = Math.hypot(final2.x, final2.y), a2 = Math.atan2(final2.y, final2.x);
      const startA1 = a1 - Math.PI * 2 * rev;
      const startA2 = a2 - Math.PI * 2 * rev;

      tl.to(q('[data-el="parent"]'), {
        scale: 1,
        onUpdate: function () {
          const eased = (this as any).ratio as number;
          const ang1 = startA1 + Math.PI * 2 * rev * eased;
          const ang2 = startA2 + Math.PI * 2 * rev * eased;
          gsap.set(q('[data-el="child1"]'), { x: r1 * eased * Math.cos(ang1), y: r1 * eased * Math.sin(ang1) });
          gsap.set(q('[data-el="child2"]'), { x: r2 * eased * Math.cos(ang2), y: r2 * eased * Math.sin(ang2) });
        },
      })
        .to(q('[data-el="card"]'), { scale: 1, opacity: 1, ease: "elastic.out(1,0.5)" })
        .to(q('[data-star]'), { scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }, "<")
        .add(() => {
          const users = q('[data-num="users"]')[0];
          tweenNumber(users, 241, { suffix: " users", duration: 1, snap: 1 });
        }, "<");
    }, connectRef);

    const growCtx = gsap.context((self) => {
      const q = self.selector!;
      gsap.set(q('[data-el="parent"]'), { scale: 0 });
      gsap.set([q('[data-el="child1"]'), q('[data-el="child2"]')], { x: 0, y: 0 });
      gsap.set(q('[data-el="streak"]'), { scale: 0 });
      gsap.set(q('[data-badge]'), { scale: 0 });
      gsap.set(q('[data-num="streak"]'), { textContent: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
        scrollTrigger: { trigger: growRef.current, start: "top 80%", once: true },
      });

      tl.to(q('[data-el="parent"]'), { scale: 1 })
        .to(q('[data-el="child1"]'), { x: -224, y: 80 }, 0)
        .to(q('[data-el="child2"]'), { x: 240, y: 32 }, 0)
        .to(q('[data-el="streak"]'), { scale: 1, ease: "elastic.out(1,0.5)" })
        .to(q('[data-badge]'), { scale: 1, ease: "elastic.out(1,0.5)", stagger: 0.2 }, "<")
        .add(() => {
          const streakNum = q('[data-num="streak"]')[0];
          tweenNumber(streakNum, 64, { duration: 1, snap: 1 });
        }, "<");
    }, growRef);

    // Divider animation with moving circle
    const dividerCtx = gsap.context(() => {
      const containers = gsap.utils.toArray<HTMLElement>('[data-el="divider-container"]');

      containers.forEach((container, i) => {
        if (i === containers.length - 1) return; // last divider doesn't animate

        const progressEl = container.querySelector('[data-el="divider-progress"]') as HTMLElement;
        const circleEl = container.querySelector('[data-el="divider-circle"]') as HTMLElement;
        const nextContainer = containers[i + 1];

        const distance =
          nextContainer.getBoundingClientRect().top -
          container.getBoundingClientRect().top;

        // Animate progress fill
        gsap.to(progressEl, {
          height: distance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            endTrigger: nextContainer,
            end: "top center",
            scrub: true,
          },
        });

        // Animate circle traveling down
        gsap.to(circleEl, {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            endTrigger: nextContainer,
            end: "top center",
            scrub: true,
            onLeave: () => {
              // Lock circle at bottom
              gsap.set(circleEl, { y: distance });
            },
          },
        });
      });
    });

    return () => {
      healCtx.revert();
      connectCtx.revert();
      growCtx.revert();
      dividerCtx.revert();
      mm.revert();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen px-32 py-24 gap-64">


      {/* Step-1 */}
      <div className="flex flex-row justify-center gap-30 items-center w-full">
        {/* HEAL */}
        <div ref={healRef} className="flex items-center justify-center max-w-md">
          {/* Parent Circle */}
          <div data-el="parent" className="p-60 bg-[#FB8728] rounded-full" />

          {/* Child Circle 1 */}
          <div data-el="child1" className="p-6 bg-[#FB8728] absolute rounded-full border-8 border-white">
            <Image src="/healthJourney/circle_icons/analyze_icon_2.svg" alt="Child Circle 2" width={32} height={32} className="w-6" />
          </div>

          {/* Child Circle 2 */}
          <div data-el="child2" className="p-6 bg-[#FB8728] absolute rounded-full border-8 border-white">
            <Image src="/healthJourney/circle_icons/analyze_icon_1.svg" alt="Child Circle 1" width={32} height={32} className="w-6" />
          </div>

          {/* Mental Health */}
          <div data-el="mental" className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl translate-x-[70%] translate-y-[-95%] shadow-2xl">
            <div className="flex flex-row items-center gap-10 justify-between w-full">
              <div className="font-unsaid font-extrabold rounded-full" style={{ color: "#251404A3", fontSize: 16 }}>Mental Health</div>
              <Image src="/healthJourney/mental_health_bracket.svg" alt="Mental Health" width={32} height={32} className="w-5" />
            </div>
            <div data-num="percent" className="w-full font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 36 }}>0%</div>
            <div className="w-full h-2 bg-[#E8DDD9] rounded-full relative">
              <div data-el="progress" className="absolute h-2 bg-[#F4A258] rounded-full" />
            </div>
          </div>

          {/* Mood */}
          <div data-el="mood" className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl translate-x-[-175%] translate-y-[-30%] shadow-2xl">
            <div className="flex flex-row items-center gap-2 w-full">
              <Image src="/healthJourney/mood_icon.svg" alt="Mood" width={32} height={32} className="w-3.5" />
              <div className="font-unsaid font-extrabold rounded-full" style={{ color: "#251404A3", fontSize: 12 }}>Mood</div>
            </div>
            <div className="w-full font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 24 }}>Sad</div>
            <div className="flex flex-row items-end gap-0.5">
              {BAR_HEIGHTS.map((_, i) => (
                <div key={i} data-bar className="w-1 bg-[#ACA9A5] rounded-full" />
              ))}
            </div>
          </div>

          {/* Emoji */}
          <div data-el="emoji" className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl translate-x-[-50%] translate-y-[220%] shadow-2xl">
            <div className="flex flex-row items-center gap-10 justify-between w-full">
              <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 12 }}>Mood History</div>
              <Image src="/healthJourney/mood_header_image.svg" alt="Mood History" width={32} height={32} className="w-3" />
            </div>
            <div className="flex flex-row gap-3 w-full">
              {[
                { src: "/healthJourney/smile_1.svg", label: "Mon" },
                { src: "/healthJourney/smile_2.svg", label: "Tue" },
                { src: "/healthJourney/smile_3.svg", label: "Wed" },
                { src: "/healthJourney/smile_1.svg", label: "Thu" },
                { src: "/healthJourney/smile_4.svg", label: "Fri" },
                { src: "/healthJourney/smile_5.svg", label: "Sat" },
                { src: "/healthJourney/smile_1.svg", label: "Sun" },
              ].map((it, i) => (
                <div key={i} data-smile className="flex flex-col items-center gap-1">
                  <Image src={it.src} alt="Mood" width={32} height={32} className="w-3.5" />
                  <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 9 }}>{it.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div data-el="divider-container" className="relative h-full flex justify-center">
          {/* Background track */}
          <div className="absolute w-6 bg-[#F7F4F2] rounded-full h-full" />
          {/* Foreground progress */}
          <div data-el="divider-progress" className="absolute w-6 bg-[#F7F4F2] rounded-full h-0" />
          {/* Moving circle */}
          <div data-el="divider-circle" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#A1CDD9]" />
        </div>

        {/* Details */}
        <div className="flex flex-col items-start gap-8 max-w-md">
          <div
            className="font-unsaid font-bold py-2 px-5 rounded-3xl border-[#736B66] border-2 bg-transparent"
            style={{ color: "#736B66", fontSize: "16px" }}
          >
            Step One
          </div>
          <div className="flex flex-col items-start gap-6">
            <div
              className="font-unsaid font-bold"
              style={{ color: "#A1CDD9", fontSize: "48px" }}
            >
              Analyze
            </div>
            <div
              className="font-unsaid font-medium"
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              Identify what's weighing on you by selecting what's not making you smile and taking the Anxiety test to help you match you with the right counsellor.
            </div>
          </div>
          <div className="flex flex-row gap-4 py-4 px-8 items-center justify-center rounded-4xl bg-[#A1CDD9]">
            <div
              className="font-unsaid font-extrabold text-white"
              style={{ fontSize: "16px" }}
            >
              Take The Test
            </div>
            <Image
              src="/right_arrow.svg"
              alt="Arrow"
              width={32}
              height={32}
              className="w-6"
            />
          </div>
        </div>
      </div>


      {/* Step-2 */}
      <div className="flex flex-row justify-center gap-30 items-center w-full">

        {/* CONNECT */}
        <div ref={connectRef} className="flex items-center justify-center max-w-md">

          <div data-el="parent" className="p-60 bg-[#F4A258] rounded-full" />

          <div data-el="child1" className="p-6 bg-[#F4A258] absolute rounded-full border-8 border-white">
            <Image src="/healthJourney/circle_icons/connect_icon_2.svg" alt="Child Circle 2" width={32} height={32} className="w-6" />
          </div>

          <div data-el="child2" className="p-10 bg-[#F4A258] absolute rounded-full border-8 border-white">
            <Image src="/healthJourney/circle_icons/connect_icon_1.svg" alt="Child Circle 1" width={32} height={32} className="w-6" />
          </div>

          {/* Doctor Card */}
          <div data-el="card" className="p-4 gap-4 flex flex-row absolute translate-x-36 -translate-y-24 rounded-3xl bg-white shadow-2xl">
            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-2xl">
              <Image src="/counsellors/counsellor.png" alt="Counsellor" fill className="object-cover object-top" sizes="150px" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-10 justify-between w-full">
                  <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 18 }}>Dr. Priya Sharma</div>
                  <Image src="/healthJourney/verified.svg" alt="Verified" width={32} height={32} className="w-5" />
                </div>
                <div className="flex flex-row items-center gap-10 justify-between w-full">
                  <div className="flex flex-row items-center gap-2">
                    <Image src="/healthJourney/job_icon.svg" alt="Job" width={32} height={32} className="w-4" />
                    <div className="font-unsaid font-bold" style={{ color: "#736B66", fontSize: 14 }}>Psychologist</div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Image src="/healthJourney/location.svg" alt="Location" width={32} height={32} className="w-4" />
                    <div className="font-unsaid font-bold" style={{ color: "#736B66", fontSize: 14 }}>1.1 km</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-row items-center mb-0.5 gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} data-star>
                        <Image src="/healthJourney/rated_star.svg" alt="Rate" width={32} height={32} className="w-4" />
                      </div>
                    ))}
                    <div data-star>
                      <Image src="/healthJourney/blank_star.svg" alt="Rate" width={32} height={32} className="w-4" />
                    </div>
                  </div>
                  <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 14 }}>4.1</div>
                </div>
                <div className="w-0.5 h-full bg-[#E8DDD9]" />
                <div data-num="users" className="font-unsaid font-semibold" style={{ color: "#ACA9A5", fontSize: 14 }}>0 users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div data-el="divider-container" className="relative h-full flex justify-center">
          {/* Background track */}
          <div className="absolute w-6 bg-[#F7F4F2] rounded-full h-full" />
          {/* Foreground progress */}
          <div data-el="divider-progress" className="absolute w-6 bg-[#F7F4F2] rounded-full h-0 -z-1" />
          {/* Moving circle */}
          <div data-el="divider-circle" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#A1CDD9]" />
        </div>

        {/* Details */}
        <div className="flex flex-col items-start gap-8 max-w-md">
          <div
            className="font-unsaid font-bold py-2 px-5 rounded-3xl border-[#736B66] border-2 bg-transparent"
            style={{ color: "#736B66", fontSize: "16px" }}
          >
            Step Two
          </div>
          <div className="flex flex-col items-start gap-6">
            <div
              className="font-unsaid font-bold"
              style={{ color: "#A1CDD9", fontSize: "48px" }}
            >
              Connect
            </div>
            <div
              className="font-unsaid font-medium"
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              Choose how you want to communicate — audio, video, or chat — and start your session.
            </div>
          </div>
          <div className="flex flex-row gap-4 py-4 px-8 items-center justify-center rounded-4xl bg-[#A1CDD9]">
            <div
              className="font-unsaid font-extrabold text-white"
              style={{ fontSize: "16px" }}
            >
              Talk to a Counsellor
            </div>
            <Image
              src="/right_arrow.svg"
              alt="Arrow"
              width={32}
              height={32}
              className="w-6"
            />
          </div>
        </div>
      </div>
      

      {/* Step-3 */}
      <div className="flex flex-row justify-center gap-30 items-center w-full">
        {/* GROW */}
        <div ref={growRef} className="flex items-center justify-center max-w-md">
          <div data-el="parent" className="p-60 bg-[#A1CDD9] rounded-full" />

          <div data-el="child1" className="p-7 bg-[#A1CDD9] absolute rounded-full border-8 border-white">
            <Image src="/healthJourney/circle_icons/grow_icon_1.svg" alt="Child Circle 1" width={32} height={32} className="w-5" />
          </div>

          <div data-el="child2" className="py-9 px-8 bg-[#A1CDD9] absolute rounded-full border-8 border-white">
            <Image src="/healthJourney/circle_icons/grow_icon_2.svg" alt="Child Circle 2" width={32} height={32} className="w-8" />
          </div>

          {/* Streak */}
          <div data-el="streak" className="p-4 gap-4 flex flex-row items-center absolute translate-x-32 translate-y-36 rounded-3xl bg-white shadow-2xl">
            <div className="bg-[#F7F4F2] rounded-full h-fit p-5">
              <Image src="/healthJourney/doc_icon.svg" alt="Journal" width={16} height={20} className="w-4" />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 18 }}>Mindful Journal</div>
              <div className="font-unsaid font-semibold" style={{ color: "#736B66", fontSize: 16 }}>
                <span data-num="streak">0</span> Day Streak
              </div>
            </div>
            <Image src="/healthJourney/streak_icon.svg" alt="Streak" width={60} height={60} className="w-14" />
          </div>

          {/* Badges */}
          <div data-badge className="flex flex-row px-6 py-4 gap-4 bg-white absolute translate-x-32 -translate-y-20 rounded-4xl shadow-2xl">
            <Image src="/healthJourney/star_grow.svg" alt="Meditation" width={24} height={24} className="w-6" />
            <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 18 }}>Positive</div>
          </div>
          <div data-badge className="flex flex-row px-6 py-4 gap-4 bg-white absolute -translate-x-36 -translate-y-8 rounded-4xl shadow-2xl">
            <Image src="/healthJourney/smile_grow.svg" alt="Meditation" width={24} height={24} className="w-6" />
            <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 18 }}>Fun</div>
          </div>
          <div data-badge className="flex flex-row px-6 py-4 gap-4 bg-white absolute -translate-x-52 -translate-y-28 rounded-4xl shadow-2xl">
            <Image src="/healthJourney/supportive_grow.svg" alt="Meditation" width={24} height={24} className="w-6" />
            <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 18 }}>Supportive</div>
          </div>
        </div>

        {/* Divider */}
        <div data-el="divider-container" className="relative h-full flex justify-center">
          {/* Background track */}
          <div className="absolute w-6 bg-[#F7F4F2] rounded-full h-full" />
          {/* Foreground progress */}
          <div data-el="divider-progress" className="absolute w-6 bg-[#F7F4F2] rounded-full h-0" />
          {/* Moving circle */}
          <div data-el="divider-circle" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#A1CDD9]" />
        </div>

        {/* Details */}
        <div className="flex flex-col items-start gap-8 max-w-md">
          <div
            className="font-unsaid font-bold py-2 px-5 rounded-3xl border-[#736B66] border-2 bg-transparent"
            style={{ color: "#736B66", fontSize: "16px" }}
          >
            Step Three
          </div>
          <div className="flex flex-col items-start gap-6">
            <div
              className="font-unsaid font-bold"
              style={{ color: "#A1CDD9", fontSize: "48px" }}
            >
              Grow
            </div>
            <div
              className="font-unsaid font-medium"
              style={{ color: "#736B66", fontSize: "20px" }}
            >
              Work through your thoughts and feelings with expert support, one step at a time.
            </div>
          </div>
          <div className="flex flex-row gap-4 py-4 px-8 items-center justify-center rounded-4xl bg-[#A1CDD9]">
            <div
              className="font-unsaid font-extrabold text-white"
              style={{ fontSize: "16px" }}
            >
              Get In Touch
            </div>
            <Image
              src="/right_arrow.svg"
              alt="Arrow"
              width={32}
              height={32}
              className="w-6"
            />
          </div>
        </div>
      </div>


    </div>
  );
}