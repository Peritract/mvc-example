// Creates the database tables

require("dotenv").config() // Load environment variables

// Imports
const fs = require("fs");

const db = require("./connect");

// Get the table definitions
const tableQuery = fs.readFileSync("./database/tables.sql").toString();
const seedQuery = fs.readFileSync("./database/seed.sql").toString();

// Create the tables
async function setupDB () {
    await db.query(tableQuery); // Send the tables to the database
    await db.query(seedQuery); // Send the tables to the database
    db.end(); // Stop the pool
    console.log("Database ready.")
}

setupDB();