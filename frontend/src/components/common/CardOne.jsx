import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { motion } from 'framer-motion';

export default function CardOne({icon, title, desc, bg}) {
  return (
      <motion.div className={`px-[20px] ${bg} py-[16px] bg-[#FFEDF3] rounded-[14px] flex items-center gap-5 justify-between`}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="">
          <h1 className='text-[10px] font-Poppins font-normal sm:text-[13px]'>{title}</h1>
          <span className='text-[12px] font-semibold font-Poppins sm:text-[16px] md:-text-[20px] lg-text-[24px]'>{desc}</span>
        </div>
        <FontAwesomeIcon icon={ icon } className='text-[#56df94] text-2xl sm:text-4xl lg:text-5xl'/>
      </motion.div>
  );
}
