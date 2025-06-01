const {db} = require("../../backend/db");
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

const SCHEMA_PRESENTATION = new GraphQLObjectType({
    name: "presentation",
    fields: () => ({
        id: {type: GraphQLID},
        presentation_code: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        transformation: {type: new GraphQLNonNull(TRANSFORMATION_LEVEL_ENUM)}
    })
});

module.exports = {SCHEMA_PRESENTATION};
