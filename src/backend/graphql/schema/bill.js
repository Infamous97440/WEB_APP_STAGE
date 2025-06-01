const {SCHEMA_ENTITIES, get_entity_by_id} = require("./entities");
const {db} = require("../../db");
const {GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLEnumType, GraphQLFloat} = require("graphql");

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
        boat_id: {type: new GraphQLNonNull(GraphQLInt)},
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
    })
});

module.exports = {SCHEMA_BILL, get_bill_by_buyer_id, get_bill_by_id, get_bill_by_member_id};
