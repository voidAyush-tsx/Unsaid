import React from 'react';

const Features: React.FC = () => {
  return (
    <div className='relative min-h-screen flex flex-col items-center m-4 px-28 py-24 rounded-4xl bg-[#FB8728]'>
      <div className='rounded-full px-4 py-2 bg-transparent border-2 border-white font-unsaid font-bold text-white'>
        What We Believe
      </div>
      <div 
      className='font-unsaid font-extrabold mt-6'
      style={{ color: "#fff", fontSize: "60px" }}
      >
        Our Core Values
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 mt-16">
        <div className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center">
          <div className='rounded-full w-24 h-24 bg-amber-600'></div>
          <div className='mt-12 text-left'>
            <div 
            className='font-unsaid font-extrabold'
            style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Safe Space
            </div>
            <div 
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "20px" }}
            >
              A place where you can be yourself without fear or judgment.
            </div>
          </div>
        </div>
        <div className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center">
          <div className='rounded-full w-24 h-24 bg-amber-600'></div>
          <div className='mt-12 text-left'>
            <div 
            className='font-unsaid font-extrabold'
            style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Understanding
            </div>
            <div 
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "20px" }}
            >
              Every emotion matters, and every story is heard.
            </div>
          </div>
        </div>
        <div className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center">
          <div className='rounded-full w-24 h-24 bg-amber-600'></div>
          <div className='mt-12 text-left'>
            <div 
            className='font-unsaid font-extrabold'
            style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Support
            </div>
            <div 
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "20px" }}
            >
              You're never alone in your journey toward healing.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center">
          <div className='rounded-full w-24 h-24 bg-amber-600'></div>
          <div className='mt-12 text-left'>
            <div 
            className='font-unsaid font-extrabold'
            style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Empowerment
            </div>
            <div 
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "20px" }}
            >
              Helping you regain control and confidence in life.
            </div>
          </div>
        </div>
        <div className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center">
          <div className='rounded-full w-24 h-24 bg-amber-600'></div>
          <div className='mt-12 text-left'>
            <div 
            className='font-unsaid font-extrabold'
            style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Clarity
            </div>
            <div 
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "20px" }}
            >
              Guiding you toward self-awareness and inner peace.
            </div>
          </div>
        </div>
        <div className="rounded-4xl bg-white p-6 flex flex-col items-start justify-center">
          <div className='rounded-full w-24 h-24 bg-amber-600'></div>
          <div className='mt-12 text-left'>
            <div 
            className='font-unsaid font-extrabold'
            style={{ color: "#A1CDD9", fontSize: "24px" }}
            >
              Hope
            </div>
            <div 
            className='font-unsaid font-medium'
            style={{ color: "#736B66", fontSize: "20px" }}
            >
              A reminder that better days are always ahead.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;