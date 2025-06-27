// ModalProject.jsx
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { addProjectSchema } from "../../schemas/addProjectSchema";

export default function ModalProject({
  isOpen,
  onClose,
  handleAddProjectHandler,
  handleUpdateProjectHandler,
  initialData = null,
  isEdit = false,
}) {

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="bg-transparent backdrop-blur-sm p-5 fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center">
          <motion.div
            className="w-full relative px-5 py-10 bg-white rounded-[14px] sm:max-w-[500px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
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
                  { name: "name", type: "text", placeholder: "Project Name" },
                  {
                    name: "income",
                    type: "text",
                    placeholder: "Project Income",
                  },
                  { name: "dueDate", type: "date", placeholder: "Due Date" },
                ].map((field) => (
                  <div key={field.name}>
                    <Field
                      className="w-full p-3 outline-none bg-[#FFEDF3] text-[12px] font-Poppins rounded-sm"
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

                <div>
                  <div className="relative w-full">
                    <Field
                      as="select"
                      name="status"
                      className="appearance-none w-full p-3 pr-10 bg-[#FFEDF3] text-[12px] font-Poppins rounded-sm outline-none"
                    >
                      <option disabled value="">
                        Status
                      </option>
                      <option className="text-black bg-white" value="Done">
                        Done
                      </option>
                      <option
                        className="text-black bg-white"
                        value="In Progress"
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
                    className="w-full p-3 outline-none bg-[#FFEDF3] text-[13px] font-Poppinsrounded-sm"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-[12px] font-Poppins"
                  />
                </div>

                <button
                  className="w-full px-[14px] py-[11px] rounded-[12px] flex items-center justify-center gap-2 bg-[#303030] text-white font-semibold font-Poppins cursor-pointer hover:bg-[#404040] transition-all duration-300 ease-in-out col-span-2"
                  type="submit"
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              </Form>
            </Formik>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
