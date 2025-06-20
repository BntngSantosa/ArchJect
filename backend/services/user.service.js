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

const deleteUser = async (id) => {
  return await prismaClient.user.delete({
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
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByEmailOrName,
};
