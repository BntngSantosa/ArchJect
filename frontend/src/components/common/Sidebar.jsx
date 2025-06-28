import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faBars,
  faBell,
  faCommentDots,
  faFolderOpen,
  faSplotch,
} from "@fortawesome/free-solid-svg-icons";
import SideItem from "./sideItem";
import useGetUsername from "../../hooks/useGetUsernmae";
import { motion } from "framer-motion";
import handleLogout from "../../utils/handleLogout";
import useGetAllProjectDueDate from "../../hooks/useGetAllProjectDueDate";
import useGetCountProjectDueDate from "../../hooks/useGetCountProjectDueDate";
import ModalNotification from "./ModalNotification";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const username = useGetUsername();
  const logout = handleLogout();
  const { data } = useGetCountProjectDueDate();
  const { projectDueDate } = useGetAllProjectDueDate();
  const [isOpen, setIsOpen] = useState(false);

  const handleShowNotification = () => {
    setIsOpen(!isOpen);
  };
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
    <>
      <motion.div
        className="md:hidden w-full fixed top-0 left-0 right-5 flex items-center justify-between p-5 z-10 bg-transparent backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
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
          <div className={`flex gap-3 mr-3 ${data > 0 ? "mr-5" : "mr-3"}`}>
            <div className="relative w-full">
              {data > 0 ? (
                <span className="bg-red-400 w-5 h-5 flex items-center justify-center text-[10px] text-white font-Poppins font-bold rounded-full absolute -top-3 -right-2">
                  {data}
                </span>
              ) : null}
              <button
                className="cursor-pointer"
                onClick={handleShowNotification}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-2xl text-black/70"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <motion.button
            onClick={handleToggleSidebar}
            className="cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faBars} className="text-4xl text-black/70" />
          </motion.button>
        </div>
        <div
          ref={sidebarRef}
          className={`fixed top-0 p-5 flex flex-col justify-between gap-5 w-1/2 h-screen bg-[#FFEDF3] transition-all duration-700 ease-in-out z-40 ${
            showSidebar ? "right-0" : "-right-full"
          } sm:w-1/3`}
        >
          <div className="">
            <p className="text-[16px] text-center mx-auto font-Unbounded font-bold mb-5">
              ArchJect
            </p>
            <SideItem to="/dashboard" icon={faSplotch} title="Dashboard" />
            <SideItem to="/projects" icon={faFolderOpen} title="Projects" />
          </div>
          <div className="">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="w-full p-2 cursor-pointer flex items-center gap-3 rounded-sm text-black/70 hover:bg-[#56DFCF]"
            >
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                className="text-2xl text-black/70 transform -rotate-90"
              />
              <span className="text-[14px] font-Poppins">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      <ModalNotification project={projectDueDate} isOpen={isOpen} />
    </>
  );
}
