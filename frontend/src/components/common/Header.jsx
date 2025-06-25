import React from 'react'
import { faBell, faCommentDots, faSplotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGetUsername from "../../hooks/useGetUsernmae";
import { Link } from "react-router-dom";

export default function Header() {
  const username = useGetUsername();

  return (
    <div className="w-full hidden md:flex items-center justify-between ">
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
  );
}
