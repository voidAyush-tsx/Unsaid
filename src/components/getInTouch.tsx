import React from 'react';

const getInTouch: React.FC = () => {
  return (
    <div className='relative min-h-screen flex flex-row items-center m-4 p-28 bg-transparent gap-36'>
      <div className="flex-1 flex flex-col h-full items-start justify-center">
        <h1 
        className='font-unsaid font-extrabold'
        style={{ color: "#A1CDD9", fontSize: "60px" }}
        >
            Let's Get in Touch with Us.
        </h1>
        <p
        className='font-unsaid font-medium mt-8'
        style={{ color: "#736B66", fontSize: "20px" }}
        >
            Have questions or need assistance? We're here to help you out every step of the way!
        </p>
        <div
        className='flex flex-row w-full gap-4 mt-12'
        >
            <div className='flex-1 flex flex-col items-start p-0 m-0'>
                <div className='rounded-full mb-4 w-10 h-10 bg-[#F0F2E8]'></div>
                <div
                className='font-unsaid font-extrabold mb-2'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
                >
                    Our Address
                </div>
                <div
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "18px" }}
                >
                    abcd
                </div>
            </div>
            <div className='flex-1 flex flex-col items-start p-0 m-0'>
                <div className='rounded-full mb-4 w-10 h-10 bg-[#F0F2E8]'></div>
                <div
                className='font-unsaid font-extrabold mb-2'
                style={{ color: "#A1CDD9", fontSize: "18px" }}
                >
                    Our Contact Info
                </div>
                <div
                className='font-unsaid font-medium'
                style={{ color: "#736B66", fontSize: "18px" }}
                >
                    123456789
                </div>
            </div>
        </div>
        <button className='flex flex-row rounded-full font-unsaid font-extrabold bg-[#A1CDD9] mt-12 px-8 py-4 gap-3'>
          <div 
          className="font-unsaid font-extrabold text-left" 
          style={{ color: "#fff", fontSize:"18px"}}
          >
            Or Fill the Form
          </div>
          <img src="/right_arrow.svg" alt="Arrow" className="w-5" />
        </button>
      </div>


      <div className="flex-1 flex h-full items-center justify-center">
        <div className='flex items-center justify-center rounded-full bg-[#A1CDD9] w-[500px] h-[500px]'>
            <img src="/getInTouch/unsaid_mockup.svg" alt="Arrow" className="absolute rounded-4xl translate-y-40 w-115 z-2" />
            <div className='flex flex-col'>
                <img src="/getInTouch/patient_reply.svg" alt="Arrow" className="absoulte translate-x-14 w-96 z-3" />
                <img src="/getInTouch/doctor_reply.png" alt="Arrow" className="absoulte -translate-x-12 w-96 z-3" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default getInTouch;