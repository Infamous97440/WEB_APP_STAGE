const {db} = require("./db");

async function get_total_ttc_by_buyer_id(id)
{
    try {
        const result = await db.query("SELECT SUM(total_ttc) FROM bill WHERE buyer_id = $1", [id]);
        const sum = result.rows[0]?.sum;
        return sum ? parseFloat(sum) : 0;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_total_ttc_by_boat()
{
    try {
        const result = await db.query("SELECT boat_id, SUM(total_ttc) as total_ttc FROM bill GROUP BY boat_id ORDER BY total_ttc DESC");
        const total = result.rows[0]?.total_ttc;
        return total ? parseFloat(total) : 0;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_total_kg_by_boat()
{
    try {
        const result = await db.query("SELECT boat_id, SUM(total_kg) as total_kg FROM bill GROUP BY boat_id ORDER BY total_kg DESC");
        const kg = result.rows[0]?.total_kg;
        return kg ? parseFloat(kg) : 0;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_bill_count_by_boat_id(boat_id) {
    try {
        const result = await db.query("SELECT COUNT(*) as bill_count FROM bill WHERE boat_id = $1", [boat_id]);
        const count = result.rows[0]?.bill_count;
        return count ? parseInt(count, 10) : 0;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_top_boats_by_ttc(limit = 5)
{
    try {
        if (isNaN(limit))
            return null;
        const result = await db.query(`SELECT boat.name, SUM(bill.total_ttc) AS total_ttc FROM bill JOIN boat ON bill.boat_id = boat.boat_id
            GROUP BY boat.name ORDER BY total_ttc DESC LIMIT $1`, [limit]);

        if (result) {
            console.log(result.rows);
            return result.rows;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_average_ttc_per_boat()
{
    try {
        const result = await db.query("SELECT boat_id, AVG(total_ttc) as average_ttc FROM bill GROUP BY boat_id ORDER BY average_ttc DESC");
        const avg = result.rows[0]?.average_ttc;
        return avg ? parseFloat(avg) : 0;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_total_ttc_by_payment_method()
{
    try {
        const result = await db.query(`
            SELECT payment_method, SUM(total_ttc) as total_ttc FROM bill GROUP BY payment_method
        `);
        if (result) {
            console.log(result.rows);
            return result.rows;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_total_ttc_by_payment_method_by_buyer_id(buyer_id)
{
    try {
        const result = await db.query(`SELECT payment_method, SUM(total_ttc) as total_ttc FROM bill
            WHERE buyer_id = $1 GROUP BY payment_method`, [buyer_id]);

        if (result) {
            console.log(result.rows);
            return result.rows;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_monthly_ttc_by_year_and_buyer_id(year, buyer_id)
{
    try {
        const result = await db.query(`
            SELECT EXTRACT(MONTH FROM billing_date) AS month, SUM(total_ttc) as total
            FROM bill
            WHERE EXTRACT(YEAR FROM billing_date) = $1 AND buyer_id = $2
            GROUP BY month ORDER BY month ASC
        `, [year, buyer_id]);

        console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get_top_buyers_by_annual_ttc(year, limit = 5) {
    try {
        const result = await db.query(
            `SELECT entity.name, SUM(bill.total_ttc)::numeric(12,2) AS total_ttc
            FROM bill JOIN entity ON bill.buyer_id = entity.entity_id WHERE EXTRACT(YEAR FROM bill.billing_date) = $1
            GROUP BY entity.name ORDER BY total_ttc DESC LIMIT $2`, [year, limit]
        );
        return result?.rows || null;
    } catch (err) {
        console.error("Erreur lors de la récupération des top acheteurs :", err);
        return null;
    }
}


module.exports = {
    get_total_ttc_by_buyer_id,
    get_total_ttc_by_boat,
    get_total_kg_by_boat,
    get_bill_count_by_boat_id,
    get_top_boats_by_ttc,
    get_average_ttc_per_boat,
    get_total_ttc_by_payment_method,
    get_monthly_ttc_by_year_and_buyer_id,
    get_top_buyers_by_annual_ttc,
    get_total_ttc_by_payment_method_by_buyer_id
};