const express = require("express");
const {
  getOverviewStats,
  getUserStats
} = require("../controllers/stats.controller");

const router = express.Router();

router.get("/", getOverviewStats);
router.get("/users/:id", getUserStats);

module.exports = router;
