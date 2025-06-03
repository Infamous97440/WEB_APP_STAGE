import {gql, useQuery} from '@apollo/client';
import {BarChart, Bar, XAxis, YAxis} from 'recharts';
import {Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const GET_BILL_LINE_QUERY = gql`
    query GetBillLineById($id: ID!) {
        getBillLineById(id: $id) {
            id
            bill_id {
                bill_id
                boat_id {name}
                buyer_id {name}
                created_at
                updated_at
                fishing_paper
                delivery_address
                bill_count_by_boat
                total_kg
                total_ttc_by_buyer_id
                total_ttc_by_payment_method_by_buyer_id{payment_method, total_ttc}
                total_ttc_by_payment_method{payment_method, total_ttc}
                top_buyers_by_annual_ttc{name, total_ttc}
                monthly_ttc_by_year_and_buyer_id{month, total}
                billing_date
            }
            lot_number
            fish_id { fish_id }
            fish_status
            quantity
            unit_price
            total_price
            total_epv
            code_fao
            name
            presentation
            coef_epv
            fresh_grade
            created_at
            updated_at
        }
    }
`;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const BillLine = ({id}) => {
    const {loading, error, data} = useQuery(GET_BILL_LINE_QUERY, {variables: {id}});

    if (loading)
        return <p>Chargement...</p>;
    if (error)
        return <p><b>Erreur : {error.message}</b></p>;
    if (!data?.getBillLineById)
        return <p><b>Données indisponibles</b></p>;
    const bill = data.getBillLineById;
    const globalPayments = bill.bill_id.total_ttc_by_payment_method;
    const buyerPayments = bill.bill_id.total_ttc_by_payment_method_by_buyer_id;
    const ratioData = buyerPayments.map(buyerPay => {
        const globalPay = globalPayments.find(p => p.payment_method === buyerPay.payment_method);
        const ratio = globalPay && globalPay.total_ttc !== 0 ? buyerPay.total_ttc / globalPay.total_ttc : 0;

        return {
            payment_method: buyerPay.payment_method,
            ratio,
            buyer_ttc: buyerPay.total_ttc,
            total_ttc: globalPay?.total_ttc || 0,
        };
    });

    return (
        <div id="main">
            <h1>Fiche de Facturation #{bill.id}</h1>
            <ul id="BillLine-list">
                <li><b>Client : </b> {bill.bill_id.buyer_id.name}</li>
                <li><b>Bateau : </b> {bill.bill_id.boat_id.name}</li>
                <li><b>Nombre total de factures pour ce bateau : </b> {bill.bill_id.bill_count_by_boat}</li>
                <li><b>Poisson : </b> {bill.name}</li>
                <li><b>Qualité : </b> {bill.fresh_grade}</li>
                <li><b>État : </b> {bill.fish_status}</li>
                <li><b>Quantité : </b> {bill.quantity} kg</li>
                <li><b>Prix unitaire : </b> {bill.unit_price} €</li>
                <li><b>Prix total : </b> {bill.total_price} €</li>
                <li><b>Total TTC par ce client : </b> {bill.bill_id.total_ttc_by_buyer_id} €</li>
                <li><b>Total kg par bateau : </b> {bill.bill_id.total_kg} kg</li>
                <li><b>date de la facture : </b>{bill.bill_id.billing_date}</li>
                <li style={{marginTop: '2rem'}}>
                    <b>Évolution mensuelle du TTC pour ce client :</b>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={bill.bill_id.monthly_ttc_by_year_and_buyer_id} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="month"/>
                            <YAxis />
                            <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                            <Legend />
                            <Bar dataKey="total" fill="#82ca9d" name="TTC mensuel" />
                        </BarChart>
                    </ResponsiveContainer>
                </li>
                <li style={{ marginTop: '2rem' }}>
                    <b>Top 5 acheteurs (TTC année de la date de facturation)</b>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={bill.bill_id.top_buyers_by_annual_ttc} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                            <Legend />
                            <Bar dataKey="total_ttc" fill="#8884d8" name="TTC annuel">
                                {bill.bill_id.top_buyers_by_annual_ttc.map((entry, index) => (
                                    <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </li>
                <li>
                    <b>total_ttc_by_payment_method_by_buyer_id :</b>
                    <ul>
                        {buyerPayments.map((p, i) => (
                            <li className="bat" key={i}>
                                {p.payment_method} — {p.total_ttc.toFixed(2)} €
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <b>total_ttc_by_payment_method (global) :</b>
                    <ul>
                        {globalPayments.map((pay, i) => (
                            <li className="bat" key={i}>
                                {pay.payment_method} — {pay.total_ttc.toFixed(2)} €
                            </li>
                        ))}
                    </ul>
                </li>
                <li style={{ marginTop: '2rem' }}>
                    <b>Part TTC de ce client par méthode de paiement (par rapport au total global)</b>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ratioData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="payment_method" />
                            <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                            <Tooltip formatter={(value, name, props) =>
                                `${(value * 100).toFixed(1)}% (${props.payload.buyer_ttc.toFixed(2)} € / ${props.payload.total_ttc.toFixed(2)} €)`
                            } />
                            <Legend />
                            <Bar dataKey="ratio" fill="#8884d8" name="Part TTC (%)">
                                {ratioData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </li>
            </ul>
        </div>
    );
};

export default BillLine;
