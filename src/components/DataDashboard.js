import { useEffect, useState } from 'react';
import '../styles/DataDashboard.css';
import { ReactComponent as Expand } from "../svg/Expand.svg"

function DataDashboard() {
  const [dashboardData, setDashboardData] = useState([])
  useEffect(() => {
    fetchDashboardData()
  }, [])
  const fetchDashboardData = async () => {
    const data = await fetch("../data.json")
    const res = await data.json()
    setDashboardData(res)
  }
  return (
    <div className="app">
      <h1>Data Dashboard</h1>
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
            {dashboardData.map((item) => {
              const engagement = (item.likes || 0) + (item.shares || 0) + (item.comments || 0);
              const reach = ((item.followers || 0) * engagement) / 100;
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{engagement}</td>
                  <td>{reach.toFixed(2)}</td>
                  <td>{item.category}</td>
                  <td>{item.location}</td>
                  <td><Expand width="10" height="10" /></td>
                </tr>
              );
            })}
          </tbody>
      </table>

    </div>
  );
}

export default DataDashboard;
