import React, { useState } from "react";
import {
  faBell,
  faSplotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetUsername from "../../hooks/useGetUsernmae";
import { motion } from "framer-motion";
import ModalNotification from "./ModalNotification";

export default function Header({data, projectDueDate}) {
  const username = useGetUsername();
  const [isOpen, setIsOpen] = useState(false);

  const handleShowNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        className="w-full hidden md:flex items-center justify-between "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
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
          <div className="relative w-full">
            {data > 0 ? (
              <span className="bg-red-400 w-5 h-5 flex items-center justify-center text-[10px] text-white font-Poppins font-bold rounded-full absolute -top-3 -right-2">
                {data}
              </span>
            ) : null}
            <motion.button whileTap={{ scale: 0.9 }} className="cursor-pointer" onClick={handleShowNotification}>
              <FontAwesomeIcon
                icon={faBell}
                className="text-2xl text-black/70"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
      <ModalNotification project={projectDueDate} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
}
