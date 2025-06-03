const {Client} = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const db = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
});

async function connect_to_db()
{
    try {
        await db.connect();
        console.log("Connection successful");
    } catch (err) {
        console.error("Failed to connect to the db: " + err);
    }
}

module.exports = {
    db,
    connect_to_db
};
