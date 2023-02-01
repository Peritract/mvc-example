// Creates the database tables

require("dotenv").config() // Load environment variables

// Imports
const fs = require("fs");
const { Pool } = require("pg");

// Get the table definitions
const query = fs.readFileSync("./database/tables.sql").toString();

// Connect to the database
const db = new Pool({
    connectionString: process.env.DB_URL
});

// Create the tables
async function createTables () {
    await db.query(query); // Send the tables to the database
    db.end(); // Stop the pool
    console.log("Database ready.")
}

createTables();