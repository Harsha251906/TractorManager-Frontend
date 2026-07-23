import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OwnerLayout from "../layouts/OwnerLayout";
import api from "../services/api";

import "../styles/OwnerDashboard.css";

function OwnerDashboard() {

    const [stats, setStats] = useState({
        totalBookings: 0,
        pending: 0,
        accepted: 0,
        completed: 0,
        cancelled: 0,
        notifications: 0,
        activeMachines: 0,
        totalFarmers: 0,
        todayIncome: 0,
        monthIncome: 0,
        totalIncome: 0
    });

    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const bookingRes = await api.get("/bookings");
            const notificationRes = await api.get("/notifications");

            const bookings = bookingRes.data.data || [];
            const notifications = notificationRes.data.data || [];

            let pending = 0;
            let accepted = 0;
            let completed = 0;
            let cancelled = 0;
            let activeMachines = 0;

            bookings.forEach((booking) => {

                if (booking.status === "Pending") pending++;

                if (booking.status === "Accepted") {
                    accepted++;
                    activeMachines++;
                }

                if (booking.status === "Completed") completed++;

                if (booking.status === "Cancelled") cancelled++;

            });

            setStats({

                totalBookings: bookings.length,
                pending,
                accepted,
                completed,
                cancelled,
                activeMachines,

                notifications: notifications.filter(
                    (n) => !n.isRead
                ).length,

                totalFarmers: new Set(
                    bookings.map((b) => b.mobile)
                ).size,

                todayIncome: 0,
                monthIncome: 0,
                totalIncome: 0

            });

            setRecentBookings(bookings.slice(0, 5));

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <OwnerLayout>

            <div className="owner-dashboard">

                {/* HERO */}

                <div className="owner-hero">

                    <div>

                        <h1>🚜 Welcome Owner</h1>

                        <p>

                            Manage your tractors, booking requests,
                            farmers and earnings from one dashboard.

                        </p>

                        <Link to="/owner-bookings">

                            <button className="owner-btn">

                                View Bookings

                            </button>

                        </Link>

                    </div>

                    <img

                        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"

                        alt="tractor"

                    />

                </div>

                {/* STATS */}

                <h2 className="section-title">

                    Dashboard Overview

                </h2>

                <div className="owner-stats">

                    <div className="dashboard-card">
                        <h3>Total Bookings</h3>
                        <h2>{stats.totalBookings}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Pending</h3>
                        <h2>{stats.pending}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Accepted</h3>
                        <h2>{stats.accepted}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Completed</h3>
                        <h2>{stats.completed}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Cancelled</h3>
                        <h2>{stats.cancelled}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Live Machines</h3>
                        <h2>{stats.activeMachines}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Farmers</h3>
                        <h2>{stats.totalFarmers}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Notifications</h3>
                        <h2>{stats.notifications}</h2>
                    </div>

                </div>

                {/* QUICK ACTIONS */}

                <h2 className="section-title">

                    Quick Actions

                </h2>

                <div className="owner-actions">

                    <Link className="action-box" to="/owner-bookings">

                        <h1>📅</h1>

                        <h3>Booking Requests</h3>

                    </Link>

                    <Link className="action-box" to="/owner-live-tracking">

                        <h1>📍</h1>

                        <h3>Live Tracking</h3>

                    </Link>

                    <Link className="action-box" to="/analytics">

                        <h1>📊</h1>

                        <h3>Analytics</h3>

                    </Link>

                    <Link className="action-box" to="/notifications">

                        <h1>🔔</h1>

                        <h3>Notifications</h3>

                    </Link>

                </div>

                {/* ANALYTICS */}

                <h2 className="section-title">

                    Analytics

                </h2>

                <div className="analytics-grid">

                    <div className="analytics-card">

                        <h4>Booking Completion</h4>

                        <h1>{stats.completed}</h1>

                        <div className="progress">

                            <div

                                className="progress-fill"

                                style={{
                                    width: `${
                                        stats.totalBookings
                                            ? (stats.completed /
                                                  stats.totalBookings) *
                                              100
                                            : 0
                                    }%`,
                                }}

                            />

                        </div>

                    </div>

                    <div className="analytics-card">

                        <h4>Pending Bookings</h4>

                        <h1>{stats.pending}</h1>

                        <div className="progress">

                            <div

                                className="progress-fill"

                                style={{
                                    width: `${
                                        stats.totalBookings
                                            ? (stats.pending /
                                                  stats.totalBookings) *
                                              100
                                            : 0
                                    }%`,
                                }}

                            />

                        </div>

                    </div>

                    <div className="analytics-card">

                        <h4>Active Machines</h4>

                        <h1>{stats.activeMachines}</h1>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{ width: "75%" }}
                            />

                        </div>

                    </div>

                </div>
                                {/* RECENT BOOKINGS */}

                <div className="recent-bookings">

                    <h2>📋 Recent Bookings</h2>

                    <div className="table-container">

                        <table className="owner-table">

                            <thead>

                                <tr>

                                    <th>Farmer</th>
                                    <th>Machine</th>
                                    <th>Village</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    recentBookings.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "30px"
                                                }}
                                            >

                                                No Bookings Available

                                            </td>

                                        </tr>

                                    )

                                    :

                                    recentBookings.map((booking) => (

                                        <tr key={booking._id}>

                                            <td>{booking.farmerName}</td>

                                            <td>{booking.machineType}</td>

                                            <td>{booking.village}</td>

                                            <td>{booking.bookingDate}</td>

                                            <td>{booking.bookingTime}</td>

                                            <td>

                                                <span
                                                    className={

                                                        booking.status === "Pending"

                                                            ? "status-pending"

                                                            : booking.status === "Accepted"

                                                            ? "status-accepted"

                                                            : booking.status === "Completed"

                                                            ? "status-completed"

                                                            : "status-cancelled"

                                                    }
                                                >

                                                    {booking.status}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* LIVE ACTIVITY */}

                <div className="live-activity">

                    <h2>⚡ Live Activity</h2>

                    <div className="activity-row">

                        <div className="activity-icon">

                            🚜

                        </div>

                        <div>

                            <h4>

                                Active Machines

                            </h4>

                            <p>

                                {stats.activeMachines} tractors are currently working.

                            </p>

                        </div>

                    </div>

                    <div className="activity-row">

                        <div className="activity-icon">

                            📅

                        </div>

                        <div>

                            <h4>

                                Pending Requests

                            </h4>

                            <p>

                                {stats.pending} booking requests are waiting for approval.

                            </p>

                        </div>

                    </div>

                    <div className="activity-row">

                        <div className="activity-icon">

                            👨‍🌾

                        </div>

                        <div>

                            <h4>

                                Registered Farmers

                            </h4>

                            <p>

                                Total Farmers : {stats.totalFarmers}

                            </p>

                        </div>

                    </div>

                    <div className="activity-row">

                        <div className="activity-icon">

                            🔔

                        </div>

                        <div>

                            <h4>

                                Notifications

                            </h4>

                            <p>

                                {stats.notifications} unread notifications.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </OwnerLayout>

    );

}

export default OwnerDashboard;