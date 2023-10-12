const express = require("express");
const router = express.Router();
const Project = require("../models/Projects");

// Route to get the next available team number
router.get("/getTeamNumber", async (req, res) => {
  try {
    // Find the maximum team number currently in use
    const maxTeamNumber = await Project.findOne({})
      .sort({ teamNumber: -1 })
      .select("teamNumber");

    // Calculate the next team number
    const nextTeamNumber = maxTeamNumber ? maxTeamNumber.teamNumber + 1 : 1;

    res.json({ teamNumber: nextTeamNumber });
  } catch (error) {
    console.error("Error getting team number:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
