const {GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLID} = require("graphql");
const {get_total_ttc_by_boat, get_total_kg_by_boat, get_average_ttc_per_boat, get_top_boats_by_ttc} = require("../../statistic");
const SCHEMA_TOP_BOAT = require("./top_boat");

const SCHEMA_BOAT_STATS = new GraphQLObjectType({
    name: 'BoatStats',
    fields: () => ({
        total_ttc_by_boat: {
            type: GraphQLFloat,
            resolve: get_total_ttc_by_boat
        },
        total_kg_by_boat: {
            type: GraphQLFloat,
            resolve: get_total_kg_by_boat
        },
        average_ttc_per_boat: {
            type: GraphQLFloat,
            resolve: get_average_ttc_per_boat
        },
        top_boats_by_ttc: {
            type: new GraphQLList(SCHEMA_TOP_BOAT),
            args: {limit: {type: GraphQLInt}},
            resolve(parent, args) {
                return get_top_boats_by_ttc(args.limit || 5);
            }
        }
    })
});

module.exports = SCHEMA_BOAT_STATS;
