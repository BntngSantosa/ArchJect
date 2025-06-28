const { projectsController } = require("../controllers/projects.controller")
const authenticate = require("../middlewares/auth.middleware");
const validate = require("../utils/validate.auth.util");
const router = require("express").Router();

router.get("/", authenticate, projectsController.getAllProjectsController);
router.get("/monthly-income", authenticate, projectsController.getMonthlyIncomeController);
router.get("/monthly-project", authenticate, projectsController.getMonthlyProjectController);
router.get("/project-monthly-completed", authenticate, projectsController.getProjectsCompletedThisMonthController);
router.get("/count", authenticate, projectsController.getCountProjectsController);
router.get("/completion", authenticate, projectsController.getCompletionProjectsController);
router.get("/income", authenticate, projectsController.getIncomeMonthController);
router.get("/inprogress", authenticate, projectsController.getCountProgressProjectsController);
router.get("/new-project", authenticate, projectsController.getNewProjectsThisMonthController);
router.get("/count-duedate", authenticate, projectsController.getCountProjectDueNext7DaysController);
router.get("/duedate", authenticate, projectsController.getAllProjectDueNext7DaysController);
router.get("/:id", authenticate, projectsController.getProjectByIdController);

router.post("/", authenticate, projectsController.createProjectController);
router.put("/:id", authenticate, projectsController.updateProjectController);
router.put("/status/:id", authenticate, projectsController.updateStatusProjectController);
router.delete("/:id", authenticate, projectsController.deleteProjectController);

module.exports = router;
