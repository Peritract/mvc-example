const { Pool } = require("pg");

// Connect to the database
const db = new Pool({
    connectionString: process.env.DB_URL
});

module.exports = db;