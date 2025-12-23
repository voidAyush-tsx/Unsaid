"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface CalmSpaceProps {
  onClose: () => void;
}

export default function CalmSpace({ onClose }: CalmSpaceProps) {
  // Bird animation variants
  const birdVariants: Variants = {
    initial: { x: -100, y: 100, opacity: 0 },
    animate: (custom: number) => ({
      x: "120vw",
      y: [100 + custom * 20, 80 + custom * 20, 120 + custom * 20, 100 + custom * 20],
      opacity: 1,
      transition: {
        x: {
          duration: 15 + custom * 5,
          repeat: Infinity,
          ease: "linear",
          delay: custom * 2,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5 },
      },
    }),
  };

  // Tree sway animation
  const treeVariants: Variants = {
    sway: (custom: number) => ({
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 4 + custom,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#A1CDD9] to-[#E0F7FA] overflow-hidden">
      {/* YouTube Audio (Hidden) */}
      <div className="hidden">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/lFcSrYw-ARY?autoplay=1&loop=1&playlist=lFcSrYw-ARY&controls=0"
          title="Calm Space Audio"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600 group-hover:text-[#FB8728]"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Content Overlay */}
      <div className="absolute top-1/4 left-0 right-0 text-center z-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-unsaid font-bold text-white drop-shadow-md mb-4">
            Breathe & Relax
          </h2>
          <p className="text-xl text-white/90 font-medium drop-shadow-sm">
            Take a moment for yourself in this calm space.
          </p>
        </motion.div>
      </div>

      {/* Sun */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-[#FDB813] rounded-full blur-xl opacity-80"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.6, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Birds */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`bird-${i}`}
          custom={i}
          variants={birdVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-0 w-8 h-8 text-white/80"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.435 2.582a1.933 1.933 0 00-1.93-.503L3.408 6.759a1.92 1.92 0 00-1.384 1.522c-.142.75.355 1.704 1.003 2.102l5.033 3.094a1.304 1.304 0 001.61-.194l5.763-5.799a.734.734 0 011.06 0c.29.292.29.765 0 1.067l-5.773 5.8c-.427.428-.508 1.1-.193 1.62l3.075 5.083c.36.604.98.946 1.66.946.08 0 .17 0 .251-.01.78-.1 1.4-.63 1.63-1.39l4.773-16.075c.21-.685.02-1.43-.48-1.943z" />
          </svg>
        </motion.div>
      ))}

      {/* Trees Layer 1 (Back) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-around opacity-60 z-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`tree-back-${i}`}
            custom={i}
            variants={treeVariants}
            animate="sway"
            className="origin-bottom"
            style={{ marginBottom: -20 }}
          >
            <svg width="100" height="200" viewBox="0 0 100 200" fill="none">
              <path d="M50 0L90 150H10L50 0Z" fill="#5D8C76" />
              <rect x="45" y="150" width="10" height="50" fill="#4A3B32" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Trees Layer 2 (Front) */}
      <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between px-10 z-20">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={`tree-front-${i}`}
            custom={i + 5}
            variants={treeVariants}
            animate="sway"
            className="origin-bottom"
            style={{ marginBottom: -10 }}
          >
            <svg width="120" height="240" viewBox="0 0 120 240" fill="none">
              <path d="M60 0C60 0 120 120 120 180H0C0 120 60 0 60 0Z" fill="#7AA06F" />
              <rect x="52" y="180" width="16" height="60" fill="#5D4037" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#8BC34A] z-30">
        <div className="w-full h-full relative overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`grass-${i}`}
              className="absolute bottom-0 w-4 h-12 bg-[#7CB342] rounded-t-full"
              style={{ left: `${i * 5}%` }}
              animate={{ skewX: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
