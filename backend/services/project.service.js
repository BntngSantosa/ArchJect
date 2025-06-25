const prisma = require("../prisma/client");

module.exports.projectService = {
  getAllProjects: async () => {
    return await prisma.projects.findMany();
  },

  getProjectById: async (id) => {
    return await prisma.projects.findUnique({
      where: { id },
    });
  },

  getCountProjects: async () => {
    return await prisma.projects.count();
  },

  getCountCompletionProjects: async () => {
    return await prisma.projects.count({
      where: { status: "done" },
    });
  },

  getCountProgressProjects: async () => {
    return await prisma.projects.count({
      where: { status: "in progress" },
    });
  },

  getNewProjectThisMonth: async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return await prisma.projects.count({
      where: {
        dueDate: {
          gte: startOfMonth,
        },
      },
    });
  },

  getProjectCompletedThisMonth: async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return await prisma.projects.count({
      where: {
        completionDate: {
          gte: startOfMonth,
        },
      },
    });
  },

  getIncomeMonth: async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const result = await prisma.projects.aggregate({
      _sum: {
        income: true,
      },
      where: {
        dueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return result._sum.income || 0;
  },

  getMonthlyIncome: async () => {
    const result = await prisma.$queryRaw`
      SELECT 
        MONTH(createdAt) AS monthIndex,
        MONTHNAME(createdAt) AS month, 
        CAST(SUM(income) AS SIGNED) AS income
      FROM Projects
      WHERE YEAR(createdAt) = YEAR(CURDATE())
      GROUP BY monthIndex, month
      ORDER BY monthIndex
    `;

    return result.map((item) => ({
      monthIndex: item.monthIndex ? Number(item.monthIndex) : 0,
      month: item.month,
      income: item.income ? Number(item.income) : 0,
    }));
  },

  getMonthlyProject: async () => {
    const result = await prisma.$queryRaw`
    SELECT 
      MONTH(createdAt) AS monthIndex,
      MONTHNAME(createdAt) AS month, 
      COUNT(*) AS totalProjects
    FROM Projects
    WHERE YEAR(createdAt) = YEAR(CURDATE())
    GROUP BY monthIndex, month
    ORDER BY monthIndex
  `;

    return result.map((item) => ({
      monthIndex: item.monthIndex ? Number(item.monthIndex) : 0,
      month: item.month,
      totalProjects: item.totalProjects ? Number(item.totalProjects) : 0,
    }));
  },

  createProject: async (data) => {
    return await prisma.projects.create({ data });
  },

  updateProject: async (id, data) => {
    return await prisma.projects.update({
      where: { id },
      data,
    });
  },

  updateStatusProject: async (id, data) => {
    return await prisma.projects.update({
      where: { id },
      data,
    });
  },

  deleteProject: async (id) => {
    return await prisma.projects.delete({
      where: { id },
    });
  },
};
