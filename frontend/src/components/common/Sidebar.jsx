import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCommentDots,
  faFolderOpen,
  faSplotch,
} from "@fortawesome/free-solid-svg-icons";
import SideItem from "./sideItem";
import useGetUsername from "../../hooks/useGetUsernmae";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const username = useGetUsername();

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    const handleScroll = () => {
      setShowSidebar(false);
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showSidebar]);

  return (
    <div className="md:hidden w-full fixed top-0 left-0 right-5 flex items-center justify-between p-5 z-10 bg-transparent backdrop-blur-lg">
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={faSplotch}
            className="text-4xl text-black/70 md:text-6xl"
          />
          <div className="grid grid-cols-1">
            <h1 className="text-[14px] text-black font-semibold font-Poppins md:text-[16px]">
              Hallo, {username}
            </h1>
            <p className="text-[8px] text-black font-normal font-Poppins md:text-[14px]">
              Explore information and activity about your project.
            </p>
          </div>
        </div>
        <div className="hidden md:flex md:gap-5">
          <Link to="/chat">
            <FontAwesomeIcon
              icon={faCommentDots}
              className="text-2xl text-black/70"
            />
          </Link>
          <Link to="/notification">
            <FontAwesomeIcon icon={faBell} className="text-2xl text-black/70" />
          </Link>
        </div>
      </div>
      <div className="">
        <button onClick={handleToggleSidebar} className="cursor-pointer">
          <FontAwesomeIcon icon={faBars} className="text-4xl text-black/70" />
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`fixed top-0 p-5 flex flex-col items-start gap-5 w-1/2 h-screen bg-[#FFEDF3] transition-all duration-700 ease-in-out z-40 ${
          showSidebar ? "right-0" : "-right-full"
        } sm:w-1/3`}
      >
        <p className="text-[16px] mx-auto font-Unbounded font-bold">ArchJect</p>
        <SideItem to="/dashboard" icon={faSplotch} title="Dashboard" />
        <SideItem to="/projects" icon={faFolderOpen} title="Projects" />
        <SideItem to="/notification" icon={faCommentDots} title="Chat" />
        <SideItem to="/notification" icon={faBell} title="Notification" />
      </div>
    </div>
  );
}
