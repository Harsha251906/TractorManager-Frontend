import { useEffect, useState } from "react";
import socket from "../services/socket";

function LiveActivity() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        socket.on("newBooking", (booking) => {

            setActivities((prev) => [

                {
                    icon: "🚜",
                    title: `${booking.farmerName} booked ${booking.machineType}`,
                    time: new Date().toLocaleTimeString()
                },

                ...prev

            ]);

        });

        return () => {

            socket.off("newBooking");

        };

    }, []);

    return (

        <div className="live-activity">

            <h2>🔴 Live Activity</h2>

            {

                activities.length === 0 ?

                <p>No recent activity</p>

                :

                activities.map((item, index) => (

                    <div
                        className="activity-row"
                        key={index}
                    >

                        <div className="activity-icon">

                            {item.icon}

                        </div>

                        <div>

                            <strong>{item.title}</strong>

                            <p>{item.time}</p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default LiveActivity;