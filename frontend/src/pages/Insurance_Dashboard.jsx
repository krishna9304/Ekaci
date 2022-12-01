import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/logo_no.png";

const Insurance_Dashboard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const scrollRef = useRef(null);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justidy-between items-center shadow-md">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-32" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <button
                className="cursor-pointer text-white"
                onClick={() => setToggleSidebar(false)}
              >
                X
              </button>
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        {/* open area for content */}
      </div>
    </div>
  );
};

export default Insurance_Dashboard;
