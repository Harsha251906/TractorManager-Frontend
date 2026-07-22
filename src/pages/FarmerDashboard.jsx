import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FarmerLayout from "../layouts/FarmerLayout";
import api from "../services/api";
import "../styles/FarmerDashboard.css";

function FarmerDashboard() {

    const [stats, setStats] = useState({
        totalBookings: 0,
        pending: 0,
        accepted: 0,
        completed: 0,
        nearbyOwners: 0
    });

    const [recentBookings, setRecentBookings] = useState([]);
    const [nearbyOwners, setNearbyOwners] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const bookingRes = await api.get("/bookings");

            const bookings = bookingRes.data.data || [];

            setRecentBookings(bookings.slice(0, 5));

            let nearby = [];

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(async (pos) => {

                    try {

                        const ownerRes = await api.get("/users/nearby", {
                            params: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        });

                        nearby = ownerRes.data.data || [];

                        setNearbyOwners(nearby.slice(0, 5));

                        setStats({
                            totalBookings: bookings.length,
                            pending: bookings.filter(x => x.status === "Pending").length,
                            accepted: bookings.filter(x => x.status === "Accepted").length,
                            completed: bookings.filter(x => x.status === "Completed").length,
                            nearbyOwners: nearby.length
                        });

                    } catch (err) {
                        console.log(err);
                    }

                });

            }

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <FarmerLayout>

            <div className="farmer-dashboard">

                <div className="hero-card">

                    <div>

                        <h1>👨‍🌾 Welcome Farmer</h1>

                        <p>
                            Manage bookings, find nearby owners and track every request in one place.
                        </p>

                        <Link to="/nearby-owners">
                            <button className="hero-btn">
                                🚜 Find Nearby Owners
                            </button>
                        </Link>

                    </div>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                        alt=""
                    />

                </div>

                <div className="stats-grid">

                    <div className="stat-card">
                        <h2>{stats.totalBookings}</h2>
                        <p>Total Bookings</p>
                    </div>

                    <div className="stat-card">
                        <h2>{stats.pending}</h2>
                        <p>Pending</p>
                    </div>

                    <div className="stat-card">
                        <h2>{stats.accepted}</h2>
                        <p>Accepted</p>
                    </div>

                    <div className="stat-card">
                        <h2>{stats.completed}</h2>
                        <p>Completed</p>
                    </div>

                    <div className="stat-card">
                        <h2>{stats.nearbyOwners}</h2>
                        <p>Nearby Owners</p>
                    </div>

                </div>

                <h2 className="section-title">
                    ⚡ Quick Actions
                </h2>

                <div className="action-grid">

                    <Link to="/nearby-owners" className="action-card">
                        <h2>🚜</h2>
                        <h3>Find Owners</h3>
                        <p>Book nearby tractors instantly</p>
                    </Link>

                    <Link to="/my-bookings" className="action-card">
                        <h2>📋</h2>
                        <h3>My Bookings</h3>
                        <p>Track all requests</p>
                    </Link>

                    <Link to="/notifications" className="action-card">
                        <h2>🔔</h2>
                        <h3>Notifications</h3>
                        <p>Booking updates</p>
                    </Link>

                    <Link to="/reports" className="action-card">
                        <h2>📄</h2>
                        <h3>Bills</h3>
                        <p>Invoices & payments</p>
                    </Link>

                </div>

                <div className="dashboard-grid">

                    <div className="activity-card">

                        <h2>📋 Recent Bookings</h2>

                        {

                            recentBookings.length === 0 ?

                                <p>No bookings available.</p>

                                :

                                recentBookings.map((b) => (

                                    <div
                                        className="activity-item"
                                        key={b._id}
                                    >

                                        <span>🚜</span>

                                        <div>

                                            <strong>{b.machineType}</strong>

                                            <br />

                                            <small>{b.workType}</small>

                                        </div>

                                        <div className={`status ${b.status.toLowerCase()}`}>
                                            {b.status}
                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                    <div className="activity-card">

                        <h2>📍 Nearby Owners</h2>

                        {

                            nearbyOwners.length === 0 ?

                                <p>No nearby owners.</p>

                                :

                                nearbyOwners.map((owner) => (

                                    <div
                                        className="activity-item"
                                        key={owner._id}
                                    >

                                        <span>👨‍🌾</span>

                                        <div>

                                            <strong>{owner.name}</strong>

                                            <br />

                                            <small>

                                                {owner.machineTypes?.join(", ")}

                                            </small>

                                        </div>

                                        <div>

                                            {owner.distance?.toFixed(1)} km

                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                </div>

            </div>

        </FarmerLayout>

    );

}

export default FarmerDashboard;