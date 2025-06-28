import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function AlertConfirm({
  title = "Are you sure?",
  isOpen,
  onClose,
  onConfirm,
  confirmLabel = "Yes",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="bg-transparent backdrop-blur-sm p-5 fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center"
        >
          <motion.div
            className="w-full relative px-5 py-10 bg-white rounded-[14px] sm:max-w-[500px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <h1 className="text-center text-md text-black/70 font-Poppins font-semibold">
              {title}
            </h1>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <motion.button whileTap={{ scale: 0.9 }}
                className="cursor-pointer bg-[#56df94] text-white font-Poppins font-semibold py-2 rounded"
                onClick={onConfirm}
              >
                {confirmLabel}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }}
                className="cursor-pointer bg-red-400 text-white font-Poppins font-semibold py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
