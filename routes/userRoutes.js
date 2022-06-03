// controllers
const userController = require("../controllers/userController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", userController.createUser);
router.get("/", userController.getTeams);
router.get("/:id", userController.getTeam);
router.put("/:id", userController.updateTeam);
router.delete("/:id", userController.deleteTeam);

module.exports = router;