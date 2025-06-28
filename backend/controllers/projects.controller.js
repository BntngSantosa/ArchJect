const { projectService } = require("../services/project.service");

module.exports.projectsController = {
  getAllProjectsController: async (req, res) => {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProjectByIdController: async (req, res) => {
    try {
      const id = req.params.id;
      const project = await projectService.getProjectById(id);
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCountProjectsController: async (req, res) => {
    try {
      const count = await projectService.getCountProjects();
      res.status(200).json(count);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCompletionProjectsController: async (req, res) => {
    try {
      const count = await projectService.getCountCompletionProjects();
      res.status(200).json(count);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCountProgressProjectsController: async (req, res) => {
    try {
      const progress = await projectService.getCountProgressProjects();
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNewProjectsThisMonthController: async (req, res) => {
    try {
      const newProjects = await projectService.getNewProjectThisMonth();
      res.status(200).json({ message: "New projects this month", newProjects });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProjectsCompletedThisMonthController: async (req, res) => {
    try {
      const project = await projectService.getProjectCompletedThisMonth();
      res
        .status(200)
        .json({ message: "Projects completed this month", project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getIncomeMonthController: async (req, res) => {
    try {
      const income = await projectService.getIncomeMonth();
      res.status(200).json({ message: "Income this month", income });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMonthlyIncomeController: async (req, res) => {
    try {
      const data = await projectService.getMonthlyIncome();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch monthly income",
        error: error.message,
      });
    }
  },

  getMonthlyProjectController: async (req, res) => {
    try {
      const data = await projectService.getMonthlyProject();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch monthly income",
        error: error.message,
      });
    }
  },

  getCountProjectDueNext7DaysController: async (req, res) => {
    try {
      const count = await projectService.getCountProjectDueNext7Days();
      res.status(200).json(count);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllProjectDueNext7DaysController: async (req, res) => {
    try {
      const projects = await projectService.getAllProjectDueNext7Days();
      res.status(200).json({message: "Projects due next 7 days", projects});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProjectController: async (req, res) => {
    try {
      const data = req.body;

      if (data.startDate && data.dueDate) {
        const start = new Date(data.startDate);
        const due = new Date(data.dueDate);

        if (start > due) {
          return res.status(400).json({
            message: "Start date should not be greater than due date",
          });
        }
      }

      const project = await projectService.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProjectController: async (req, res) => {
    try {
      const id = req.params.id;
      const newData = req.body;

      const existingProject = await projectService.getProjectById(id);
      if (!existingProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      const data = {
        name: newData.name || existingProject.name,
        income: newData.income || existingProject.income,
        startDate: newData.startDate || existingProject.startDate,
        dueDate: newData.dueDate || existingProject.dueDate,
        completionDate:
          newData.completionDate || existingProject.completionDate,
        status: newData.status || existingProject.status,
        description: newData.description || existingProject.description,
      };

      if (data.status === "in progress") {
        data.completionDate = null;
      } else if (data.status === "done") {
        data.completionDate = new Date();
      }

      if (data.startDate && data.dueDate) {
        const start = new Date(data.startDate);
        const due = new Date(data.dueDate);

        if (start > due) {
          return res.status(400).json({
            message: "Start date should not be greater than due date",
          });
        }
      }

      const updatedProject = await projectService.updateProject(id, data);

      res.status(200).json({
        message: "Project updated successfully",
        data: updatedProject,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateStatusProjectController: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const project = await projectService.updateStatusProject(id, data);
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteProjectController: async (req, res) => {
    try {
      const id = req.params.id;
      const project = await projectService.deleteProject(id);
      res
        .status(200)
        .json({ message: "Project deleted successfully", project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
