const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByEmailOrName,
} = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUserController = async (req, res) => {
  const { name, email, Password } = req.body;

  try {
    const existingUser = await getUserByEmailOrName(email, name);
    if (existingUser) {
      return res.status(400).json({ message: "Name or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await createUser({
      name,
      email,
      Password: hashedPassword,
    });

    delete user.Password;

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, Password } = req.body;

    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let hashedPassword = existingUser.Password;
    if (Password) {
      hashedPassword = await bcrypt.hash(Password, 10);
    }

    const data = {
      name: name || existingUser.name,
      email: email || existingUser.email,
      Password: hashedPassword,
    };

    const updatedUser = await updateUser(id, data);

    delete updatedUser.Password;

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};


const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteUser(id);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUserController = async (req, res) => {
  const { email, Password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or Password" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or Password" });
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController,
};
