const {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLID, GraphQLList} = require("graphql");
const {SCHEMA_FAMILY, get_family_by_id} = require("./family");
const {db} = require("../../db");

async function get_entity_by_id(entity_id)
{
    const result = await db.query("SELECT * FROM entity WHERE entity_id = $1", [entity_id]);

    if (result) {
        console.log(result.rows);
        return result.rows[0];
    }
    return null;
}

async function get_entities_by_family(family_id)
{
    const result = await db.query("SELECT * FROM entity JOIN family ON family.family_id = entity.family_id WHERE entity.family_id = $1", [family_id]);

    if (result) {
        console.log(result.rows);
        return result.rows;
    }
    return null;
}

const SCHEMA_ENTITIES = new GraphQLObjectType({
    name: "entity",
    fields: () => ({
        entity_id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        siret: {type: new GraphQLNonNull(GraphQLString)},
        family_id: {
            type: new GraphQLNonNull(SCHEMA_FAMILY),
            resolve(parent, args) {
                return parent.family_id ? get_family_by_id(parent.family_id) : null;
            }
        }
    })
});

module.exports = {SCHEMA_ENTITIES, get_entity_by_id, get_entities_by_family};
