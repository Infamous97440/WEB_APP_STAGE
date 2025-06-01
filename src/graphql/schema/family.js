const {db} = require("../../backend/db");
const {GraphQLString, GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLID, GraphQLNonNull} = require("graphql");

async function get_family_by_id(family_id)
{
    try {
        const result = await db.query("SELECT * FROM family WHERE family_id = $1", [family_id]);
    
        if (result) {
            console.log(result.rows);
            return result.rows[0];
        }
    } catch(err) {
        console.log(err);
        return null;
    }
}

const SCHEMA_FAMILY = new GraphQLObjectType({
    name: "family",
    fields: () => ({
        family_id: {type: GraphQLID},
        family_name: {type: new GraphQLNonNull(GraphQLString)},
        is_seller: {type: new GraphQLNonNull(GraphQLBoolean)},
        is_buyer: {type: new GraphQLNonNull(GraphQLBoolean)},
        description: {type: GraphQLString}
    })
});

module.exports = {SCHEMA_FAMILY, get_family_by_id};
