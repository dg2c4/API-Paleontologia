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
