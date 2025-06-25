import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function SideItem({ to, icon, title }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`w-full flex items-center mb-3 gap-3 p-2 rounded-sm transition-colors duration-200
        ${
          isActive
            ? "bg-[#56DFCF] text-black/70"
            : "hover:bg-[#56DFCF] text-black/70"
        }
      `}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`text-2xl ${isActive ? "text-black/70" : "text-black/70"}`}
      />
      <span
        className={`text-[14px] font-Poppins ${
          isActive ? "font-semibold" : ""
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
