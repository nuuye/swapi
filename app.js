const planetRoutes = require("./routes/planet");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/swapi_planets")
    .then(() => console.log("Connexion à mongoDB réussie"))
    .catch((err) => console.log("Connexion à mongoDB échouée", err));

app.use(express.json());

//Routes
app.use("/api/planets", planetRoutes);

module.exports = app;
