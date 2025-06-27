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

  createProjectController: async (req, res) => {
    try {
      const data = req.body;

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
        dueDate: newData.dueDate || existingProject.dueDate,
        status: newData.status || existingProject.status,
        description: newData.description || existingProject.description,
      };

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
