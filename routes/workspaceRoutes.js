// controllers
const workspaceController = require("../controllers/workspaceController.js");

// router
const router = require("express").Router();

// create routes
router.post("/:id", workspaceController.creatWorkspace);
router.get("/", workspaceController.getWorkspaces);
router.get("/:id", workspaceController.getWorkspace);
router.put("/:id", workspaceController.updateWorkspace);
router.delete("/:id", workspaceController.deleteWorkspace);
router.get("/my", workspaceController.getMyWorkspace);

module.exports = router;
