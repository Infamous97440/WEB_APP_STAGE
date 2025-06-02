import {gql, useQuery} from '@apollo/client';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend} from 'recharts';

const GET_BOAT_STATS_QUERY = gql`
    query GetBoatStats {
        boat_stats {
            total_ttc_by_boat
            total_kg_by_boat
            average_ttc_per_boat
            top_boats_by_ttc { name, total_ttc }
        }
    }
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA66CC'];

const BoatStats = () => {
    const { loading, error, data } = useQuery(GET_BOAT_STATS_QUERY);

    if (loading)
        return <p>Chargement...</p>;
    if (error)
        return <p><b>Erreur : {error?.message}</b></p>;
    if (!data?.boat_stats)
        return <p><b>Données indisponibles</b></p>;
    const stats = data.boat_stats;
    return (
        <div>
            <h2>Statistiques globales sur les bateaux</h2>
            <ul>
                <li><b>Total TTC (tous bateaux) :</b> {stats.total_ttc_by_boat} €</li>
                <li><b>Total KG :</b> {stats.total_kg_by_boat} kg</li>
                <li><b>Moyenne TTC / bateau :</b> {stats.average_ttc_per_boat.toFixed(2)} €</li>
            </ul>
            <h3>Top 5 des bateaux par TTC</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.top_boats_by_ttc} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                    <Legend />
                    <Bar dataKey="total_ttc" name="TTC (€)">
                        {stats.top_boats_by_ttc.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BoatStats;
