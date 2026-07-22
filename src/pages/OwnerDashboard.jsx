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

            const bookings = bookingRes.data.data;

            const notifications = notificationRes.data.data;

            const today = new Date().toISOString().split("T")[0];

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

                    n => !n.isRead

                ).length,

                totalFarmers: new Set(

                    bookings.map(

                        booking => booking.mobile

                    )

                ).size,

                todayIncome: 0,

                monthIncome: 0,

                totalIncome: 0

            });

            setRecentBookings(

                bookings.slice(0, 8)

            );

        }

        catch (err) {

            console.log(err);

        }

    };
        return (

        <OwnerLayout>

            <div className="owner-dashboard">

                <h1>🚜 Owner Dashboard</h1>

                <div className="owner-cards">

                    <div className="owner-card">
                        <h3>Total Bookings</h3>
                        <h2>{stats.totalBookings}</h2>
                    </div>

                    <div className="owner-card">
                        <h3>Pending</h3>
                        <h2>{stats.pending}</h2>
                    </div>

                    <div className="owner-card">
                        <h3>Accepted</h3>
                        <h2>{stats.accepted}</h2>
                    </div>

                    <div className="owner-card">
                        <h3>Completed</h3>
                        <h2>{stats.completed}</h2>
                    </div>

                    <div className="owner-card">
                        <h3>Cancelled</h3>
                        <h2>{stats.cancelled}</h2>
                    </div>

                    <div className="owner-card">
                        <h3>Live Machines</h3>
                        <h2>{stats.activeMachines}</h2>
                    </div>

                    <div className="owner-card">
                        <h3>Notifications</h3>
                        <h2>{stats.notifications}</h2>
                    </div>

                    <div className="owner-card">
                        <h3>Farmers</h3>
                        <h2>{stats.totalFarmers}</h2>
                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginTop: "30px",
                        marginBottom: "30px"
                    }}
                >

                    <Link to="/owner-bookings">
                        <button className="owner-btn">
                            📅 Booking Requests
                        </button>
                    </Link>

                    <Link to="/owner-live-tracking">
                        <button className="owner-btn">
                            📍 Live Tracking
                        </button>
                    </Link>

                    <Link to="/analytics">
                        <button className="owner-btn">
                            📊 Analytics
                        </button>
                    </Link>

                    <Link to="/notifications">
                        <button className="owner-btn">
                            🔔 Notifications
                        </button>
                    </Link>

                </div>

                <div className="recent-bookings">

                    <h2>📋 Recent Bookings</h2>

                    <table>

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
                                                textAlign: "center"
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
                                                style={{
                                                    color:

                                                        booking.status === "Accepted"

                                                            ? "green"

                                                            : booking.status === "Pending"

                                                            ? "orange"

                                                            : booking.status === "Completed"

                                                            ? "blue"

                                                            : "red",

                                                    fontWeight: "bold"
                                                }}
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

        </OwnerLayout>

    );

}

export default OwnerDashboard;