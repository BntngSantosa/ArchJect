import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCircleXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { addProjectSchema } from "../../schemas/addProjectSchema";

export default function ModalProject({
  isOpen,
  onClose,
  handleAddProjectHandler,
  handleUpdateProjectHandler,
  initialData = null,
  isEdit = false,
  loading,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-transparent backdrop-blur-sm p-5 fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center"
        >
          <motion.div
            className="w-full relative px-5 py-10 bg-white rounded-[14px] sm:max-w-[500px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <h1 className="text-center text-lg text-black/70 font-Poppins font-semibold">
              {isEdit ? "Update Project" : "Add Project"}
            </h1>
            <button className="cursor-pointer" onClick={onClose}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-2xl text-black/70 absolute top-2 right-2"
              />
            </button>
            <Formik
              initialValues={{
                name: initialData?.name || "",
                income: initialData?.income || "",
                startDate: initialData?.startDate
                  ? new Date(initialData.startDate).toISOString().split("T")[0]
                  : "",
                dueDate: initialData?.dueDate
                  ? new Date(initialData.dueDate).toISOString().split("T")[0]
                  : "",
                status: initialData?.status || "",
                description: initialData?.description || "",
              }}
              enableReinitialize
              validationSchema={addProjectSchema}
              onSubmit={async (values, { resetForm }) => {
                if (isEdit) {
                  await handleUpdateProjectHandler(initialData.id, values);
                } else {
                  await handleAddProjectHandler(values);
                }
                resetForm();
                onClose();
              }}
            >
              <Form className="grid grid-cols-2 gap-5">
                {[
                  {
                    label: "Projecct name",
                    name: "name",
                    type: "text",
                    placeholder: "Project Name",
                  },
                  {
                    label: "Income",
                    name: "income",
                    type: "text",
                    placeholder: "Project Income",
                  },
                  {
                    label: "Start date",
                    name: "startDate",
                    type: "date",
                    placeholder: "Start Date",
                  },
                  {
                    label: "Due date",
                    name: "dueDate",
                    type: "date",
                    placeholder: "Due Date",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-[13px] text-black/70 font-Poppins">
                      {field.label}
                    </label>
                    <Field
                      className="w-full p-3 outline-[#56df94] bg-[#FFEDF3] text-[12px] font-Poppins rounded-sm"
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-[12px] font-Poppins"
                    />
                  </div>
                ))}

                <div className="col-span-2">
                  <div className="relative w-full">
                    <Field
                      as="select"
                      name="status"
                      className="appearance-none w-full p-3 pr-10 bg-[#FFEDF3] text-[12px] font-Poppins rounded-sm outline-[#56df94]"
                    >
                      <option disabled value="">
                        Status
                      </option>
                      <option className="text-black bg-white" value="done">
                        Done
                      </option>
                      <option
                        className="text-black bg-white"
                        value="in progress"
                      >
                        In Progress
                      </option>
                    </Field>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="absolute top-3 right-3 text-black/70"
                    />
                  </div>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-[12px] font-Poppins"
                  />
                </div>

                <div className="col-span-2">
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Project description"
                    className="w-full p-3 outline-[#56df94] bg-[#FFEDF3] text-[13px] font-Poppinsrounded-sm"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-[12px] font-Poppins"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-full px-[14px] py-[11px] rounded-[12px] flex items-center justify-center gap-2 bg-[#303030] text-white font-semibold font-Poppins cursor-pointer hover:bg-[#404040] transition-all duration-300 ease-in-out col-span-2"
                  type="submit"
                >
                  {isEdit ? "Update" : "Save"}
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  ) : null}
                </motion.button>
              </Form>
            </Formik>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
