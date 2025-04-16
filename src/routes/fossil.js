const verifyToken = require('./validate_token');
const express = require("express");
const router = express.Router();
const fossilSchema = require("../models/fossil");

router.post("/fossils", (req, res) => {
    const fossil = new fossilSchema(req.body);
    fossil.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/fossils", verifyToken, (req, res) => {
    fossilSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;

router.put("/fossils/:id", verifyToken, async (req, res) => {
    const { 
        name, 
        nombreCientifico, 
        era, 
        altura, 
        discoveryLocation, 
        descripcion 
    } = req.body;
    const fossil = await fossilSchema.findByIdAndUpdate(
        req.params.id,
        {
            name,
            nombreCientifico,
            era,
            altura,
            discoveryLocation,
            descripcion
        },
        { new: true }
    );
    if (!fossil) return res.status(404).json({ message: "Fósil no encontrado" });
    res.json(fossil);
});

router.delete("/fossils/:id", verifyToken, async (req, res) => {
    const fossil = await fossilSchema.findByIdAndDelete(req.params.id);
    if (!fossil) return res.status(404).json({ message: "Fósil no encontrado" });
    res.json({ message: "Fósil eliminado exitosamente" });
});