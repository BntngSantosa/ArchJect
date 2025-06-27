import {
  faMagnifyingGlassChart,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ModalProject from "./ModalProject";

export default function HeaderTable({ searchTerm, setSearchTerm, refetch, handleAddProjectHandler }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ModalProject
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleAddProjectHandler={handleAddProjectHandler}
      />
      <div className="mb-5 mt-10 flex items-center justify-between md:mt-0">
        <div>
          <button
            className="px-3 py-2 font-semibold text-[14px] text-black/70 rounded-sm bg-[#56df94]/70 hover:bg-[#56df94] cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={handleShowModal}
          >
            Add project
            <FontAwesomeIcon
              icon={faPlus}
              className="text-black/70 text-sm ml-3"
            />
          </button>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 font-normal text-[14px] text-black/70 rounded-sm bg-white/70">
          <FontAwesomeIcon icon={faMagnifyingGlassChart} />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
