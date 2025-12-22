const express = require("express");
const {
  listWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
} = require("../controllers/workouts.controller");

const router = express.Router();

router.get("/", listWorkouts);        // list + limit/offset + search
router.get("/:id", getWorkout);       // details
router.post("/", createWorkout);      // create
router.put("/:id", updateWorkout);    // update
router.delete("/:id", deleteWorkout); // delete

module.exports = router;
