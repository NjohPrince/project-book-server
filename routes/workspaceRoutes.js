// controllers
const workspaceController = require("../controllers/workspaceController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", workspaceController.createWorkspace);
router.get("/", workspaceController.getWorkspaces);
router.get("/:id", workspaceController.getWorkspace);
router.put("/:id", workspaceController.updateWorkspace);
router.delete("/:id", workspaceController.deleteWorkspace);

module.exports = router;
