const { projectsController } = require("../controllers/projects.controller")
const authenticate = require("../middlewares/auth.middleware");
const validate = require("../utils/validate.auth.util");
const router = require("express").Router();

router.get("/", authenticate, projectsController.getAllProjectsController);
router.get("/count", authenticate, projectsController.getCountProjectsController);
router.get("/completion", authenticate, projectsController.getCompletionProjectsController);
router.get("/income", authenticate, projectsController.getIncomeMonthController);
router.get("/inprogress", authenticate, projectsController.getCountProgressProjectsController);
router.get("/new-project", authenticate, projectsController.getNewProjectsThisMonthController);
router.get("/:id", authenticate, projectsController.getProjectByIdController);

router.post("/", authenticate, projectsController.createProjectController);
router.put("/:id", authenticate, projectsController.updateProjectController);
router.put("/status/:id", authenticate, projectsController.updateStatusProjectController);
router.delete("/:id", authenticate, projectsController.deleteProjectController);

module.exports = router;
