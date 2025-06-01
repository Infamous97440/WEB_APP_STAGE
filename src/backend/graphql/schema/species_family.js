const {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType} = require("graphql");
const {db} = require("../../db");

async function get_species_by_id(id)
{
    const result = await db.query("SELECT * FROM species_family WHERE id = $1", [id]);

    if (result) {
        console.log(result.rows[0]);
        return result.rows[0];
    }
    return null;
}

const SCHEMA_SPECIES_FAMILY = new GraphQLObjectType({
    name: "speciesFamily",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)}
    })
});

module.exports = {SCHEMA_SPECIES_FAMILY, get_species_by_id};
