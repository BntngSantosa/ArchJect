import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

export default function NavItem({ to, icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <FontAwesomeIcon
        icon={icon}
        className={`text-2xl ${
          isActive
            ? "bg-[#56DFCF] p-3 rounded-full text-black/70"
            : "hover:bg-[#56DFCF] p-3 rounded-full text-black/70"
        }`}
      />
    </Link>
  );
}
