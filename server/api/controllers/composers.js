const express = require("express");
const router = express.Router();

const Composer = require("../models/composer");

// Composer index route:
router.get("/all", async (req, res) => {
  try {
    const composers = await Composer.all;
    res.json({ composers });
    console.log(composers);
  } catch (err) {
    res.status(500).json({ err });
  }
});

console.log(Composer.all);

// Composer by name route:
router.get("/:name", async (req, res) => {
  try {
    const composer = await Composer.findByName(req.params.name);
    res.json(composer);
  } catch (err) {
    res.status(404).json({ err });
  }
});

// Composer by country route:
router.get("/:country", async (req, res) => {
  try {
    const composer = await Composer.findByCountry(req.params.country);
    res.send(composer);
  } catch (err) {
    res.status(404).json({ err });
  }
});

// Later - will add routes for updating, creating and deleting composers.
module.exports = router;
