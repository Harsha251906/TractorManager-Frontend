import { useEffect, useState } from "react";

function OwnerTopBar() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [time, setTime] = useState("");

    useEffect(() => {

        const timer = setInterval(() => {

            const now = new Date();

            setTime(

                now.toLocaleString("en-IN", {

                    dateStyle: "full",

                    timeStyle: "medium"

                })

            );

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="owner-topbar">

            <div>

                <h2>

                    👋 Welcome,

                    {" "}

                    {user?.name}

                </h2>

                <p>{time}</p>

            </div>

            <div className="weather-card">

                ☀️

                <div>

                    <h3>31°C</h3>

                    <p>Sunny</p>

                </div>

            </div>

        </div>

    );

}

export default OwnerTopBar;