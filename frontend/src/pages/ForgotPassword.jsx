import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import useForgotPassword from "../hooks/useForgotPassword";
import { searchEmailSchema } from "../schemas/searchEmailSchema";
import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import handleShowPassword from "../utils/handleShowPassword";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { handleUpdatePassword, handleSearchEmail, userFound, error, loading } =
    useForgotPassword();
  const { type, icon, toggle } = handleShowPassword();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className="w-full h-screen p-5 flex justify-center items-center bg-gradient-to-tr from-[#56DFCF] to-[#FFEDF3]">
      <div className="relative w-[500px] bg-white/70 px-[40px] py-[50px] rounded-[25px] overflow-hidden gradient-hover-card transition-all duration-500 ease-in-out hover:shadow-lg">
        <div className="relative z-10">
          <div className="mb-[25px] grid grid-cols-1 gap-3 place-content-center place-items-center">
            <h1 className="text-[30px] font-Unbounded font-bold">ArchJect</h1>
            <h1 className="text-[14px] font-Poppins font-light">
              change your password more easily
            </h1>
          </div>
          <Formik
            initialValues={{ email: "", Password: "" }}
            validationSchema={
              userFound ? forgotPasswordSchema : searchEmailSchema
            }
            onSubmit={userFound ? handleUpdatePassword : handleSearchEmail}
          >
            <Form className="grid grid-cols-1 gap-5">
              {/* Email Field */}
              <div className="w-full px-[14px] py-[11px] rounded-[12px] flex items-center gap-2 bg-[#56DFCF]/30">
                <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  {...(userFound && { disabled: true })}
                  className="w-full outline-none bg-transparent text-[12px] font-Poppins font-black/50"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 font-Poppins"
              />

              {/* Password Field (tampil jika user ditemukan) */}
              {userFound ? (
                <div>
                  <div className="w-full px-[14px] py-[11px] rounded-[12px] flex items-center gap-2 bg-[#56DFCF]/30">
                    <FontAwesomeIcon icon={faLock} className="text-2xl" />
                    <Field
                      name="Password"
                      type={type}
                      placeholder="New Password"
                      className="w-full outline-none bg-transparent text-[12px] font-Poppins font-black/50"
                    />
                    <span onClick={toggle}>
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-xl cursor-pointer"
                      />
                    </span>
                  </div>
                  <ErrorMessage
                    name="Password"
                    component="div"
                    className="text-sm text-red-500 font-Poppins"
                    
                  />
                </div>
              ) : null}

              {/* Tombol Submit */}
              <button
                type="submit"
                className="w-full px-[14px] py-[11px] rounded-[12px] flex items-center justify-center gap-2 bg-[#303030] text-white font-semibold font-Poppins cursor-pointer hover:bg-[#404040] transition-all duration-300 ease-in-out"
                disabled={loading}
              >
                {loading ? "Loading..." : userFound ? "Save Changes" : "Search"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
