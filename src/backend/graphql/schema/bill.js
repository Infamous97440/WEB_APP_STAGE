const {SCHEMA_ENTITIES, get_entity_by_id} = require("./entities");
const {db} = require("../../db");
const {GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLEnumType, GraphQLFloat, GraphQLList} = require("graphql");
const {get_total_ttc_by_buyer_id, get_bill_count_by_boat_id, get_total_ttc_by_payment_method, get_monthly_ttc_by_year_and_buyer_id, get_top_buyers_by_annual_ttc, get_total_ttc_by_payment_method_by_buyer_id} = require("../../statistic");
const {SCHEMA_BOAT, get_boat_by_id} = require("./boat");
const {SCHEMA_TTC_PAYMENT_METHOD, SCHEMA_TOTAL_TTC_MONTHLY, SCHEMA_BUYER_TTC} = require("./bill_stats");

async function get_bill_by_id(bill_id)
{
    const result = await db.query("SELECT * FROM bill WHERE bill_id = $1", [bill_id]);

    if (result) {
        console.log(result.rows);
        return result.rows[0];
    }
    return null;
}

async function get_bill_by_buyer_id(buyer_id)
{
    const result = await db.query("SELECT * FROM bill JOIN entity ON entity.entity_id = bill.buyer_id WHERE bill.buyer_id = $1", [buyer_id]);

    if (result) {
        console.log(result.rows);
        return result.rows;
    }
    return null;
}

async function get_bill_by_member_id(member_id)
{
    const result = await db.query("SELECT * FROM bill JOIN entity ON entity.entity_id = bill.member_id WHERE bill.member_id = $1", [member_id]);

    if (result) {
        console.log(result.rows);
        return result.rows;
    }
    return null;
}

const PAYMENT_METHOD_ENUM = new GraphQLEnumType({
    name: "PaymentMethod",
    values: {
        VIREMENT: {value: "virement"},
        CHEQUE: {value: "chèque"},
        ESPECES: {value: "espèces"},
    }
});

const STATUS_ENUM = new GraphQLEnumType({
    name: "Status",
    values: {
        ATTENTE: {value: "en attente"},
        CONTROLE: {value: "controlée"},
        VALIDE: {value: "validée"},
        INCOMPLETE: {value: "incomplète"},
    }
});

const SCHEMA_BILL = new GraphQLObjectType({
    name: "bill",
    fields: () => ({
        bill_id: {type: GraphQLID},
        payment_method: {type: new GraphQLNonNull(PAYMENT_METHOD_ENUM)},
        status: {type: new GraphQLNonNull(STATUS_ENUM)},
        boat_id: {
            type: SCHEMA_BOAT,
            resolve(parent, args) {
                return parent.boat_id ? get_boat_by_id(parent.boat_id) : null;
            }
        },
        buyer_id: {
            type: SCHEMA_ENTITIES,
            resolve(parent, args) {
                return parent.buyer_id ? get_entity_by_id(parent.buyer_id) : null;
            }
        },
        member_id: {
            type: SCHEMA_ENTITIES,
            resolve(parent, args) {
                return parent.member_id ? get_entity_by_id(parent.member_id) : null;
            }
        },
        total: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.total).toFixed(2);
            }
        },
        total_ttc: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.total_ttc).toFixed(2);
            }
        },
        total_kg: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.total_kg).toFixed(2);
            }
        },
        total_epv: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.total_epv).toFixed(2);
            }
        },
        paid_on: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(parent, args) {
                return new Date(parent.paid_on).toISOString().slice(0, 10);
            }
        },
        billing_date: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(parent, args) {
                return new Date(parent.billing_date).toISOString().slice(0, 10);
            }
        },
        created_at: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.created_at ? new Date(parent.created_at).toISOString() : Date.now();
            }
        },
        updated_at: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.updated_at ? new Date(parent.updated_at).toISOString() : Date.now();
            }
        },
        fishing_paper: {type: GraphQLString},
        delivery_address: {type: GraphQLString},
        bill_number: {type: new GraphQLNonNull(GraphQLString)},
        bill_count_by_boat: {
            type: GraphQLInt,
            resolve(parent, args) {
                return get_bill_count_by_boat_id(parent.boat_id);
            }
        },
        total_ttc_by_buyer_id: {
            type: GraphQLFloat,
            resolve(parent, args) {
                return get_total_ttc_by_buyer_id(parent.buyer_id);
            }
        },
        total_ttc_by_payment_method: {
            type: new GraphQLList(SCHEMA_TTC_PAYMENT_METHOD),
            resolve(parent, args) {
                return get_total_ttc_by_payment_method();
            }
        },
        monthly_ttc_by_year_and_buyer_id: {
            type: new GraphQLList(SCHEMA_TOTAL_TTC_MONTHLY),
            resolve(parent, args) {
                return get_monthly_ttc_by_year_and_buyer_id(new Date(parent.billing_date).getFullYear(), parent.buyer_id);
            }
        },
        top_buyers_by_annual_ttc: {
            type: new GraphQLList(SCHEMA_BUYER_TTC),
            resolve(parent, args) {
                return get_top_buyers_by_annual_ttc(new Date(parent.billing_date).getFullYear(), 5);
            }
        },
        total_ttc_by_payment_method_by_buyer_id: {
            type: new GraphQLList(SCHEMA_TTC_PAYMENT_METHOD),
            resolve(parent, args) {
                return get_total_ttc_by_payment_method_by_buyer_id(parent.buyer_id);
            }
        }
    })
});

module.exports = {SCHEMA_BILL, get_bill_by_buyer_id, get_bill_by_id, get_bill_by_member_id};
