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

    static async create({ name, age, role}) {

        // { name, age, role }

        const res = await db.query("INSERT INTO mushroom (mushroom_name, age, mushroom_role) VALUES ($1, $2, $3) RETURNING *;", [name, age, role]);

        return new Mushroom(res.rows[0]);

    }

    async delete() {

        const res = await db.query("DELETE FROM mushroom WHERE mushroom_id = $1 RETURNING *;", [ this.id ]);

        if (res.rows[0]) {
            return true;
        } else {
            throw new Error("Unable to delete mushroom");
        };
    }

    async changeRole(newRole) {

        const res = await db.query("UPDATE mushroom SET mushroom_role = $1 WHERE mushroom_id = $2 RETURNING *;", [ newRole, this.id ]);

        if (res.rows[0]) {
            return new Mushroom(res.rows[0]);
        } else {
            throw new Error("Unable to update mushroom");
        };
    }

}

module.exports = Mushroom;