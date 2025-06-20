const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRouter = require("./routes/user.route");
const projectRouter = require("./routes/project.route");

app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;