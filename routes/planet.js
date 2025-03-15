const express = require("express");
const router = express.Router();
const planetCtrl = require("../controllers/planet");

// Import SWAPI data
router.get("/import", planetCtrl.importPlanets);

// CRUD Routes
router.get("/create", planetCtrl.createPlanet);
router.get("/retrieve", planetCtrl.getAllPlanets);
router.get("/:id", planetCtrl.getPlanetById);
router.put("/:id", planetCtrl.updatePlanet);
router.delete("/:id", planetCtrl.deletePlanet);

module.exports = router;
