"use client";

import React from 'react';
import Image from "next/image";

const connect_qs: React.FC = () => {
  
  return (
    <div className='relative min-h-screen flex flex-col items-center px-34 py-24 bg-transparent gap-12'>
        <div className='flex flex-col items-center gap-5'>
            <div
                className='flex flex-col items-center font-unsaid font-extrabold'
                style={{ color: "#A1CDD9", fontSize: "48px" }}
            >
                <div className='flex flex-row gap-3'>
                    <div> What is it that is </div> <div style={{ color: "#E48A39"}}> not </div>
                </div>
                <div>
                    making you smile?
                </div>
            </div>
            <div
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "20px"}}
            >
                Your experience matters - pick all that fit
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="flex flex-col gap-4 p-4">
            <Image
            src=''
            alt=''
            width={}
            height={}
            />
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white rounded shadow p-4">Item 1</div>
          <div className="bg-white rounded shadow p-4">Item 2</div>
          <div className="bg-white rounded shadow p-4">Item 3</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white rounded shadow p-4">Item 1</div>
          <div className="bg-white rounded shadow p-4">Item 2</div>
          <div className="bg-white rounded shadow p-4">Item 3</div>
        </div> */}
    </div>
  );
};

export default connect_qs;