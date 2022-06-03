// controllers
const userController = require("../controllers/userController.js");

// router
const router = require("express").Router();

// create routes
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
