const validate = (req, res, next) => {
  const {name, email, Password } = req.body;

  if (!name || !email || !Password) {
    return res
      .status(400)
      .json({ message: "Email, and Password are required" });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  next();
};

module.exports = validate;
