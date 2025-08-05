import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="top-5 flex flex-row items-center justify-between p-3 bg-[#A1CDD9] text-white shadow-xl rounded-full m-5">
      <div className="flex items-center rounded-full bg-[#74B7C9] p-4">
        <img src="/navBar/call_icon.svg" alt="icon" className="w-4 h-4" />
      </div>
      <img src="/navBar/navBar_logo.svg" alt="Logo" className="w-50" />
      <div className="flex items-center rounded-full bg-[#74B7C9] p-4">
        <img src="/navBar/menu_icon.svg" alt="icon" className="w-4 h-4" />
      </div>
    </nav>
  );
};

export default Navbar;