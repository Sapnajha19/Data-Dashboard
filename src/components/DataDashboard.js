import { useEffect, useState } from 'react';
import '../styles/DataDashboard.css';
import { ReactComponent as Expand } from "../svg/Expand.svg"
import ItemDetails from './ItemDetails';
import Modal from '../genericComponents/Modal';

function DataDashboard() {
    const [dashboardData, setDashboardData] = useState([])
    const [selectedItemId, setSelectedItemId] = useState(null); 
    useEffect(() => {
        fetchDashboardData()
    }, [])
    const fetchDashboardData = async () => {
        const data = await fetch("../data.json")
        const res = await data.json()
        setDashboardData(res)
    }
    const closeItemDetailsModal = () => {
        setSelectedItemId(null)
    }
    const ItemDetailsModal = Modal(ItemDetails)
    return (
        <div className="dashboard">
            <h1 className="heading">Data Dashboard</h1>
            <table border="1" className="dashboardTable">
                <thead>
                    <th>Name/Title</th>
                    <th>Engagement score</th>
                    <th>Reach</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Button</th>
                </thead>
                <tbody>
                    {dashboardData?.map((item) => {
                        const engagement = (item.likes || 0) + (item.shares || 0) + (item.comments || 0);
                        const reach = ((item.followers || 0) * engagement) / 100;
                        return (
                            <tr key={item?.id}>
                                <td>{item?.name}</td>
                                <td>{engagement}</td>
                                <td>{reach.toFixed(2)}</td>
                                <td>{item?.category}</td>
                                <td>{item?.location}</td>
                                <td title="View Details"><Expand className="expand" width="10" height="10"  onClick={() => setSelectedItemId(item.id)}  /></td>
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
