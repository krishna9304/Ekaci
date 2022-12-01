import React from "react";
import { NavLink, Link } from "react-router-dom";

import Logo from "../assets/logo_no.png";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-white hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between bg-green-700 h-full overflow-y-scrikk min-w-210 hide-scrollbar md:w-48">
      <div className="flex flex-col">
        <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-full"
            onClick={handleCloseSidebar}
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Home
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Claim Loss
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Track Claim
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Purchase Insurance
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Monitor Claims
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Monitor Insurances
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Helpline
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
