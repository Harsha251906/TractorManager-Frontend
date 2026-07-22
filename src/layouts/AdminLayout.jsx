import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/Layout.css";

function AdminLayout({ children }) {

    const user = JSON.parse(

        localStorage.getItem("user")

    ) || {};

    const menu = [

        {
            name: "Dashboard",
            icon: "📊",
            path: "/admin"
        },

        {
            name: "Users",
            icon: "👥",
            path: "/admin/users"
        },

        {
            name: "Owners",
            icon: "🚜",
            path: "/admin/owners"
        },

        {
            name: "Farmers",
            icon: "🌾",
            path: "/admin/farmers"
        },

        {
            name: "Works",
            icon: "📝",
            path: "/history"
        },

        {
            name: "Expenses",
            icon: "⛽",
            path: "/expenses"
        },

        {
            name: "Reports",
            icon: "📄",
            path: "/reports"
        },

        {
            name: "Subscriptions",
            icon: "💳",
            path: "/admin/subscriptions"
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

                title="👑 Admin Panel"

                menu={menu}

                user={user}

            />

            <div className="main-content">

                <Topbar

                    title="Admin Dashboard"

                    user={user}

                />
                                <div className="page-content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;