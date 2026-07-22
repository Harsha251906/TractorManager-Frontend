import { useEffect, useState } from "react";
import api from "../services/api";

import FarmerLayout from "../layouts/FarmerLayout";

import "../styles/MyBookings.css";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const res = await api.get("/bookings");

            setBookings(res.data.data || []);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <FarmerLayout>

            <div className="my-bookings">

                <h1>📋 My Bookings</h1>

                {

                    bookings.length === 0 ?

                        <h2>No Bookings Yet</h2>

                        :

                        bookings.map((booking) => (

                            <div
                                className="booking-card"
                                key={booking._id}
                            >
                                                                <h2>

                                    🚜 {booking.machineType}

                                </h2>

                                <p>

                                    <b>Work :</b>

                                    {booking.workType}

                                </p>

                                <p>

                                    <b>Village :</b>

                                    {booking.village}

                                </p>

                                {

                                    [

                                        "Tractor",

                                        "Rotavator",

                                        "Cultivator"

                                    ].includes(booking.machineType) && (

                                        <p>

                                            <b>Acres :</b>

                                            {booking.acres}

                                        </p>

                                    )

                                }

                                {

                                    [

                                        "Harvester",

                                        "JCB",

                                        "Trailer"

                                    ].includes(booking.machineType) && (

                                        <p>

                                            <b>Hours :</b>

                                            {booking.hours}

                                        </p>

                                    )

                                }

                                <p>

                                    <b>Date :</b>

                                    {booking.bookingDate}

                                </p>

                                <p>

                                    <b>Time :</b>

                                    {booking.bookingTime}

                                </p>

                                <p>

                                    <b>Notes :</b>

                                    {booking.notes || "-"}

                                </p>

                                <p>

                                    <b>Status :</b>

                                    <span

                                        style={{

                                            color:

                                                booking.status === "Pending"

                                                    ? "orange"

                                                    : booking.status === "Accepted"

                                                    ? "green"

                                                    : booking.status === "Completed"

                                                    ? "blue"

                                                    : "red",

                                            fontWeight: "bold"

                                        }}

                                    >

                                        {booking.status}

                                    </span>

                                </p>
                                                              <hr />

                    <h3>👨 Owner Details</h3>

                    <p>
                        <b>Name :</b>{" "}
                        {booking.owner?.name || booking.acceptedBy?.name || "Not Assigned"}
                    </p>

                    <p>
                        <b>Mobile :</b>{" "}
                        {booking.owner?.mobile || booking.acceptedBy?.mobile || "-"}
                    </p>

                            </div>

                        ))

                }

            </div>

        </FarmerLayout>

    );

}

export default MyBookings;