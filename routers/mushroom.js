const { Router } = require("express");

const mushroomController = require("../controllers/mushroom");

// Thing to handle all requests to /mushrooms
const mushroomRouter = Router();

// Route definitions
mushroomRouter.get("/", mushroomController.index); // /mushrooms/

module.exports = mushroomRouter;