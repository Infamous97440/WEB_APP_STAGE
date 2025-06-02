const {GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLID} = require("graphql");

const SCHEMA_TTC_PAYMENT_METHOD = new GraphQLObjectType({
    name: "PaymentMethodTTC",
    fields: {
        payment_method: {type: GraphQLString},
        total_ttc: {type: GraphQLFloat}
    }
});

const SCHEMA_TOTAL_TTC_MONTHLY = new GraphQLObjectType({
    name: "MonthlyTTC",
    fields: {
        month: {
            type: GraphQLString,
            resolve(parent, args) {
                const months = [
                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                ];
                return months[parent.month - 1];
            }
        },
        total: {type: GraphQLFloat}
    }
});

const SCHEMA_BUYER_TTC = new GraphQLObjectType({
    name: "BuyerTTC",
    fields: {
        name: {type: GraphQLString},
        total_ttc: {
            type: GraphQLFloat,
            resolve(parent, args) {
                return parseFloat(parent.total_ttc);
            }
        }
    }
});

module.exports = {SCHEMA_BUYER_TTC, SCHEMA_TOTAL_TTC_MONTHLY, SCHEMA_TTC_PAYMENT_METHOD};
