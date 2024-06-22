const express = require("express");
const pageRouters = express.Router();

// API Pages
const { pagesController } = require("../controller/pages.controller");
pageRouters.get("/pagination", pagesController);

module.exports = pageRouters;
