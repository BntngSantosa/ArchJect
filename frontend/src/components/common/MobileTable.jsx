import {
  faCheckCircle,
  faCirclePlus,
  faFilePen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useUpdateStatusroject from "../../hooks/useUpdateStatusProject";
import useDeleteProject from "../../hooks/useDeleteProject";
import Pagintaion from "./Pagintaion";
import ModalProject from "./ModalProject";
import AlertConfirm from "./AlertConfirm";

export default function MobileTable({
  paginatedProjects,
  refetch,
  refetchNotif,
  refetchCount,
  currentPage,
  setCurrentPage,
  totalPages,
  handleUpdateProjectHandler,
}) {
  const [expandedRow, setExpandedRow] = useState(null);
  const { handleUpdateStatus, loading, error } = useUpdateStatusroject(refetch, refetchNotif, refetchCount);
  const { handleDeleteProject } = useDeleteProject(refetch, refetchNotif, refetchCount);
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertStatusOpen, setIsAlertStatusOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDeleteId, setProjectToDeleteId] = useState(null);
  const [projectToStatusId, setProjectToStatusId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleShowModal = (project = null) => {
    setSelectedProject(project);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleShowAlertDelete = (projectId) => {
    setProjectToDeleteId(projectId);
    setIsAlertOpen(true);
  };

  const handleShowAlertStatus = (projectId) => {
    setProjectToStatusId(projectId);
    setIsAlertStatusOpen(true);
  };

  return (
    <>
      <div>
        <div className="w-full rounded-[14px] overflow-hidden">
          <div className="grid grid-cols-[50px_2fr_2fr_1fr] bg-[#56DFCF] text-black/70 text-sm font-bold p-5">
            <span>No</span>
            <span>Project</span>
            <span className="col-span-2">Description</span>
          </div>

          {paginatedProjects.map((project, index) => (
            <div key={index} className="bg-[#FFEDF3]">
              <div className="grid grid-cols-[50px_2fr_2fr_1fr] items-center text-sm p-5">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    onClick={() => toggleRow(index)}
                    className="text-[#56df94] cursor-pointer text-lg"
                  />
                  {index + 1}
                </div>
                <span>{project.name}</span>
                <span className="col-span-2">{project.description}</span>
              </div>

              <AnimatePresence>
                {expandedRow === index && (
                  <motion.div
                    key={`detail-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pb-5 text-sm px-5"
                  >
                    <div className="grid gap-2 text-black/80">
                      <div>
                        <strong>Start Date:</strong>{" "}
                        {new Date(project.startDate).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div>
                        <strong>Due Date:</strong>{" "}
                        {new Date(project.dueDate).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div>
                        <strong>Completion:</strong>{" "}
                        {project.completionDate
                          ? new Date(project.completionDate).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </div>
                      <div>
                        <strong>Income:</strong>{" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(project.income)}
                      </div>
                      <div>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`px-2 py-1 text-white rounded ${
                            project.status === "done"
                              ? "bg-[#56df94]"
                              : "bg-red-400"
                          }`}
                        >
                          {project.status === "done" ? "Done" : "In Progress"}
                        </span>
                      </div>

                      <div className="flex gap-3 mt-2">
                        <button
                          className={`${
                            project.status === "done"
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          disabled={project.status === "done"}
                          onClick={() => handleShowAlertStatus(project.id)}
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={`text-xl ${
                              project.status === "done"
                                ? "text-[#56DFCF]"
                                : "text-[#56df94]"
                            }`}
                          />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={() => handleShowModal(project)}
                        >
                          <FontAwesomeIcon
                            icon={faFilePen}
                            className="text-xl text-sky-400"
                          />
                        </button>

                        <button
                          className="cursor-pointer"
                          onClick={() => handleShowAlertDelete(project.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="text-xl text-red-400"
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <Pagintaion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <ModalProject
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleUpdateProjectHandler={handleUpdateProjectHandler}
        initialData={selectedProject}
        isEdit={isEdit}
      />
      <AlertConfirm
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={async () => {
          await handleDeleteProject(projectToDeleteId);
          setProjectToDeleteId(null);
          setIsAlertOpen(false);
        }}
        title="Are you sure you want to delete this project?"
        confirmLabel="Delete"
      />
      <AlertConfirm
        isOpen={isAlertStatusOpen}
        onClose={() => setIsAlertStatusOpen(false)}
        onConfirm={async () => {
          await handleUpdateStatus(projectToStatusId);
          setIsAlertStatusOpen(false);
        }}
        title="Mark this project as Done?"
        confirmLabel="Yes, Mark Done"
      />
    </>
  );
}
