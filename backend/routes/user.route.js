const {
  getAllUsersController,
  getUserByIdController,
  getUserIdByEmailController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController,
  updatePasswordController,
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/auth.middleware");
const validate = require("../utils/validate.auth.util");
const router = require("express").Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.get("/email/:email", getUserIdByEmailController);
router.post("/", validate, createUserController);
router.put("/forgot-password", updatePasswordController);
router.put("/:id", validate, updateUserController);
router.delete("/:id", deleteUserController);
router.post("/login", loginUserController);

module.exports = router;
