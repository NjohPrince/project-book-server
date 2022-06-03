// controllers
const inviteController = require("../controllers/inviteController.js");

// router
const router = require("express").Router();

// create routes
router.post("/", inviteController.createInvite);

module.exports = router;
