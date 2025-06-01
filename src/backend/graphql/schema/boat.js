const {SCHEMA_ENTITIES, get_entity_by_id} = require("./entities");
const {db} = require("../../db");
const {GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLList} = require("graphql");

async function get_boat_by_id(boat_id)
{
    const result = await db.query("SELECT * FROM boat WHERE boat_id = $1", [boat_id]);

    if (result) {
        console.log(result.rows);
        return result.rows[0];
    }
    return null;
}

async function get_boat_by_owner_id(owner_id)
{
    const result = await db.query("SELECT * FROM boat JOIN entity ON entity.entity_id = boat.owner_id WHERE boat.owner_id = $1", [owner_id]);

    if (result) {
        console.log(result.rows);
        return result.rows;
    }
    return null;
}

const SCHEMA_BOAT = new GraphQLObjectType({
    name: "boat",
    fields: () => ({
        boat_id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        len_boat: {type: new GraphQLNonNull(GraphQLInt)},
        matricule: {type: new GraphQLNonNull(GraphQLString)},
        owner_id: {
            type: new GraphQLNonNull(SCHEMA_ENTITIES),
            resolve(parent, args) {
                return parent.owner_id ? get_entity_by_id(parent.owner_id) : null;
            }
        },
        brut_gauge_ums: {type: GraphQLInt},
        power_motor_cv: {type: GraphQLInt},
        power_motor_kw: {type: GraphQLInt},
        fishing_type: {type: GraphQLString},
    })
});

module.exports = {SCHEMA_BOAT, get_boat_by_id, get_boat_by_owner_id};
