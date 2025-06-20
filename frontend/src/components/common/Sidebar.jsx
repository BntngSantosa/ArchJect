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

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

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
    <div className="md:hidden">
      <div className="fixed top-5 right-5">
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
        <SideItem to="/dashboard" icon={faFolderOpen} title="Dashboard" />
        <SideItem to="/notification" icon={faCommentDots} title="Chat" />
        <SideItem to="/notification" icon={faBell} title="Notification" />
      </div>
    </div>
  );
}
