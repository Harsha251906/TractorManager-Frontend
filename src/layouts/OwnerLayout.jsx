import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/Layout.css";

function OwnerLayout({ children }) {

    const user = JSON.parse(

        localStorage.getItem("user")

    ) || {};

    const menu = [

        {
    name: "Dashboard",
    icon: "🏠",
    path: "/owner"
        },

        {
            name: "Add Work",
            icon: "➕",
            path: "/work"
        },

        {
            name: "Booking Requests",
            icon: "📅",
            path: "/owner-bookings"
        },

        {
            name: "Live Tracking",
            icon: "📍",
            path: "/owner-live-tracking"
        },

        {
            name: "Analytics",
            icon: "📊",
            path: "/analytics"
        },

        {
            name: "Reports",
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

                title="🚜 Owner Panel"

                menu={menu}

                user={user}

            />

            <div className="main-content">

                <Topbar

                    title="Owner Dashboard"

                    user={user}

                />
                                <div className="page-content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default OwnerLayout;