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
