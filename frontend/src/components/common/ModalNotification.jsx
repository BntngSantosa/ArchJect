import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function ModalNotification({ project, isOpen, setIsOpen }) {
  const notifRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          exit={{ opacity: 0, scale: 0.5 }}
          ref={notifRef}
          className="p-5 w-auto absolute top-12 right-0 md:w-auto md:p-0 md:top-22 md:right-10 z-10"
        >
          <div className="px-5 py-3 rounded-md bg-white shadow-lg flex flex-col gap-3">
            {project.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-[12px] text-black/70 font-Poppins">
                  Project <strong>{item.name}</strong> is due on{" "}
                  <strong>
                    {new Date(item.dueDate).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </strong>
                </span>
              </div>
            ))}
            {project.length === 0 && (
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-black/70 font-Poppins">
                  No project is due
                </span>
              </div>
            )}
            {project.length !== 0 && (
              <Link
                to="/projects"
                className="text-[12px] text-blue-700/70 font-Poppins self-end"
              >
                See detail
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
