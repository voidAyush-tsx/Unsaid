import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='flex flex-col items-center rounded-t-4xl bg-[#A1CDD9] relative overflow-hidden'>

        <div className='flex flex-col items-center px-32 py-28 z-50'>
            <div className='flex flex-col items-center justify-center gap-16 p-4 w-full'>
                <img src="/unsaid_logo_white.svg" alt="Unsaid Logo" className="w-44"/>
                <div className='flex flex-row gap-2'>
                    <div className='flex flex-row font-unsaid font-medium rounded-full p-4 pr-40 items-center justify-center bg-[#372315] text-white w-full'
                    style={{ color: "#C9C7C5", fontSize:"18px"}}
                    >
                        <img src="/footer/mail_icon.svg" alt="mail" className="mr-2" />
                        Leave a Message
                    </div>
                    <div className='flex items-center justify-center rounded-full p-8 bg-[#E48A39]'>
                        <img src="/right_arrow.svg" alt="Arrow" className="absolute" />
                    </div>
                </div>
                <div 
                className='flex flex-row min-w-full font-unsaid font-medium gap-16'
                style={{ color: "#fff", fontSize:"36px"}}
                >
                    <div>Homepage</div>
                    <div>Connect</div>
                    <div>Assessment</div>
                    <div>About Us</div>
                    <div>Contact Us</div>
                    <div>Blog</div>
                </div>
                <div className='flex flex-row gap-4'>
                    <img src="/footer/insta_icon.svg" alt="Social Icons" className="rounded-full p-4 border-2 border-white" />
                    <img src="/footer/facebook_icon.svg" alt="Social Icons" className="rounded-full p-4 border-2 border-white" />
                    <img src="/footer/twitter_icon.svg" alt="Social Icons" className="rounded-full p-4 border-2 border-white" />
                </div>
            </div>
        </div>
        <div 
        className='flex flex-row items-center gap-4 mb-8 font-unsaid font-black z-50'
        style={{ color: "#fff", fontSize:"14px"}}
        >
            COPYRIGHT 2025, ALL RIGHTS RESERVED
            <div className='rounded-full bg-[#926247] w-2 h-2'></div>
            TERMS & CONDITIONS
            <div className='rounded-full bg-[#926247] w-2 h-2'></div>
            PRIVACY POLICY
        </div>
        <img
            src="/footer/footer_bg.svg"
            alt="footer bg"
            className="absolute inset-0 w-full h-full object-cover rounded-t-4xl"
            style={{ zIndex: 0 }}
        />
    </footer>
  );
};

export default Footer;