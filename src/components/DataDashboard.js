import { useEffect, useState } from 'react';
import '../styles/DataDashboard.css';
import { ReactComponent as Expand } from "../svg/Expand.svg"
import ItemDetails from './ItemDetails';
import Modal from '../genericComponents/Modal';
import Sort from '../genericComponents/Sort';
import { SORT_OPTIONS } from '../utils/constants';

function DataDashboard() {
    const [dashboardData, setDashboardData] = useState([])
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    useEffect(() => {
        fetchDashboardData()
    }, [])
    const fetchDashboardData = async () => {
        const data = await fetch("../data.json");
        const res = await data.json();

        // Calculate engagement and reach once and set the dashboard data
        const calculatedData = res.map(item => {
            const engagement = (item.likes || 0) + (item.shares || 0) + (item.comments || 0);
            const reach = ((item.followers || 0) * engagement) / 100;
            return {
                ...item,
                engagement,
                reach
            };
        });
        setDashboardData(calculatedData);
    };
    const closeItemDetailsModal = () => {
        setSelectedItemId(null)
    }
    const ItemDetailsModal = Modal(ItemDetails)

    // Sorting logic
    const sortedData = sortBy !== null
        ? [...dashboardData].sort((a, b) => {
            const aValue = sortBy === 0 ? a.engagement : a.reach;
            const bValue = sortBy === 0 ? b.engagement : b.reach;

            return sortOrder === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        })
        : dashboardData;
    return (
        <div className="dashboard">
            <h1 className="heading">Data Dashboard</h1>
            <Sort sortOptions={SORT_OPTIONS} sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <table border="1" className="dashboardTable">
                <thead>
                    <tr>
                        <th>Name/Title</th>
                        <th>Engagement score</th>
                        <th>Reach</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData?.map((item) => {
                        return (
                            <tr key={item?.id}>
                                <td>{item?.name}</td>
                                <td>{item?.engagement}</td>
                                <td>{item?.reach.toFixed(2)}</td>
                                <td>{item?.category}</td>
                                <td>{item?.location}</td>
                                <td title="View Details"><Expand className="expand" width="10" height="10" onClick={() => setSelectedItemId(item.id)} /></td>
                                {selectedItemId === item?.id && <ItemDetailsModal key={item?.id} isOpen={selectedItemId} close={closeItemDetailsModal} data={item} />}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DataDashboard;
