const { Router } = require("express");

const mushroomController = require("../controllers/mushroom");

// Thing to handle all requests to /mushrooms
const mushroomRouter = Router();

// Route definitions
mushroomRouter.get("/", mushroomController.index); // /mushrooms/
mushroomRouter.get("/:id", mushroomController.show);
mushroomRouter.delete("/:id", mushroomController.destroy);
mushroomRouter.patch("/:id", mushroomController.update);

module.exports = mushroomRouter;