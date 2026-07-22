import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import OwnerLayout from "../layouts/OwnerLayout";
import OwnerTopBar from "../components/OwnerTopBar";
import OwnerCharts from "../components/OwnerCharts";
import EarningsAnalytics from "../components/EarningsAnalytics";
import LiveActivity from "../components/LiveActivity";

import api from "../services/api";

import "../styles/OwnerDashboard.css";

function Dashboard() {

    const [bookings, setBookings] = useState([]);

    const [stats, setStats] = useState({

        total: 0,
        pending: 0,
        accepted: 0,
        completed: 0,
        cancelled: 0,
        earnings: 0

    });

    const [weather] = useState({

        city: "Pondicherry",
        temp: 31,
        humidity: 68,
        wind: 12

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/bookings/owner");

            const bookingData = res.data.data || [];

            setBookings(bookingData);

            let pending = 0;
            let accepted = 0;
            let completed = 0;
            let cancelled = 0;
            let earnings = 0;

            bookingData.forEach((booking) => {

                switch (booking.status) {

                    case "Pending":
                        pending++;
                        break;

                    case "Accepted":
                        accepted++;
                        break;

                    case "Completed":
                        completed++;
                        earnings += Number(booking.totalAmount || 0);
                        break;

                    case "Cancelled":
                        cancelled++;
                        break;

                    default:
                        break;

                }

            });

            setStats({

                total: bookingData.length,
                pending,
                accepted,
                completed,
                cancelled,
                earnings

            });

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <OwnerLayout>

            <div className="owner-dashboard">

                <OwnerTopBar />

                {/* HERO */}

                <div className="owner-hero">

                    <div className="hero-left">

                        <h1>
                            🚜 Welcome Back Owner
                        </h1>

                        <p>

                            Manage bookings, customers, live tracking and earnings from one smart dashboard.

                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/owner-bookings"
                                className="hero-btn primary"
                            >

                                📋 Booking Requests

                            </Link>

                            <Link
                                to="/owner-live-tracking"
                                className="hero-btn secondary"
                            >

                                📍 Go Live

                            </Link>

                        </div>

                    </div>

                    <div className="hero-right">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                            alt="tractor"
                        />

                    </div>

                </div>

                {/* WEATHER + TODAY */}

                <div className="owner-stats">

                    <div className="dashboard-card">

                        <h3>☀ Today's Weather</h3>

                        <h2>

                            {weather.temp}°

                        </h2>

                        <p>

                            {weather.city}

                        </p>

                        <small>

                            Humidity {weather.humidity}%<br />

                            Wind {weather.wind} km/h

                        </small>

                    </div>

                    <div className="dashboard-card">

                        <h3>💰 Total Earnings</h3>

                        <h2>

                            ₹

                            <CountUp

                                end={stats.earnings}

                                duration={2}

                            />

                        </h2>

                        <small>

                            Completed Work Income

                        </small>

                    </div>

                    <div className="dashboard-card">

                        <h3>📋 Total Bookings</h3>

                        <h2>

                            <CountUp

                                end={stats.total}

                                duration={2}

                            />

                        </h2>

                        <small>

                            Booking Requests

                        </small>

                    </div>

                    <div className="dashboard-card">

                        <h3>🚜 Completed Jobs</h3>

                        <h2>

                            <CountUp

                                end={stats.completed}

                                duration={2}

                            />

                        </h2>

                        <small>

                            Successfully Completed

                        </small>

                    </div>

                </div>
                                {/* QUICK ACTIONS */}

                <h2 className="section-title">

                    ⚡ Quick Actions

                </h2>

                <div className="owner-actions">

                    <Link
                        to="/owner-bookings"
                        className="action-box"
                    >

                        <div className="action-icon">

                            📋

                        </div>

                        <h3>

                            Booking Requests

                        </h3>

                        <p>

                            Accept or Reject Requests

                        </p>

                    </Link>

                    <Link
                        to="/owner-live-tracking"
                        className="action-box"
                    >

                        <div className="action-icon">

                            📍

                        </div>

                        <h3>

                            Live Tracking

                        </h3>

                        <p>

                            Share Tractor Location

                        </p>

                    </Link>

                    <Link
                        to="/history"
                        className="action-box"
                    >

                        <div className="action-icon">

                            📝

                        </div>

                        <h3>

                            Work History

                        </h3>

                        <p>

                            View Completed Jobs

                        </p>

                    </Link>

                    <Link
                        to="/analytics"
                        className="action-box"
                    >

                        <div className="action-icon">

                            📊

                        </div>

                        <h3>

                            Analytics

                        </h3>

                        <p>

                            Income & Performance

                        </p>

                    </Link>

                </div>


                {/* CHARTS */}

                <h2 className="section-title">

                    📈 Business Analytics

                </h2>

                <OwnerCharts bookings={bookings} />

                <EarningsAnalytics bookings={bookings} />


                {/* LIVE ACTIVITY */}

                <h2 className="section-title">

                    ⚡ Live Activity

                </h2>

                <LiveActivity />


                {/* RECENT BOOKINGS */}

                <div className="recent-bookings">

                    <div className="recent-header">

                        <h2>

                            Recent Booking Requests

                        </h2>

                        <Link to="/owner-bookings">

                            View All →

                        </Link>

                    </div>

                    {

                        bookings.length === 0 ?

                        <div className="empty-bookings">

                            No Booking Requests Yet

                        </div>

                        :

                        bookings.slice(0,5).map((booking)=>(

                            <div
                                key={booking._id}
                                className="booking-row"
                            >

                                <div>

                                    <b>

                                        {booking.farmerName}

                                    </b>

                                    <p>

                                        {booking.machineType}

                                        {" • "}

                                        {booking.village}

                                    </p>

                                </div>

                                <div>

                                    <span
                                        className={`status ${booking.status.toLowerCase()}`}
                                    >

                                        {booking.status}

                                    </span>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </OwnerLayout>

    );

}

export default Dashboard;