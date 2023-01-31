const Mushroom = require("../models/mushroom");

function index (req, res) {
    const data = Mushroom.getAll();
    res.json(data);
}

module.exports = {
    index,
}