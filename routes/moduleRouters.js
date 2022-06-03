// controllers
const moduleController = require("../controllers/moduleController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", moduleController.createModule);
router.get("/", moduleController.getModules);
router.get("/:id", moduleController.getModule);
router.put("/:id", moduleController.updateModule);
router.delete("/:id", moduleController.deleteModule);

module.exports = router;
