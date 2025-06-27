import {
  faCheckCircle,
  faFilePen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useUpdateStatusroject from "../../hooks/useUpdateStatusProject";
import useDeleteProject from "../../hooks/useDeleteProject";
import Pagintaion from "./Pagintaion";
import ModalProject from "./ModalProject";
import AlertConfirm from "./AlertConfirm";

export default function DesktopTable({
  paginatedProjects,
  refetch,
  currentPage,
  setCurrentPage,
  totalPages,
  handleUpdateProjectHandler,
}) {
  const { handleUpdateStatus } = useUpdateStatusroject(refetch);
  const { handleDeleteProject } = useDeleteProject(refetch);

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
    <div>
      <div className="w-full rounded-[14px] overflow-hidden">
        <div className="grid grid-cols-[50px_1fr_2fr_1fr_1fr_1fr_1fr] gap-5 py-5 bg-[#56DFCF] text-black/70 text-sm font-bold p-5">
          <span>No</span>
          <span>Project name</span>
          <span>Description</span>
          <span>Due Date</span>
          <span>Completion Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {paginatedProjects.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-[50px_1fr_2fr_1fr_1fr_1fr_1fr] gap-5 items-center text-sm bg-[#FFEDF3] p-5"
          >
            <span>{index + 1}</span>
            <span>{project.name}</span>
            <span>{project.description}</span>
            <span>
              {new Date(project.dueDate).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>
              {project.completionDate
                ? new Date(project.completionDate).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
            <span>
              <span
                className={`px-2 py-1 text-white rounded ${
                  project.status === "done" ? "bg-[#56df94]" : "bg-red-400"
                }`}
              >
                {project.status === "done" ? "Done" : "In Progress"}
              </span>
            </span>
            <div className="flex gap-5 items-center">
              <button
                className={
                  project.status === "done"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }
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
                onClick={() => handleShowModal(project)}
                className="cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faFilePen}
                  className="text-xl text-sky-400"
                />
              </button>
              <button
                onClick={() => handleShowAlertDelete(project.id)}
                className="cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-xl text-red-400"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagintaion
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Modal Edit */}
      <ModalProject
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleUpdateProjectHandler={handleUpdateProjectHandler}
        initialData={selectedProject}
        isEdit={isEdit}
      />

      {/* Alert Delete */}
      <AlertConfirm
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={async () => {
          await handleDeleteProject(projectToDeleteId);
          setIsAlertOpen(false);
          setProjectToDeleteId(null);
        }}
        title="Are you sure you want to delete this project?"
        confirmLabel="Delete"
      />

      {/* Alert Update Status */}
      <AlertConfirm
        isOpen={isAlertStatusOpen}
        onClose={() => setIsAlertStatusOpen(false)}
        onConfirm={async () => {
          await handleUpdateStatus(projectToStatusId);
          setIsAlertStatusOpen(false);
          setProjectToStatusId(null);
        }}
        title="Mark this project as Done?"
        confirmLabel="Yes, Mark Done"
      />
    </div>
  );
}
