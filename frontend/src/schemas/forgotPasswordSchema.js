import * as yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  Password: yup
    .string()
    .required("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});
