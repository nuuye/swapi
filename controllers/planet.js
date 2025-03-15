const Planet = require("../models/planet");
const https = require("https");

exports.importPlanets = (req, res) => {
    const SWAPI_URL = "https://swapi.dev/api/planets";

    https
        .get(SWAPI_URL, (response) => {
            let data = "";

            response.on("data", (chunk) => {
                data += chunk;
            });

            response.on("end", async () => {
                try {
                    const parsedData = JSON.parse(data);
                    const planets = parsedData.results.map((planet) => ({
                        name: planet.name,
                        climate: planet.climate,
                        terrain: planet.terrain,
                        population: planet.population,
                    }));

                    await Planet.deleteMany({});
                    await Planet.insertMany(planets);
                    res.status(200).json({ message: "Imported data successfuly", count: planets.length });
                } catch (error) {
                    console.error("Error while dealing with data:", error);
                    res.status(500).json({ error: "Error while importing data" });
                }
            });
        })
        .on("error", (error) => {
            console.error("Error accessing swapi API", error);
            res.status(500).json({ error: "Error connecting to swapi API" });
        });
};

exports.createPlanet = async (req, res) => {
    try {
        const { name, climate, terrain, population } = req.body;

        if (!name) {
            return res.status(400).json({ message: "name is mandatory" });
        }

        const duplicate = await Planet.findOne({ name: name });
        if (duplicate) {
            return res.status(400).message({ message: `${name} already exist` });
        }

        const newPlanet = new Planet({
            name: name,
            climate: climate,
            terrain: terrain,
            population: population,
        });

        const savedPlanet = await newPlanet.save();
        res.status(201).json(savedPlanet);
    } catch (error) {
        return res.status(500).message({ message: `error while creating planet: ${error}` });
    }
};

exports.getAllPlanets = async (req, res) => {
    try {
        const planets = await Planet.find({});
        res.status(200).json(planets);
    } catch (error) {
        console.error(error);
        return res.status(500).message({ message: "error while retrieving planets" });
    }
};

exports.getPlanetById = async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: "Planet not found" });
        }
        res.status(200).json(planet);
    } catch (error) {
        console.error(error);
        return res.status(500).message({ message: "error while retrieving planets" });
    }
};

// Mettre à jour une planète
exports.updatePlanet = async (req, res) => {
    try {
        const { name, climate, terrain, population } = req.body;

        // Vérifier si la planète existe
        const planet = await Planet.findById(req.params.id);
        if (!planet) {
            return res.status(404).json({ error: "Planet not found" });
        }

        // Mettre à jour les champs
        if (name) planet.name = name;
        if (climate) planet.climate = climate;
        if (terrain) planet.terrain = terrain;
        if (population) planet.population = population;

        const updatedPlanet = await planet.save();
        res.status(200).json(updatedPlanet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error while updating planet" });
    }
};

// Supprimer une planète
exports.deletePlanet = async (req, res) => {
    try {
        const planet = await Planet.findByIdAndDelete(req.params.id);

        if (!planet) {
            return res.status(404).json({ error: "Planet not found" });
        }

        res.status(200).json({ message: "Planet deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur while deleting planet" });
    }
};
