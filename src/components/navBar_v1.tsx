import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="top-5 z-50 flex flex-row items-center justify-between p-4 bg-[#A1CDD9] text-white rounded-full m-5">
      <div className="flex items-center rounded-full bg-[#74B7C9] p-5">
        <img src="/navBar/call_icon.svg" alt="icon" className="w-5 h-5" />
      </div>
      <img src="/navBar/navBar_logo.svg" alt="Logo" className="w-50" />
      <div className="flex items-center rounded-full bg-[#74B7C9] p-5">
        <img src="/navBar/menu_icon.svg" alt="icon" className="w-5 h-5" />
      </div>
    </nav>
  );
};

export default Navbar;