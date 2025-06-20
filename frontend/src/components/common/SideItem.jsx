import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';

export default function SideItem({to, icon, title}) {
  return (
    <Link
      to={to}
      className="w-full flex items-center gap-3 p-2 rounded-sm hover:bg-[#56DFCF]"
    >
      <FontAwesomeIcon icon={icon} className="text-2xl text-black/70" />
      <span className="text-[14px] font-Poppins">{title}</span>
    </Link>
  );
}
