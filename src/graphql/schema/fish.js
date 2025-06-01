const {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType} = require("graphql");
const {SCHEMA_SPECIES_FAMILY, get_species_by_id} = require("./species_family");
const {db} = require("../../backend/db");

async function get_fish_by_id(fish_id)
{
    try {
        const result = await db.query("SELECT * FROM fish WHERE fish_id = $1", [fish_id]);

        if (result) {
            console.log(result.rows);
            return result.rows[0];
        }
        return null;
    } catch(err) {
        console.log("error trying to get fish with id: " + fish_id + " with error: " + err);
        return null;
    }
}

const SCHEMA_FISH = new GraphQLObjectType({
    name: "fish",
    fields: () => ({
        fish_id: {type: GraphQLID},
        code_fao: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        latin_name: {type: new GraphQLNonNull(GraphQLString)},
        species_family_id: {
            type: SCHEMA_SPECIES_FAMILY,
            resolve(parent, args) {
                return parent.species_family_id ? get_species_by_id(parent.species_family_id) : null;
            }
        },
    })
});

module.exports = {SCHEMA_FISH, get_fish_by_id};
