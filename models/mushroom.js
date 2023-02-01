let db = require("../database/connect");

class Mushroom {

    constructor({ mushroom_id, mushroom_name, age, mushroom_role }) {
        this.id = mushroom_id;
        this.name = mushroom_name;
        this.age = age;
        this.role = mushroom_role;
    }

    static async getAll() {
        // Return all relevant data as mushroom objects
        const res = await db.query("SELECT * FROM mushroom;");
        return res.rows.map(m => new Mushroom(m));
    }

    static async getOneById(id) {

        // Get the relevant mushroom as raw data
        const res = await db.query("SELECT * FROM mushroom WHERE mushroom_id = $1", [ id ])

        const m = res.rows[0]; 

        if (m) {
            // convert it to a Mushroom object and return it
            return new Mushroom(m);
        } else {
            throw new Error('Unable to find mushroom!');
        }

    }

    static async create(data) {

        console.log(data);

        return [];

    }

    async delete() {

        // Filter out this mushroom
        db = db.filter(m => m.id != this.id);

        return true;
    }

    async changeRole(newRole) {
        
        this.role = newRole;

        // Swap it out in the data
        db = db.map(m => m.id == this.id ? this : m);

        return this;
    }

}

module.exports = Mushroom;