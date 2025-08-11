import SignUpForm from "@/components/auth/SignupForm";
import React from 'react';
import Image from 'next/image';

export default function SignUp() {
  return (
    <div className="flex sm:flex-row flex-col-reverse min-h-screen w-full overflow-hidden p-6">


        {/* Left column */}
        <div className="flex flex-3/5 bg-transparent items-center justify-center p-0">
            <SignUpForm/>
        </div>


        {/* Right column */}
        <div className="flex flex-col flex-2/5 bg-[#F7F4F2] items-center justify-between rounded-4xl relative">
            <Image
                src="/auth/auth_asset.svg"
                alt="auth_image"
                width={1920}
                height={1080}
                style={{ 
                width: "75%", 
                height: "auto", 
                marginTop: 30, 
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
        </div>
    </div>
  );
}