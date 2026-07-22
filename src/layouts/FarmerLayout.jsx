import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/Layout.css";

function FarmerLayout({ children }) {

    const user = JSON.parse(

        localStorage.getItem("user")

    ) || {};

    const menu = [

        {
            name: "Dashboard",
            icon: "🏠",
            path: "/farmer"
        },

        {
            name: "Nearby Owners",
            icon: "📍",
            path: "/nearby-owners"
        },

        {
            name: "Book Tractor",
            icon: "🚜",
            path: "/booking"
        },

        {
            name: "My Bookings",
            icon: "📋",
            path: "/my-bookings"
        },

        {
            name: "Live Tracking",
            icon: "🛰️",
            path: "/farmer-live-tracking"
        },

        {
            name: "My Invoices",
            icon: "📄",
            path: "/reports"
        },

        {
            name: "Notifications",
            icon: "🔔",
            path: "/notifications"
        }

    ];

    return (

        <div className="layout">

            <Sidebar

                title="👨‍🌾 Farmer Panel"

                menu={menu}

                user={user}

            />

            <div className="main-content">

                <Topbar

                    title="Farmer Dashboard"

                    user={user}

                />
                                <div className="page-content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default FarmerLayout;