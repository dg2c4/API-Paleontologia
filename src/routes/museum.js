const verifyToken = require('./validate_token');
const express = require("express");
const router = express.Router();
const museumSchema = require("../models/museum");

router.post("/museums", (req, res) => {
    const museum = new museumSchema(req.body);
    museum.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/museums", verifyToken, (req, res) => {
    museumSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;

router.put("/museums/:id", verifyToken, async (req, res) => {
    const { nombre, ubicacion, descripcion } = req.body;
    const museum = await museumSchema.findByIdAndUpdate(
        req.params.id,
        {
            nombre,
            ubicacion,
            descripcion
        },
        { new: true }
    );
    if (!museum) return res.status(404).json({ message: "Museo no encontrado" });
    res.json(museum);
});

router.delete("/museums/:id", verifyToken, async (req, res) => {
    const museum = await museumSchema.findByIdAndDelete(req.params.id);
    if (!museum) return res.status(404).json({ message: "Museo no encontrado" });
    res.json({ message: "Museo eliminado exitosamente" });
});