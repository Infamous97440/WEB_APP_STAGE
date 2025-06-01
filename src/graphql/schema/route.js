const {GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList} = require("graphql");
const {SCHEMA_ENTITIES, get_entity_by_id, get_entities_by_family} = require("./entities");
const {SCHEMA_BOAT, get_boat_by_id, get_boat_by_owner_id} = require("./boat");
const {SCHEMA_FAMILY, get_family_by_id} = require("./family");
const {SCHEMA_FISH, get_fish_by_id} = require("./fish");
const {SCHEMA_BILL, get_bill_by_buyer_id, get_bill_by_id, get_bill_by_member_id} = require("./bill");
const {SCHEMA_BILL_LINE, get_bill_line_by_id} = require("./bill_line");
const {SCHEMA_SPECIES_FAMILY, get_species_by_id} = require("./species_family");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        family: {
            type: SCHEMA_FAMILY,
            args: {family_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_family_by_id(args.family_id);
            }
        },
        boat: {
            type: SCHEMA_BOAT,
            args: {boat_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_boat_by_id(args.boat_id);
            }
        },
        boatsOwnBy: {
            type: new GraphQLList(SCHEMA_BOAT),
            args: {owner_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_boat_by_owner_id(args.owner_id);
            }
        },
        entities: {
            type: SCHEMA_ENTITIES,
            args: {entity_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_entity_by_id(args.entity_id);
            }
        },
        getEntitiesByFamily: {
            type: new GraphQLList(SCHEMA_ENTITIES),
            args: {family_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_entities_by_family(args.family_id);
            }
        },
        getSpeciesById: {
            type: SCHEMA_SPECIES_FAMILY,
            args: {species_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_species_by_id(args.species_id);
            }
        },
        getFishById: {
            type: SCHEMA_FISH,
            args: {fish_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_fish_by_id(args.fish_id);
            }
        },
        getBillById: {
            type: SCHEMA_BILL,
            args: {bill_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_bill_by_id(args.bill_id);
            }
        },
        getBillsByBuyer: {
            type: new GraphQLList(SCHEMA_BILL),
            args: {buyer_id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_bill_by_buyer_id(args.buyer_id);
            }
        },
        getBillLineById: {
            type: SCHEMA_BILL_LINE,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return get_bill_line_by_id(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
});
