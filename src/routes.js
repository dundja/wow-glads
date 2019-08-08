const express = require("express");

const leaderController = require("./controllers/leaderController");
const characterController = require("./controllers/characterController");
const routes = express.Router();

// routes.get("/", (req, res) => {
//     res.redirect("ladder");
// });
// index leaderboard
routes.get("/ladder", leaderController);
routes.get("/char", characterController);

module.exports = routes;
