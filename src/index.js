const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const dotenv = require("dotenv");
const cors = require("cors");
const {connect_to_db} = require("./backend/db");
const schema = require("./backend/graphql/schema/route");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

async function start_server()
{
    await connect_to_db();

    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));

    app.use("/graphql", graphqlHTTP({
        graphiql: true,
        schema
    }));

    app.get("/", (req, res) => {
        res.send({ msg: "hello world!" });
    });
    app.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });
}

start_server().catch(err => {
    console.log("Erreur lors du démarage: " + err);
    process.exit(84);
})
