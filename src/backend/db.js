const {Client} = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const db = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
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
