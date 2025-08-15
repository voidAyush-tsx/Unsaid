"use client"

import Image from "next/image";
import Navbar from "@/components/navBar_v1";
import Features from "@/components/features";
import GetInTouch from "@/components/getInTouch";
import Footer from "@/components/footer_v1";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col m-0">
      <div className="fixed w-full z-50">
        <Navbar/>
      </div>
      <div style={{ width: "100%" }}>
        <Image
          src="/home/home_page_pc.png"
          alt="Landing Page"
          // layout="responsive"
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
          priority
        />
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
        onClick={() => window.location.href = "/signin"}
        >
            <div 
              className="font-unsaid font-extrabold text-left" 
              style={{ color: "#fff", fontSize:"18px"}}
            >
            Get Started
            </div>
          <Image src="/right_arrow.svg" alt="Arrow" width={20} height={27} className="w-5" />
        </button>
      </div>

      <div className="w-full">
        <Features/>
      </div>

      <div className="w-full">
        <GetInTouch/>
      </div>
      <div className="flex flex-row items-center rounded-4xl m-6 px-28 py-16 gap-24 bg-[#F4A258]">
        <div className="flex flex-1">
          <div className="flex flex-col rounded-full px-32 py-8 gap-4 items-center bg-white">
            <Image src="/Fprint.svg" alt="fingerPrint" width={112} height={102} className="w-28" />
            <div
            className="font-unsaid font-bold"
            style={{ color: "#A1CDD9", fontSize:"16px"}}
            >
              Every fingerprint has it&apos;s own  story to tell.
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div
          className="font-unsaid font-extrabold"
          style={{ color: "#fff", fontSize:"48px"}}
          >
            Ready to check in with yourself?
          </div>
          <div>
            <button 
            className="font-unsaid font-extrabold rounded-full px-8 py-4 bg-[#A1CDD9]"
            style={{ color: "#fff", fontSize:"18px"}}
            >
              Take the Anxiety Test
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer/>
      </div>
    </div>
  );
}