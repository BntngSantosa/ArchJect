import * as yup from "yup";

export const searchEmailSchema = yup.object().shape({
  email: yup.string().required("Email wajib diisi").email("Email tidak valid")
});
