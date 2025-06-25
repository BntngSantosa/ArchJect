import {
  faCheckCircle,
  faCirclePlus,
  faFilePen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useGetAllProjects } from "../../hooks/useGetAllProjects";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileTable() {
  const { projects } = useGetAllProjects();
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <motion.div
    initial={{ opacity: 0, y:-10 }}
    animate={{ opacity: 1, y:0 }}
    transition={{ duration: 0.5, delay: 1 }}
    className="w-full rounded-[14px] overflow-hidden">
      <div className="grid grid-cols-4 bg-[#56DFCF] text-white text-sm font-semibold px-4 py-2">
        <span>No</span>
        <span>Project</span>
        <span className="col-span-2">Description</span>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="bg-[#FFEDF3]">
          <div className="grid grid-cols-4 items-center text-sm px-4 py-3 ">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCirclePlus}
                onClick={() => toggleRow(index)}
                className="text-[#56df94] cursor-pointer text-lg"
              />
              {index + 1}
            </div>
            <span>{project.name}</span>
            <span className="col-span-2 truncate">{project.description}</span>
          </div>

          <AnimatePresence>
            {expandedRow === index && (
              <motion.div
                key={`detail-${index}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden px-4 pb-3 text-sm"
              >
                <div className="grid gap-2 text-black/80">
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
                    <button>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-xl text-[#56df94]"
                      />
                    </button>
                    <Link to={`/projects/${project.id}`}>
                      <FontAwesomeIcon
                        icon={faFilePen}
                        className="text-xl text-sky-400"
                      />
                    </Link>
                    <button>
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
    </motion.div>
  );
}
