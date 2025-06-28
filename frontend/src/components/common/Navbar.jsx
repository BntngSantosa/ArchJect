import {
  faArrowUpFromBracket,
  faFolderOpen,
  faSplotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";
import handleLogout from "../../utils/handleLogout";
import { motion } from "framer-motion";
import NavItem from "./navItem";

export default function Navbar() {
  const logout = handleLogout();
  return (
    <motion.div
      className="hidden w-[90px] py-5 bg-[#FFEDF3] rounded-full md:flex flex-col items-center justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <motion.div whileTap={{ scale: 0.9 }} className="">
          <Link to="/dashboard">
            <FontAwesomeIcon
              icon={faSplotch}
              className="text-5xl text-black/70"
            />
          </Link>
        </motion.div>
        <NavItem to="/projects" icon={faFolderOpen} />
      </div>
      <motion.button whileTap={{ scale: 0.9 }} onClick={logout} className="cursor-pointer">
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          className="text-2xl text-black/70 transform -rotate-90 hover:bg-black/70 hover:text-[#FFEDF3] p-3 rounded-full transition-all duration-300 ease-in-out"
        />
      </motion.button>
    </motion.div>
  );
}
