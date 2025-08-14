import LogInForm from "@/components/auth/LoginForm";
import React from 'react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <div className="flex sm:flex-row flex-col-reverse min-h-screen w-full overflow-hidden p-2">
        {/* Left column */}
        <div className="flex flex-3/5 bg-transparent items-center justify-center p-0">
            <LogInForm/>
        </div>

        {/* Right column */}
        <div className="flex flex-col flex-2/5 bg-[#F7F4F2] items-center justify-between rounded-4xl relative">
            <Image
                src="/auth/auth_asset.svg"
                alt="auth_image"
                width={1920}
                height={1080}
                style={{ 
                width: "60%", 
                height: "auto", 
                marginTop: 20, 
                zIndex: 10 
                }}
            />
            <Image
                src="/auth/auth_gradient.svg"
                alt="gradient_image"
                width={1920}
                height={1080}
                className="rounded-b-4xl"
                style={{
                width: "100%",
                height: "auto",
                position: "absolute",
                bottom: 0,
                zIndex: 20,
                }}
            />
            <div className="flex flex-col z-30 p-4 gap-8">
                <div 
                    className="font-unsaid font-semibold px-8"
                    style={{ color: "#fff", fontSize:"24px"}}
                >
                    Unsaid has been a game-changer for me. Talking to a counselor from the comfort of my home gave me the support I didn&apos;t know I needed.  Truly grateful!
                </div>
                <div className="flex flex-row items-center justify-between px-0">
                    <div className="flex flex-row gap-2 ml-8">
                        <Image
                            src="/auth/rating_star.svg"
                            alt="rating"
                            width={24}
                            height={24}
                            className="w-6"
                        />
                        <Image
                            src="/auth/rating_star.svg"
                            alt="rating"
                            width={24}
                            height={24}
                            className="w-6"
                        />
                        <Image
                            src="/auth/rating_star.svg"
                            alt="rating"
                            width={24}
                            height={24}
                            className="w-6"
                        />
                        <Image
                            src="/auth/rating_star.svg"
                            alt="rating"
                            width={24}
                            height={24}
                            className="w-6"
                        />
                        <Image
                            src="/auth/rating_star.svg"
                            alt="rating"
                            width={24}
                            height={24}
                            className="w-6"
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="bg-[#F4A258] rounded-full p-3 rotate-180">
                            <Image
                                src="/right_arrow.svg"
                                alt="right arrow"
                                width={24}
                                height={24}
                            />
                        </div>
                        <div className="bg-[#F4A258] rounded-full p-3">
                            <Image
                                src="/right_arrow.svg"
                                alt="right arrow"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}