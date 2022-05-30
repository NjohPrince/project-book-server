// controllers
const projectController = require("../controllers/projectController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
