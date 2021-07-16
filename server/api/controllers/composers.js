const express = require("express");
const router = express.Router();

const Composer = require("../models/composer");

// Composer index route:
router.get("/all", async (req, res) => {
  try {
    const composers = await Composer.all;
    res.json({ composers });
  } catch (err) {
    res.status(500).json({ err });
  }
});

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
router.get("/country/:countryName", async (req, res) => {
  try {
    const composers = await Composer.findByCountry(req.params.countryName);
    res.json({ composers });
  } catch (err) {
    res.status(404).json({ err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const composer = await Composer.create(
      req.body.name,
      req.body.fullName,
      req.body.country,
      req.body.birthYear,
      req.body.deathYear
    );
    res.json(composer);
  } catch (err) {
    res.status(404).json({ err });
  }
});

router.delete("/delete/:name", async (req, res) => {
  try {
    const composer = await Composer.findByName(req.params.name);
    await composer.destroy();
    res.status(204).json("Composer deleted!");
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Later - will add a route for updating composers.
module.exports = router;
