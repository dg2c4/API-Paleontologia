const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");

router.post('/signup', async (req, res) => {
    const { usuario, correo, clave } = req.body;
    const user = new userSchema({ usuario, correo, clave });
    user.clave = await user.encryptClave(user.clave);

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token });
});

router.post("/login", async (req, res) => {
    const user = await userSchema.findOne({ correo: req.body.correo });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(req.body.clave, user.clave);
    if (!validPassword)
        return res.status(400).json({ error: "Clave no válida" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
    });

    res.json({ auth: true, token });
});

module.exports = router;
