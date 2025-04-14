// importando mogoose
const mongoose = require("mongoose"); 

const museumSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("Museum", museumSchema);
