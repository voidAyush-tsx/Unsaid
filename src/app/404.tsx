"use client"

import Image from "next/image";

export default function Home() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-start justify-center gap-5 py-16 px-30 m-0">
      <Image
        src="/Fprint.svg"
        alt="Fingerprint Logo"
        width={112}
        height={102}
        className="w-24 mb-2"
      />
      <div className="flex flex-col items-start gap-0">
        <div
          className="font-unsaid font-extrabold text-left leading-80"
          style={{ color: "#A1CDD9", fontSize: "320px" }}
        >
          404
        </div>
        <div
          className="flex flex-col font-unsaid font-medium items-start text-left gap-0"
          style={{ color: "#736B66", fontSize: "20px" }}
        >
          <div className="w-full text-left">
            It&apos;s not you, it&apos;s us
          </div>
          <div className="w-full text-left">
            We&apos;re looking into it. Please wait a few moments and try again.
          </div>
        </div>
      </div>
      <button
        onClick={handleRefresh}
        className="flex flex-row bg-[#F4A258] cursor-pointer rounded-full px-6 py-4 mt-5"
      >
        <div
          className="font-unsaid font-extrabold"
          style={{ color: "#fff", fontSize: "18px" }}
        >
          Refresh Page
        </div>
        <Image
          src="/refresh_logo.svg"
          alt="Refresh Icon"
          width={24}
          height={24}
          className="ml-3 w-6"
        />
      </button>
    </div>
  );
}