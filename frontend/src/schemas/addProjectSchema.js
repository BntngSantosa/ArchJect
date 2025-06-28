import * as yup from "yup";

export const addProjectSchema = yup.object().shape({
  name: yup.string().required("Nama projek wajib diisi"),
  income: yup
    .number()
    .typeError("Income harus berupa angka")
    .required("Income wajib diisi")
    .min(4, "Income minimal 4"),
  startDate: yup.date().required("Tanggal wajib diisi"),
  dueDate: yup.date().required("Tanggal wajib diisi"),
  status: yup.string().required("Status wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
});
