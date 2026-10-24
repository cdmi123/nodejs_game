const express = require("express");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/error.middleware");


const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
