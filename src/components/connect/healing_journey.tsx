"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Production‑ready, DRY, and scalable animation implementation
 * Key changes vs. original
 * 1) Fewer refs – one container ref per section; query scoped elements with gsap.context
 * 2) gsap.context for automatic cleanup + SSR safety
 * 3) useLayoutEffect for layout‑sensitive animations
 * 4) Shared helpers (number tween, bar heights, orbit sync)
 * 5) Consistent ScrollTrigger config and no dev markers in prod
 * 6) Smaller surface for bugs and easier maintenance
 */

const BAR_HEIGHTS = [4, 12, 16, 24, 32, 28, 40, 24, 16, 20, 8, 4];

// ---- Helpers --------------------------------------------------------------
function tweenNumber(el: Element, to: number, {
  duration = 1,
  snap = 1,
  prefix = "",
  suffix = "",
}: { duration?: number; snap?: number; prefix?: string; suffix?: string } = {}) {
  return gsap.to(el as unknown as {}, {
    textContent: to,
    duration,
    snap: { textContent: snap },
    onUpdate: function () {
      const t = this.targets?.()[0] as HTMLElement | undefined;
      if (t) t.textContent = `${prefix}${Math.round(Number((t as any).textContent))}${suffix}`;
    },
  });
}

function radians(deg: number) {
  return (deg * Math.PI) / 180;
}

/**
 * Orbit children once while parent scales up. Eased progress ensures natural slow‑down.
 */
function syncOrbit(
  tl: gsap.core.Timeline,
  parent: Element,
  children: Array<{ el: Element; finalX: number; finalY: number }>,
  {
    duration = 1,
    revolutions = 0.5,
    ease = "power2.out",
  }: { duration?: number; revolutions?: number; ease?: string } = {}
) {
  // Precompute polar coordinates for each child
  const polar = children.map(({ finalX, finalY }) => {
    const r = Math.hypot(finalX, finalY);
    const finalAngle = Math.atan2(finalY, finalX) * (180 / Math.PI);
    const startAngle = finalAngle - 360 * revolutions;
    return { r, finalAngle, startAngle };
  });

  tl.to(parent, {
    scale: 1,
    duration,
    ease,
    onUpdate: function () {
      // eased ratio aligns child motion with parent growth
      const eased = (this as any).ratio as number;
      children.forEach(({ el }, i) => {
        const { r, startAngle } = polar[i];
        const angle = startAngle + 360 * revolutions * eased;
        gsap.set(el, {
          x: r * eased * Math.cos(radians(angle)),
          y: r * eased * Math.sin(radians(angle)),
        });
      });
    },
  });
}

// ---- Component ------------------------------------------------------------
const HealingJourney: React.FC = () => {
  // One ref per section for scoping + cleanup
  const healRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!healRef.current) return;

    const ctx = gsap.context(() => {
      // --- Scope all selectors to healRef ---
      const parent = gsap.utils.toArray<HTMLElement>('[data-heal="parent"]')[0];
      const child1 = gsap.utils.toArray<HTMLElement>('[data-heal="child1"]')[0];
      const child2 = gsap.utils.toArray<HTMLElement>('[data-heal="child2"]')[0];

      const mental = gsap.utils.toArray<HTMLElement>('[data-heal="mental"]')[0];
      const pct = gsap.utils.toArray<HTMLElement>('[data-heal="pct"]')[0];
      const bar = gsap.utils.toArray<HTMLElement>('[data-heal="bar"]')[0];

      const mood = gsap.utils.toArray<HTMLElement>('[data-heal="mood"]')[0];
      const emoji = gsap.utils.toArray<HTMLElement>('[data-heal="emoji"]')[0];
      const bars = gsap.utils.toArray<HTMLElement>('[data-heal="meter-bar"]');
      const smiles = gsap.utils.toArray<HTMLElement>('[data-heal="smile"]');

      // Initial state (set only what will be animated)
      gsap.set(parent, { scale: 0, transformOrigin: "center center" });
      gsap.set([child1, child2], { x: 0, y: 0 });

      gsap.set([mental, mood], { scale: 0, transformOrigin: "center center" });
      gsap.set(emoji, { scale: 0, opacity: 0, transformOrigin: "center center" });
      gsap.set(bars, { height: 0, transformOrigin: "bottom center" });
      gsap.set(bar, { width: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: healRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power2.out", duration: 1 },
      });

      // Parent scale + children translate (no orbit here)
      tl.to(parent, { scale: 1 });
      tl.to(child1, { x: 220, y: 80 }, 0)
        .to(child2, { x: -80, y: -220 }, 0);

      // Mental health card
      tl.to(mental, { scale: 1.2 });
      // % text and progress bar in parallel
      tl.to(bar, { width: "91.67%" }, "<");
      tl.to(pct, {
        textContent: 98.92,
        duration: 1,
        snap: { textContent: 0.01 },
        onUpdate() {
          const t = (this as any).targets?.()[0] as HTMLElement | undefined;
          if (t) t.textContent = `${Number(t.textContent).toFixed(2)}%`;
        },
      }, "<");

      // Mood + bars + emoji pop
      tl.to(mood, { scale: 1.8 }, "<");
      tl.to(
        bars,
        {
          height: (i) => `${BAR_HEIGHTS[i] || 8}px`,
          stagger: 0.06,
        },
        "<"
      );
      tl.to(
        emoji,
        { scale: 1.3, opacity: 1, ease: "elastic.out(1, 0.5)" },
        "<"
      );
      tl.to(smiles, { scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }, "-=0.6");
    }, healRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!connectRef.current) return;

    const ctx = gsap.context(() => {
      const parent = gsap.utils.toArray<HTMLElement>('[data-connect="parent"]')[0];
      const c1 = gsap.utils.toArray<HTMLElement>('[data-connect="c1"]')[0];
      const c2 = gsap.utils.toArray<HTMLElement>('[data-connect="c2"]')[0];

      const card = gsap.utils.toArray<HTMLElement>('[data-connect="card"]')[0];
      const stars = gsap.utils.toArray<HTMLElement>('[data-connect="star"]');
      const users = gsap.utils.toArray<HTMLElement>('[data-connect="users"]')[0];

      // Initials
      gsap.set(parent, { scale: 0, transformOrigin: "center center" });
      gsap.set([c1, c2], { x: 0, y: 0 });
      gsap.set(card, { scale: 0, opacity: 0 });
      gsap.set(stars, { scale: 0 });
      gsap.set(users, { textContent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: connectRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power2.out", duration: 1 },
      });

      // Parent + children synced orbit
      syncOrbit(tl, parent, [
        { el: c1, finalX: 232, finalY: 64 },
        { el: c2, finalX: -224, finalY: -80 },
      ], { duration: 1, revolutions: 0.5, ease: "power2.out" });

      tl.to(card, { scale: 1, opacity: 1, ease: "elastic.out(1, 0.5)" });
      tl.to(stars, { scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }, ">");
      tl.add(() => { tweenNumber(users, 241, { suffix: " users" }); });
    }, connectRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!growRef.current) return;

    const ctx = gsap.context(() => {
      const parent = gsap.utils.toArray<HTMLElement>('[data-grow="parent"]')[0];
      const g1 = gsap.utils.toArray<HTMLElement>('[data-grow="g1"]')[0];
      const g2 = gsap.utils.toArray<HTMLElement>('[data-grow="g2"]')[0];

      const streak = gsap.utils.toArray<HTMLElement>('[data-grow="streak"]')[0];
      const streakNum = gsap.utils.toArray<HTMLElement>('[data-grow="streak-num"]')[0];
      const badges = gsap.utils.toArray<HTMLElement>('[data-grow="badge"]');

      // Initials
      gsap.set(parent, { scale: 0 });
      gsap.set([g1, g2], { x: 0, y: 0 });
      gsap.set(streak, { scale: 0 });
      gsap.set(badges, { scale: 0 });
      gsap.set(streakNum, { textContent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: growRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power2.out", duration: 1 },
      });

      tl.to(parent, { scale: 1 });
      tl.to(g1, { x: -224, y: 80 }, 0).to(g2, { x: 240, y: 32 }, 0);
      tl.to(streak, { scale: 1, ease: "elastic.out(1, 0.5)" });
      tl.add(() => { tweenNumber(streakNum, 64); });
      tl.to(badges, { scale: 1, ease: "elastic.out(1, 0.5)", stagger: 0.2 }, "<");
    }, growRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen px-6 py-10 space-y-24">
      {/* ANALYSE */}
      <div ref={healRef} className="relative flex items-center justify-center">
        {/* Parent + children */}
        <div data-heal="parent" className="p-60 bg-[#FB8728] rounded-full" />
        <div data-heal="child1" className="p-8 bg-[#FB8728] absolute rounded-full border-8 border-white" />
        <div data-heal="child2" className="p-8 bg-[#FB8728] absolute rounded-full border-8 border-white" />

        {/* Mental Health card */}
        <div
          data-heal="mental"
          className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl translate-x-[70%] -translate-y-[95%] shadow-2xl"
        >
          <div className="flex items-center gap-10 justify-between w-full">
            <div className="font-unsaid font-extrabold rounded-full" style={{ color: "#251404A3", fontSize: 16 }}>
              Mental Health
            </div>
            <Image src="/healthJourney/mental_health_bracket.svg" alt="Mental Health" width={32} height={32} className="w-5" />
          </div>
          <div data-heal="pct" className="w-full font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 36 }}>0%</div>
          <div className="w-full h-2 bg-[#E8DDD9] rounded-full relative">
            <div data-heal="bar" className="absolute h-2 bg-[#F4A258] rounded-full" />
          </div>
        </div>

        {/* Mood */}
        <div
          data-heal="mood"
          className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl -translate-x-[175%] -translate-y-[30%] shadow-2xl"
        >
          <div className="flex items-center gap-2 w-full">
            <Image src="/healthJourney/mood_icon.svg" alt="Mood" width={32} height={32} className="w-3.5" />
            <div className="font-unsaid font-extrabold rounded-full" style={{ color: "#251404A3", fontSize: 12 }}>Mood</div>
          </div>
          <div className="w-full font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 24 }}>Sad</div>
          <div className="flex items-end gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} data-heal="meter-bar" className="w-1 bg-[#ACA9A5] rounded-full" />
            ))}
          </div>
        </div>

        {/* Emoji history */}
        <div
          data-heal="emoji"
          className="flex flex-col gap-2 absolute bg-white p-4 rounded-3xl -translate-x-[50%] translate-y-[220%] shadow-2xl"
        >
          <div className="flex items-center gap-10 justify-between w-full">
            <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 12 }}>Mood History</div>
            <Image src="/healthJourney/mood_header_image.svg" alt="Mood History" width={32} height={32} className="w-3" />
          </div>
          <div className="flex gap-3 w-full">
            {[
              { src: "/healthJourney/smile_1.svg", day: "Mon" },
              { src: "/healthJourney/smile_2.svg", day: "Tue" },
              { src: "/healthJourney/smile_3.svg", day: "Wed" },
              { src: "/healthJourney/smile_1.svg", day: "Thu" },
              { src: "/healthJourney/smile_4.svg", day: "Fri" },
              { src: "/healthJourney/smile_5.svg", day: "Sat" },
              { src: "/healthJourney/smile_1.svg", day: "Sun" },
            ].map((s, i) => (
              <div key={s.day} data-heal="smile" className="flex flex-col items-center gap-1 scale-0">
                <Image src={s.src} alt="Mood" width={32} height={32} className="w-3.5" />
                <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 9 }}>{s.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONNECT */}
      <div ref={connectRef} className="relative flex items-center justify-center">
        <div data-connect="parent" className="p-60 bg-[#F4A258] rounded-full" />
        <div data-connect="c1" className="p-8 bg-[#F4A258] absolute rounded-full border-8 border-white" />
        <div data-connect="c2" className="p-12 bg-[#F4A258] absolute rounded-full border-8 border-white" />

        <div data-connect="card" className="p-4 gap-4 flex flex-row absolute translate-x-36 -translate-y-24 rounded-3xl bg-white shadow-2xl">
          <div className="relative w-[100px] h-[100px] overflow-hidden rounded-2xl">
            <Image src="/counsellors/counsellor.png" alt="Counsellor" fill className="object-cover object-top" sizes="150px" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-10 justify-between w-full">
                <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 18 }}>Dr. Priya Sharma</div>
                <Image src="/healthJourney/verified.svg" alt="Verified" width={32} height={32} className="w-5" />
              </div>
              <div className="flex items-center gap-10 justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image src="/healthJourney/job_icon.svg" alt="Job" width={32} height={32} className="w-4" />
                  <div className="font-unsaid font-bold" style={{ color: "#736B66", fontSize: 14 }}>Psychologist</div>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/healthJourney/location.svg" alt="Location" width={32} height={32} className="w-4" />
                  <div className="font-unsaid font-bold" style={{ color: "#736B66", fontSize: 14 }}>1.1 km</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center mb-0.5 gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} data-connect="star">
                      <Image src="/healthJourney/rated_star.svg" alt="Rate" width={32} height={32} className="w-4" />
                    </div>
                  ))}
                  <div data-connect="star">
                    <Image src="/healthJourney/blank_star.svg" alt="Rate" width={32} height={32} className="w-4" />
                  </div>
                </div>
                <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 14 }}>4.1</div>
              </div>
              <div className="w-0.5 h-full bg-[#E8DDD9]" />
              <div data-connect="users" className="font-unsaid font-semibold" style={{ color: "#ACA9A5", fontSize: 14 }}>0 users</div>
            </div>
          </div>
        </div>
      </div>

      {/* GROW */}
      <div ref={growRef} className="relative flex items-center justify-center">
        <div data-grow="parent" className="p-60 bg-[#A1CDD9] rounded-full" />
        <div data-grow="g1" className="p-8 bg-[#A1CDD9] absolute rounded-full border-8 border-white" />
        <div data-grow="g2" className="p-10 bg-[#A1CDD9] absolute rounded-full border-8 border-white" />

        <div data-grow="streak" className="p-4 gap-4 flex flex-row items-center absolute translate-x-32 translate-y-36 rounded-3xl bg-white shadow-2xl">
          <div className="bg-[#F7F4F2] rounded-full h-fit p-5">
            <Image src="/healthJourney/doc_icon.svg" alt="Journal" width={16} height={20} className="w-4" />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="font-unsaid font-extrabold" style={{ color: "#A1CDD9", fontSize: 18 }}>Mindful Journal</div>
            <div className="font-unsaid font-semibold" style={{ color: "#736B66", fontSize: 16 }}>
              <span data-grow="streak-num">0</span> Day Streak
            </div>
          </div>
          <Image src="/healthJourney/streak_icon.svg" alt="Streak" width={60} height={60} className="w-14" />
        </div>

        <div data-grow="badge" className="flex flex-row px-6 py-4 gap-4 bg-white absolute translate-x-36 -translate-y-12 rounded-4xl shadow-2xl">
          <Image src="/healthJourney/star_grow.svg" alt="Meditation" width={24} height={24} className="w-6" />
          <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 18 }}>Positive</div>
        </div>
        <div data-grow="badge" className="flex flex-row px-6 py-4 gap-4 bg-white absolute -translate-x-36 -translate-y-8 rounded-4xl shadow-2xl">
          <Image src="/healthJourney/smile_grow.svg" alt="Meditation" width={24} height={24} className="w-6" />
          <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 18 }}>Fun</div>
        </div>
        <div data-grow="badge" className="flex flex-row px-6 py-4 gap-4 bg-white absolute -translate-x-52 -translate-y-28 rounded-4xl shadow-2xl">
          <Image src="/healthJourney/supportive_grow.svg" alt="Meditation" width={24} height={24} className="w-6" />
          <div className="font-unsaid font-bold" style={{ color: "#A1CDD9", fontSize: 18 }}>Supportive</div>
        </div>
      </div>
    </div>
  );
};

export default HealingJourney;