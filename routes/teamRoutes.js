// controllers
const projectController = require("../controllers/teamController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", projectController.createTeam);
router.get("/", projectController.getTeams);
router.get("/:id", projectController.getTeam);
router.put("/:id", projectController.updateTeam);
router.delete("/:id", projectController.deleteTeam);

module.exports = router;
