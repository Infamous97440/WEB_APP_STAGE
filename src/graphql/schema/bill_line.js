const {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLEnumType, GraphQLInt, GraphQLFloat} = require("graphql");
const {SCHEMA_BILL, get_bill_by_id} = require("./bill");
const {SCHEMA_FISH, get_fish_by_id} = require("./fish");
const {db} = require("../../backend/db");


async function get_bill_line_by_id(id)
{
    try {
        const result = await db.query("SELECT * FROM bill_line WHERE id = $1", [id]);

        if (result) {
            console.log(result.rows[0]);
            return result.rows[0];
        }
        return null;
    } catch(err) {
        console.log(err);
        return null;
    }
}

const FISH_STATUS = new GraphQLEnumType({
    name: "FishStatus",
    values: {
        FRAIS: {value: "frais"},
        CONGELE: {value: "congelé"},
        SPIRULINE: {value: "spiruline"}, 
    }
});

const FRESH_GRADE_ENUM = new GraphQLEnumType({  
    name: "FreshGradeEnum",
    values: {
        A: {value: "A"},
        B: {value: "B"},
        C: {value: "C"},
        E: {value: "E"}
    }
});

const SCHEMA_BILL_LINE = new GraphQLObjectType({
    name: "bill_line",
    fields: () => ({
        id: {type: GraphQLID},
        bill_id: {
            type: SCHEMA_BILL,
            resolve(parent, args) {
                return parent.bill_id ? get_bill_by_id(parent.bill_id) : null;
            }
        },
        lot_number: {type: new GraphQLNonNull(GraphQLString)},
        fish_id: {
            type: SCHEMA_FISH,
            resolve(parent, args) {
                return parent.fish_id ? get_fish_by_id(parent.fish_id) : null;
            }
        },
        fish_status: {type: new GraphQLNonNull(FISH_STATUS)},
        quantity: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.quantity).toFixed(2);
            }
        },
        unit_price: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.unit_price).toFixed(2);
            }
        },
        total_price: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.unit_price).toFixed(2);
            }
        },
        total_epv: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.unit_price).toFixed(2);
            }
        },
        code_fao: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        presentation: {type: new GraphQLNonNull(GraphQLString)},
        coef_epv: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve(parent, args) {
                return parseFloat(parent.unit_price).toFixed(2);
            }
        },
        fresh_grade: {type: new GraphQLNonNull(FRESH_GRADE_ENUM)},
        created_at: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.created_at ? new Date(parent.created_at).toISOString() : Date(parent.created_at).now(); 
            }
        },
        updated_at: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.updated_at ? new Date(parent.created_at).toISOString() : Date(parent.created_at).now(); 
            }
        },
    })
});

module.exports = {SCHEMA_BILL_LINE, get_bill_line_by_id};
