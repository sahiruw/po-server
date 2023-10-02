const express = require("express");
const router = express.Router();
const routeController = require("./controller/routeController");

router.get("/route", routeController);

module.exports = router;