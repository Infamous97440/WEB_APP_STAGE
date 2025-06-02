const {GraphQLString, GraphQLObjectType, GraphQLFloat} = require("graphql");

const SCHEMA_TOP_BOAT = new GraphQLObjectType({
    name: 'TopBoat',
    fields: () => ({
        name: {type: GraphQLString},
        total_ttc: {type: GraphQLFloat}
    })
});

module.exports = SCHEMA_TOP_BOAT;
