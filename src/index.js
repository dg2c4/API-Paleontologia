const parser = require("body-parser");
const express = require('express');
const app = express();
const port = 3000;

const fossilRoutes = require("./routes/fossil");
const museumRoutes = require("./routes/museum");
const authRoutes = require("./routes/authentication");

const mongoose = require("mongoose");
require('dotenv').config();

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use("/api", fossilRoutes);
app.use("/api", museumRoutes);
app.use("/api", authRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
