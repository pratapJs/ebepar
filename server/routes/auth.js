const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
//controllers
const { createOrUpdateUser, loggedInUser } = require("../controllers/auth");

//user routes
router.post("/create-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, loggedInUser);
router.post("/current-admin", authCheck, adminCheck, loggedInUser);

module.exports = router;
