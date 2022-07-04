const express = require("express");
const app = express();
const router = express.Router();
const { user_game, user_game_biodata } = require("../models")

app.set("view engine", "ejs");

router.get("/", function (req, res) {
  res.render("index.ejs");
});

router.get("/login", function (req, res) {
  res.render("login.ejs");
});


router.get("/game", function (req, res) {
  res.render("game.ejs");
});

router.get("/edit", function (req, res) {
  res.render("edit.ejs");
});

router.get("/dashboard", function (req, res) {
  user_game.findAll({
    include: user_game_biodata
  })
    .then(users => {
      res.render("dashboard.ejs", { users })
      // res.json(users)
    })
});

module.exports = router;