const prismaClient = require("../prisma/client");

const getAllUsers = async () => {
  return await prismaClient.user.findMany();
};

const getUserById = async (id) => {
  return await prismaClient.user.findUnique({
    where: {
      id: id,
    },
  });
};

const getUserByEmail = async (email) => {
  return await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
};

const getUserIdByEmail = async (email) => {
  return await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    }
  });
}

const createUser = async (data) => {
  return await prismaClient.user.create({
    data,
  });
};

const updateUser = async (id, data) => {
  return await prismaClient.user.update({
    where: {
      id: id,
    },
    data: data,
  });
};

const updatePassword = async (id, newPassword) => {
  return await prismaClient.user.update({
    where: {
      id
    },
    data: {
      Password: newPassword,
    }
  })
}

const deleteUser = async (id) => {
  return await prismaClient.user.delete({
    where: {
      id: id,
    },
  });
};

const getUserByEmailOrName = async (email, name) => {
  return await prismaClient.user.findUnique({
    where: {
      email: email,
      name: name,
    },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmailOrName,
  updatePassword,
  getUserIdByEmail,
};
