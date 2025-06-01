const {db} = require("../../db");
const {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLEnumType} = require("graphql");

const TRANSFORMATION_LEVEL_ENUM = new GraphQLEnumType({
    name: "transformation_level_enum",
    values: {
        NIVEAU_0: {value: "Niveau 0"},
        NIVEAU_1: {value: "Niveau 1"},
        NIVEAU_2: {value: "Niveau 2"},
        SPIRULINE: {value: "Spiruline"}, 
    }
});

async function get_presentation_by_id(id)
{
    try{
        const result = await db.query("SELECT * FROM presentation WHERE presentation.id = $1", [id]);

        if (result) {
            console.log(result.rows);
            return result.rows[0];
        }
        return null;
    } catch(err) {
        console.log(err);
        return null;
    }
}

const SCHEMA_PRESENTATION = new GraphQLObjectType({
    name: "presentation",
    fields: () => ({
        id: {type: GraphQLID},
        presentation_code: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        transformation: {type: new GraphQLNonNull(TRANSFORMATION_LEVEL_ENUM)}
    })
});

module.exports = {SCHEMA_PRESENTATION, get_presentation_by_id};
