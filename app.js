const express = require("express");
const cors = require("cors");

const app = express();

const mushroomRouter = require('./routers/mushroom');

// Middleware
app.use(cors());
app.use(express.json());

// Route definitions
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Mushroom API."
    })
})

app.use("/mushrooms", mushroomRouter);

module.exports = app;