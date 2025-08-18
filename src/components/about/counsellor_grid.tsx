"use client";

import React from "react";
import Image from "next/image";

const counsellors = [
  {
    name: "Dr. Priya Sharma",
    title: "Licensed Clinical Psychologist | Anxiety, Depression, and Trauma Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Rohan Mehta",
    title: "Child and Adolescent Psychologist | ADHD & Learning Disorders Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Ananya Gupta",
    title: "Counselling Psychologist | Relationships, Stress, and Workplace Well-being",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Aarav Singh",
    title: "Clinical Psychologist | OCD, Bipolar Disorder, and Mood Therapy",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },

  {
    name: "Dr. Priya Sharma",
    title: "Licensed Clinical Psychologist | Anxiety, Depression, and Trauma Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Rohan Mehta",
    title: "Child and Adolescent Psychologist | ADHD & Learning Disorders Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Ananya Gupta",
    title: "Counselling Psychologist | Relationships, Stress, and Workplace Well-being",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Aarav Singh",
    title: "Clinical Psychologist | OCD, Bipolar Disorder, and Mood Therapy",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },

  {
    name: "Dr. Priya Sharma",
    title: "Licensed Clinical Psychologist | Anxiety, Depression, and Trauma Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Rohan Mehta",
    title: "Child and Adolescent Psychologist | ADHD & Learning Disorders Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Ananya Gupta",
    title: "Counselling Psychologist | Relationships, Stress, and Workplace Well-being",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Aarav Singh",
    title: "Clinical Psychologist | OCD, Bipolar Disorder, and Mood Therapy",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },

  {
    name: "Dr. Priya Sharma",
    title: "Licensed Clinical Psychologist | Anxiety, Depression, and Trauma Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Rohan Mehta",
    title: "Child and Adolescent Psychologist | ADHD & Learning Disorders Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Ananya Gupta",
    title: "Counselling Psychologist | Relationships, Stress, and Workplace Well-being",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Aarav Singh",
    title: "Clinical Psychologist | OCD, Bipolar Disorder, and Mood Therapy",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },

  {
    name: "Dr. Priya Sharma",
    title: "Licensed Clinical Psychologist | Anxiety, Depression, and Trauma Specialist",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Ananya Gupta",
    title: "Counselling Psychologist | Relationships, Stress, and Workplace Well-being",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
  {
    name: "Dr. Aarav Singh",
    title: "Clinical Psychologist | OCD, Bipolar Disorder, and Mood Therapy",
    img: "/counsellors/counsellor.png",
    socials: [
      { icon: "/counsellors/insta_icon_brown.svg", link: "/", alt: "Instagram" },
      { icon: "/counsellors/yt_icon_brown.svg", link: "/", alt: "YouTube" },
      { icon: "/counsellors/linkedin_icon_brown.svg", link: "/", alt: "LinkedIn" },
    ],
  },
];

// Reusable CounsellorCard component
const CounsellorCard: React.FC<typeof counsellors[0]> = ({ name, title, img, socials }) => {
  return (
    <div className="group flex flex-col items-start p-4 rounded-4xl gap-4 w-full bg-white hover:bg-[#A1CDD9] hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-[300px] w-full rounded-4xl overflow-hidden">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-start">
        <div
          className="font-unsaid font-extrabold text-[#A1CDD9] group-hover:text-white transition-all duration-300 cursor-pointer"
          style={{ fontSize: "20px" }}
          onClick={() => (window.location.href = "/")}
        >
          {name}
        </div>
        <div
          className="font-unsaid font-semibold"
          style={{ color: "#926247", fontSize: "12px" }}
        >
          {title}
        </div>
      </div>

      {/* Socials */}
      <div className="flex flex-row gap-4">
        {socials.map((s, idx) => (
          <Image
            key={idx}
            src={s.icon}
            alt={s.alt}
            width={48}
            height={48}
            className="rounded-full w-10 cursor-pointer p-2 bg-[#F7F4F2]"
            onClick={() => (window.location.href = s.link)}
          />
        ))}
      </div>
    </div>
  );
};

const Counsellor_Grid: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center m-5 rounded-4xl px-20 py-24 gap-12 bg-[#F7F4F2]">
      {/* Heading */}
      <div
        className="font-unsaid font-extrabold"
        style={{ color: "#A1CDD9", fontSize: "60px" }}
      >
        Meet Our Counsellors
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full overflow-y-auto p-10 custom-scrollbar"
        style={{ maxHeight: "calc(2 * 370px)" }}
      >
        {counsellors.map((c, index) => (
          <CounsellorCard key={index} {...c} />
        ))}
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, WebKit */
        }
      `}</style>

      {/* Custom Scrollbar */}
      <style jsx>{`
        /* Custom Scrollbar for WebKit browsers (Chrome, Edge, Safari) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px; /* scrollbar thickness */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f7f4f2; /* background track color */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a1cdd9; /* draggable thumb color */
          border-radius: 10px;
          border: 2px solid #f7f4f2; /* padding effect */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7db7c7; /* hover effect */
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a1cdd9 #f7f4f2;
        }
      `}</style>
    </div>
  );
};

export default Counsellor_Grid;