import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email wajib diisi").email("Email tidak valid"),
  Password: yup
    .string()
    .required("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});
