const mongoose = require("mongoose"); 

const fossilSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nombreCientifico: {
        type: String,
        required: true,
    },
    era: {
        type: String,
        required: true,
    },
    altura: {
        type: String,
        required: true,
    },
    discoveryLocation: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Fossil", fossilSchema);
