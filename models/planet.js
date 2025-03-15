const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    climate: String,
    terrain: String,
    population: String,
});

module.exports = mongoose.model("Planet", planetSchema);
