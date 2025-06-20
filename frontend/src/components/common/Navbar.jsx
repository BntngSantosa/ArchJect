import { faArrowUpFromBracket, faFolderOpen, faSplotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import React from 'react'
import handleLogout from '../../utils/handleLogout';

export default function Navbar() {
  const logout = handleLogout();
  return (
    <div className="hidden w-[90px] h-[485px] py-5 bg-[#FFEDF3] rounded-full md:flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center gap-5">
        <Link to="/">
          <FontAwesomeIcon
            icon={faSplotch}
            className="text-5xl text-black/70"
          />
        </Link>
        <Link to="/chat">
          <FontAwesomeIcon
            icon={faFolderOpen}
            className="text-2xl text-black/70"
          />
        </Link>
      </div>
      <button onClick={logout}>
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          className="text-2xl text-black/70 transform -rotate-90 hover:bg-black/70 hover:text-[#FFEDF3] p-3 rounded-full transition-all duration-300 ease-in-out"
        />
      </button>
    </div>
  );
}
