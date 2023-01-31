let db = require("../database/mushrooms");

class Mushroom {

    constructor({ id, name, species, age, role }) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.age = age;
        this.role = role;
    }

    static getAll() {
        // Return all relevant data as mushroom objects
        return db.map(m => new Mushroom(m));
    }

    static getOneById(id) {

        // Get the relevant mushroom as raw data
        const m = db.find(m => m.id == id);

        if (m) {
            // convert it to a Mushroom object and return it
            return new Mushroom(m);
        } else {
            throw new Error('Unable to find mushroom!');
        }

    }

    static create(data) {

        data.id = db.length + 1;

        db.push(data);

        return new Mushroom(data);

    }

    delete() {

        // Filter out this mushroom
        db = db.filter(m => m.id != this.id);

        return "Mushroom devoured."
    }

}

module.exports = Mushroom;