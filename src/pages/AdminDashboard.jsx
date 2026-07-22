import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalCustomers: 0,
    totalWorks: 0,
    totalIncome: 0,
    totalExpense: 0,
    profit: 0,
    totalAcres: 0,
    totalDiesel: 0,
    pendingAmount: 0,
    recentWorks: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="admin-container">

      <div className="admin-sidebar">

        <h2>🚜 Tractor Admin</h2>

        <Link to="/admin">📊 Dashboard</Link>
        <Link to="/work">➕ Add Work</Link>
        <Link to="/history">📜 Work History</Link>
        <Link to="/expenses">⛽ Expenses</Link>
        <Link to="/reports">📈 Reports</Link>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>

      </div>

      <div className="admin-content">

        <div className="topbar">
          <h1>Admin Dashboard</h1>

          <div className="admin-profile">
            👤 Admin
          </div>
        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>👥 Customers</h3>
            <h1>{dashboard.totalCustomers}</h1>
          </div>

          <div className="dashboard-card">
            <h3>🚜 Total Works</h3>
            <h1>{dashboard.totalWorks}</h1>
          </div>

          <div className="dashboard-card">
            <h3>💰 Income</h3>
            <h1>₹{dashboard.totalIncome}</h1>
          </div>

          <div className="dashboard-card">
            <h3>💸 Expenses</h3>
            <h1>₹{dashboard.totalExpense}</h1>
          </div>

          <div className="dashboard-card">
            <h3>📈 Profit</h3>
            <h1>₹{dashboard.profit}</h1>
          </div>

          <div className="dashboard-card">
            <h3>🌾 Acres Worked</h3>
            <h1>{dashboard.totalAcres}</h1>
          </div>

          <div className="dashboard-card">
            <h3>⛽ Diesel Used</h3>
            <h1>{dashboard.totalDiesel} L</h1>
          </div>

          <div className="dashboard-card">
            <h3>💵 Pending</h3>
            <h1>₹{dashboard.pendingAmount}</h1>
          </div>

        </div>

        <div className="recent-section">

          <h2>Recent Works</h2>

          <table>

            <thead>

              <tr>
                <th>Date</th>
                <th>Farmer</th>
                <th>Village</th>
                <th>Work</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {dashboard.recentWorks.length === 0 ? (

                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Data Available
                  </td>
                </tr>

              ) : (

                dashboard.recentWorks.map((work) => (

                  <tr key={work._id}>

                    <td>{work.date}</td>

                    <td>{work.farmerName}</td>

                    <td>{work.village}</td>

                    <td>{work.workType}</td>

                    <td>₹{work.totalAmount}</td>

                    <td>{work.paymentStatus}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;