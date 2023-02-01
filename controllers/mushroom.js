const Mushroom = require("../models/mushroom");

function index (req, res) {
    const data = Mushroom.getAll();
    res.json(data);
}

function show (req, res) {
    // Pull out the id
    const id = req.params.id;
    try {


        const mushroom = Mushroom.getOneById(id);

        res.json(mushroom)
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate mushroom with id '${id}'.`
        })
    }
    
}

function destroy(req, res) {
    // Pull out the id
    const id = req.params.id;

    try {

        // Get the mushroom
        const m = Mushroom.getOneById(id);

        // Delete the mushroom
        const deleted = m.delete();

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

function update (req, res) {
     // Pull out the id
    const id = req.params.id;

    try {

        // Pull the new role
        const newRole = req.body.newRole; // could also pull from req.query of sent in a different way

        if (!newRole || newRole.length < 2) {
            throw new Error("Invalid role");
        }

        // Get the specific mushroom
        const m = Mushroom.getOneById(id);

        // Update it
        const updatedMushroom = m.changeRole(newRole);

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
    update
}