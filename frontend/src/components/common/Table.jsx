import React, { useEffect, useState } from "react";
import MobileTable from "./MobileTable";
import DesktopTable from "./DesktopTable";
import { motion } from "framer-motion";
import HeaderTable from "./HeaderTable";
import { useGetAllProjects } from "../../hooks/useGetAllProjects";
import { useAddProject } from "../../hooks/useAddProject";
import useUpdateProject from "../../hooks/useUpdateProject";

export default function Table({refetchNotif, refetchCount}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { projects, refetch } = useGetAllProjects();
  const { handleAddProjectHandler, loading } = useAddProject(refetch, refetchNotif, refetchCount);
  const { handleUpdateProjectHandler  } = useUpdateProject(refetch, refetchNotif, refetchCount);

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
  const itemsPerPage = 4;

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
          loading={loading}
        />

        {isMobile ? (
          <MobileTable
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            paginatedProjects={paginatedProjects}
            refetch={refetch}
            refetchNotif={refetchNotif}
            refetchCount={refetchCount}
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
            refetchNotif={refetchNotif}
            refetchCount={refetchCount}
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
