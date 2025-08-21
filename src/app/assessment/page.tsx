"use client";

import Image from "next/image";
import Navbar from "@/components/navBar_v1";
import Footer from "@/components/footer_v1";

export default function Assessment() {
  return (
    <div className="relative w-full min-h-screen flex flex-col m-0">
      {/* Navbar */}
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      {/* Image Container */}
      <div className="relative w-full">
        <Image
          src="/assessment/assessment_bg_image.png"
          alt="Landing Page"
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
          priority
        />

        {/* Text Overlay */}
        <div 
          className="absolute font-unsaid font-extrabold bottom-5 left-10"
          style={{ color: "#FB8728", fontSize: "48px" }}
        >
          Hello, Shinomiya! 👋
        </div>
      </div>

      <div className="flex flex-col items-start gap-12 px-10 py-16">
        <div className="flex flex-col items-start gap-4">
          <div 
            className="font-unsaid font-extrabold" 
            style={{ color: "#A1CDD9", fontSize: "60px" }}
          >
            Pick what you <span className="text-[#FB8728]">need!</span>
          </div>
          <div
            className="font-unsaid font-medium"
            style={{ color: "#736B66", fontSize: "20px" }}
          >
            Choose what you need in this moment - test your anxiety, find your breath, or relax with soothing sounds.
          </div>
        </div>
        <div className="flex flex-row items-stretch gap-5 w-full">
          {/* 1st Card */}
          <div className="group flex flex-col items-center justify-between rounded-4xl p-6 gap-4 bg-[#FB8728] hover:scale-105 transition-transform">
            <div className="flex flex-row items-center w-full justify-between">
              <div
                className="font-unsaid font-bold text-white"
                style={{ fontSize: "20px" }}
              >
                GAD Test
              </div>
              <Image
                src="/assessment/gad_test_icon.svg"
                alt="GAD Test Icon"
                width={64}
                height={64}
                className="w-6"
              />
            </div>
            <Image
              src="/assessment/gad_test_image.svg"
              alt="GAD Test Image"
              width={64}
              height={36.2}
              className="w-60"
            />
            <div className="flex flex-row items-center w-full min-w-0">
              <div className="flex-1 min-w-0"></div>
              <div>
                <Image
                  src="/assessment/assessment_arrow.svg"
                  alt="Arrow icon"
                  width={64}
                  height={64}
                  className="rounded-full w-12 cursor-pointer group-hover:scale-115 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* 2nd Card */}
          <div className="group flex flex-col items-center justify-between rounded-4xl p-6 gap-4 bg-[#7AA06F] hover:scale-105 transition-transform">
            <div className="flex flex-row items-center w-full justify-between">
              <div
                className="font-unsaid font-bold text-white"
                style={{ fontSize: "20px" }}
              >
                Mindful Reset
              </div>
              <Image
                src="/assessment/mindful_test_icon.svg"
                alt="Mindful Reset Icon"
                width={64}
                height={64}
                className="w-6"
              />
            </div>
            <Image
              src="/assessment/mindful_test_image.svg"
              alt="Mindful Reset Image"
              width={64}
              height={36.2}
              className="w-60"
            />
            <div className="flex flex-row items-center w-full min-w-0">
              <div className="flex-1 min-w-0"></div>
              <div>
                <Image
                  src="/assessment/assessment_arrow.svg"
                  alt="Arrow icon"
                  width={64}
                  height={64}
                  className="rounded-full w-12 cursor-pointer group-hover:scale-115 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* 3rd Card */}
          <div className="group flex flex-col items-center justify-between rounded-4xl p-6 gap-4 bg-[#F4A258] hover:scale-105 transition-transform">
            <div className="flex flex-row items-center w-full justify-between">
              <div
                className="font-unsaid font-bold text-white"
                style={{ fontSize: "20px" }}
              >
                Calm Space
              </div>
              <Image
                src="/assessment/calm_test_icon.svg"
                alt="Calm Space Icon"
                width={64}
                height={64}
                className="w-6"
              />
            </div>
            <Image
              src="/assessment/calm_test_image.svg"
              alt="Calm Space Image"
              width={64}
              height={36.2}
              className="w-60"
            />
            <div className="flex flex-row items-center w-full min-w-0">
              <div className="flex-1 min-w-0"></div>
              <div>
                <Image
                  src="/assessment/assessment_arrow.svg"
                  alt="Arrow icon"
                  width={64}
                  height={64}
                  className="rounded-full w-12 cursor-pointer group-hover:scale-115 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* 4th Card */}
          <div
            className="group flex flex-col flex-1 items-start justify-between rounded-4xl p-6 gap-4 bg-[#A1CDD9] hover:scale-105 transition-transform bg-no-repeat bg-right bg-contain"
            style={{
              backgroundImage: "url('/assessment/ready_talk_image.svg')",
              backgroundSize: "auto 100%",
            }}
          >
            <div className="flex flex-row items-center w-full justify-between">
              <div
                className="flex flex-1/2 font-unsaid font-extrabold text-white"
                style={{ fontSize: "36px" }}
              >
                Ready to Talk?
              </div>
              <div className="flex flex-1/2 min-w-0"></div>
            </div>

            <div className="flex flex-row items-end w-full min-w-0">
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/tick_mark.svg"
                    alt="Tick for Expert Support"
                    width={64}
                    height={64}
                    className="w-4"
                  />
                  <div
                    className="font-unsaid font-bold text-white"
                    style={{ fontSize: "18px" }}
                  >
                    Expert Support
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/tick_mark.svg"
                    alt="Tick for Safe Space"
                    width={64}
                    height={64}
                    className="w-4"
                  />
                  <div
                    className="font-unsaid font-bold text-white"
                    style={{ fontSize: "18px" }}
                  >
                    Safe Space
                  </div>
                </div>
              </div>
              <div>
                <Image
                  src="/assessment/assessment_arrow.svg"
                  alt="Arrow icon"
                  width={64}
                  height={64}
                  className="rounded-full w-14 cursor-pointer group-hover:scale-115 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}