const express = require("express");
const router = express.Router();
const routeController = require("./controller/routeController");
const welcomeController = require("./controller/welcomeController");

router.get("/route", routeController);
router.get("/", welcomeController);

module.exports = router;