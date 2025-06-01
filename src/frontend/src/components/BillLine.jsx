import {gql, useQuery} from '@apollo/client';
import {Chart} from 'chart.js'; //pour faire des graphique

const GET_BILL_LINE_QUERY = gql`
    query GetBillLineById($id: ID!) {
        getBillLineById(id: $id) {
            id
            bill_id {
                bill_id
                created_at
                updated_at
                fishing_paper
                delivery_address
            }
            lot_number
            fish_id {fish_id}
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

const BillLine = ({id}) => {
    const {loading, error, data} = useQuery(GET_BILL_LINE_QUERY, {variables: {id: id}});

    if (loading)
        return <p>Chargement ...</p>;
    if (error)
        return <p><b>ERREUR: {error.message}</b></p>;
    if (!data.getBillLineById)
        return <p><b>Nothing there!</b></p>;
    return (
        <div id='main'>
            <ul id='BillLine-list'>
                <h1>ID = {data.getBillLineById.id}</h1>
                <h2>Fish Id = {data.getBillLineById.fish_id.fish_id}</h2>
                <h2>Fish Name = {data.getBillLineById.name} | quality: {data.getBillLineById.fresh_grade}</h2>
                <h2>Fish Status = {data.getBillLineById.fish_status}</h2>
                <h2>Quantity = {data.getBillLineById.quantity}kg</h2>
                <h2>Unit Price = {data.getBillLineById.unit_price}€</h2>
                <h2>Total Price = {data.getBillLineById.total_price}€</h2>
            </ul>
        </div>
    )
}

export default BillLine;
