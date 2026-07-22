import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import socket from "../services/socket";

function NotificationBell() {

    const [notifications, setNotifications] = useState([]);

    const loadNotifications = async () => {

        try {

            const res = await api.get("/notifications");

            setNotifications(res.data.data || []);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadNotifications();

        socket.on("newNotification", (notification) => {

            setNotifications((prev) => [

                notification,

                ...prev

            ]);

        });

        return () => {

            socket.off("newNotification");

        };

    }, []);

    const unreadCount = notifications.filter(

        (item) => !item.isRead

    ).length;

    return (

        <Link

            to="/notifications"

            style={{

                position: "relative",

                textDecoration: "none",

                fontSize: "28px",

                color: "#333"

            }}

        >

            🔔

            {
                unreadCount > 0 &&
                                <span
                    style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-10px",
                        background: "#ef4444",
                        color: "#fff",
                        borderRadius: "50%",
                        minWidth: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "2px"
                    }}
                >
                    {unreadCount}
                </span>
            }

        </Link>

    );

}

export default NotificationBell;