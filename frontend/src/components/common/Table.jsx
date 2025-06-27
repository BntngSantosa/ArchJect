import React, { useEffect, useState } from "react";
import MobileTable from "./MobileTable";
import DesktopTable from "./DesktopTable";
import { motion } from "framer-motion";
import HeaderTable from "./HeaderTable";
import { useGetAllProjects } from "../../hooks/useGetAllProjects";
import { useAddProject } from "../../hooks/useAddProject";
import useUpdateProject from "../../hooks/useUpdateProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Table() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { projects, refetch, loading, error } = useGetAllProjects();
  const { handleAddProjectHandler } = useAddProject(refetch);
  const { handleUpdateProjectHandler } = useUpdateProject(refetch);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <HeaderTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          refetch={refetch}
          handleAddProjectHandler={handleAddProjectHandler}
        />

        {isMobile ? (
          <MobileTable
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            paginatedProjects={paginatedProjects}
            refetch={refetch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            handleUpdateProjectHandler={handleUpdateProjectHandler}
          />
        ) : (
          <DesktopTable
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            paginatedProjects={paginatedProjects}
            refetch={refetch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            handleUpdateProjectHandler={handleUpdateProjectHandler}
          />
        )}
      </motion.div>
    </>
  );
}
