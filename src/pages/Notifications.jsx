import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

import FarmerLayout from "../layouts/FarmerLayout";
import OwnerLayout from "../layouts/OwnerLayout";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const isFarmer = user?.role === "Farmer";

    const loadNotifications = async () => {

        try {

            const res = await api.get("/notifications");

            setNotifications(res.data.data);

        }

        catch (err) {

            console.log(err);

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

    const markRead = async (id) => {

        try {

            await api.put(`/notifications/${id}/read`);

            loadNotifications();

        }

        catch (err) {

            console.log(err);

        }

    };

    const content = (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1
                style={{
                    marginBottom: "25px"
                }}
            >
                🔔 Notifications
            </h1>

            {
                notifications.length === 0 ?

                <div
                    style={{
                        background: "#fff",
                        padding: "40px",
                        borderRadius: "12px",
                        textAlign: "center",
                        boxShadow: "0 5px 15px rgba(0,0,0,.08)"
                    }}
                >

                    <h3>No Notifications</h3>

                    <p>

                        You don't have any notifications yet.

                    </p>

                </div>

                :
                                notifications.map((item) => (

                    <div

                        key={item._id}

                        style={{

                            background:

                                item.isRead

                                    ? "#ffffff"

                                    : "#e8f5e9",

                            padding: "20px",

                            marginBottom: "20px",

                            borderRadius: "12px",

                            boxShadow: "0 5px 15px rgba(0,0,0,.08)",

                            borderLeft:

                                item.isRead

                                    ? "5px solid #9ca3af"

                                    : "5px solid #22c55e"

                        }}

                    >

                        <h3>

                            {item.title}

                        </h3>

                        <p

                            style={{

                                marginTop: "10px",

                                marginBottom: "15px"

                            }}

                        >

                            {item.message}

                        </p>

                        <small

                            style={{

                                color: "#666"

                            }}

                        >

                            {new Date(item.createdAt).toLocaleString()}

                        </small>

                        <br />

                        <br />

                        {

                            !item.isRead && (

                                <button

                                    onClick={() => markRead(item._id)}

                                    style={{

                                        padding: "10px 18px",

                                        border: "none",

                                        borderRadius: "8px",

                                        cursor: "pointer",

                                        background: "#16a34a",

                                        color: "#fff",

                                        fontWeight: "bold"

                                    }}

                                >

                                    ✓ Mark as Read

                                </button>

                            )

                        }

                    </div>

                ))

            }

        </div>

    );

    return (

        isFarmer

            ?

            <FarmerLayout>

                {content}

            </FarmerLayout>

            :

            <OwnerLayout>

                {content}

            </OwnerLayout>

    );

}

export default Notifications;