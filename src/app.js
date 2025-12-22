const express = require("express");
const cors = require("cors");
const path = require("path");

const usersRoutes = require("./routes/users.routes");
const workoutsRoutes = require("./routes/workouts.routes");

const app = express();

app.use(cors());
app.use(express.json());

// HTML docs en la root
app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/users", usersRoutes);
app.use("/workouts", workoutsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
