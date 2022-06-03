// controllers
const teamController = require("../controllers/teamController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", teamController.createTeam);
router.get("/", teamController.getTeams);
router.get("/:id", teamController.getTeam);
router.put("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
