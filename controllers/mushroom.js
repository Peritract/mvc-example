const Mushroom = require("../models/mushroom");

async function index (req, res) {
    const data = await Mushroom.All;
    console.log(data);
    res.json(data);
}

async function show (req, res) {
    // Pull out the id
    const id = req.params.id;
    try {

        const mushroom = await Mushroom.getOneById(id);

        res.json(mushroom)
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate mushroom with id '${id}'.`
        })
    }
}

async function create(req, res) {

    // Read the body
    const body = req.body;

    try {
        // Check it has all the required elements
        if (["name", "age", "role"].every(p => Object.hasOwn(body, p))) {

            const mushroom = await Mushroom.create(body);
            res.status(201).json(mushroom);

        } else {
            throw new Error("Invalid properties.");
        }
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            error: true,
            message: `Unable to create mushroom.`
        })
    }
}

async function destroy(req, res) {
    // Pull out the id
    const id = req.params.id;

    try {

        // Get the mushroom
        const m = await Mushroom.getOneById(id);

        // Delete the mushroom
        const deleted = await m.delete();

        // Report back
        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error("Deletion failed.");
        }

    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            error: true,
            message: `Unable to delete mushroom with id '${id}'.`
        })
    }

}

async function update (req, res) {
     // Pull out the id
    const id = req.params.id;

    try {

        // Pull the new role
        const newRole = req.body.newRole; // could also pull from req.query of sent in a different way

        if (!newRole || newRole.length < 2) {
            throw new Error("Invalid role");
        }

        // Get the specific mushroom
        const m = await Mushroom.getOneById(id);

        // Update it
        const updatedMushroom = await m.changeRole(newRole);

        // Send it back
        res.json(updatedMushroom);

    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            error: true,
            message: `Unable to update mushroom with id '${id}'.`
        })
    }
}

module.exports = {
    index,
    show,
    destroy,
    update,
    create
}