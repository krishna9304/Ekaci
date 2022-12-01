import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/logo_no.png";
import { useSelector } from "react-redux";

const Farmer_Dashboard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const scrollRef = useRef(null);
  const user = useSelector((state) => state.authReducer.user);
  const handleInsurance = () => {
    farmer_id = user.metamask_address;
  };

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

      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll items-center"
        ref={scrollRef}
      >
        {/* open area for content */}
        {/* <Carousel /> */}
        <div className="grid grid-cols-2 m-10 mt-20">
          <Link to="/insurance_claim">
            <div className=" w-96 h-40 rounded-lg mb-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-3xl text-white p-5 pt-24">
              File Claim Crop Loss
            </div>
          </Link>
          <div
            className=" w-96 h-40 rounded-lg mb-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-3xl text-white p-5 pt-24"
            onClick={handleInsurance}
          >
            Buy Insurance Policy
          </div>
          <Link to="/">
            <div className=" w-96 h-40 rounded-lg mb-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-3xl text-white p-5 pt-24">
              Track Insurance Claims
            </div>
          </Link>
          <div className=" w-96 h-40 rounded-lg mb-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-3xl text-white p-5 pt-24">
            Helplines
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer_Dashboard;
