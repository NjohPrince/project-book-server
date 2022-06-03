// controllers
const workspaceController = require("../controllers/workspaceController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", workspaceController.creatWorkspace);
router.get("/", workpaceController.getworkspace);
router.get("/:id", userController.getTeam);
router.put("/:id", userController.updateTeam);
router.delete("/:id", userController.deleteTeam);

module.exports = router;
