import { useEffect, useState } from "react";
import api from "../services/api";
import OwnerLayout from "../layouts/OwnerLayout";
import "../styles/OwnerBookings.css";

function OwnerBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const res = await api.get("/bookings");

            setBookings(res.data.data || []);

        } catch (error) {

            console.log(error);

        }

    };

    const acceptBooking = async (id) => {

        try {

            await api.put(`/bookings/${id}/accept`);

            alert("✅ Booking Accepted");

            loadBookings();

        } catch (error) {

            alert(error.response?.data?.message || "Error");

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await api.put(`/bookings/${id}/status`, {

                status

            });

            loadBookings();

        } catch (error) {

            alert(error.response?.data?.message || "Error");

        }

    };

    const deleteBooking = async (id) => {

        if (!window.confirm("Delete Booking?")) return;

        try {

            await api.delete(`/bookings/${id}`);

            loadBookings();

        } catch (error) {

            alert(error.response?.data?.message || "Error");

        }

    };

    return (

        <OwnerLayout>

            <div className="owner-bookings">

                <h1>📅 Booking Requests</h1>

                {
                    bookings.length === 0 ? (

                        <h2>No Bookings Found</h2>

                    ) : (

                        bookings.map((booking) => (

                            <div
                                className="booking-card"
                                key={booking._id}
                            >
                                                                <h2>

                                    🚜 {booking.machineType}

                                </h2>

                                <p>

                                    <b>Farmer :</b> {booking.farmerName}

                                </p>

                                <p>

                                    <b>Mobile :</b> {booking.mobile}

                                </p>

                                <p>

                                    <b>Village :</b> {booking.village}

                                </p>

                                <p>

                                    <b>Work :</b> {booking.workType}

                                </p>

                                {

                                    [

                                        "Tractor",

                                        "Rotavator",

                                        "Cultivator"

                                    ].includes(booking.machineType) && (

                                        <p>

                                            <b>Acres :</b> {booking.acres}

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

                                            <b>Hours :</b> {booking.hours}

                                        </p>

                                    )

                                }

                                <p>

                                    <b>Date :</b> {booking.bookingDate}

                                </p>

                                <p>

                                    <b>Time :</b> {booking.bookingTime}

                                </p>

                                <p>

                                    <b>Notes :</b> {booking.notes || "-"}

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

                                <div className="booking-actions">
                                                                    {booking.status === "Pending" && (

                                    <button
                                        onClick={() =>
                                            acceptBooking(
                                                booking._id
                                            )
                                        }
                                    >
                                        ✅ Accept
                                    </button>

                                )}

                                {booking.status === "Accepted" && (

                                    <>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "Completed"
                                                )
                                            }
                                        >
                                            ✔ Complete
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "Cancelled"
                                                )
                                            }
                                        >
                                            ❌ Cancel
                                        </button>

                                    </>

                                )}

                                <button
                                    onClick={() =>
                                        deleteBooking(
                                            booking._id
                                        )
                                    }
                                >
                                    🗑 Delete
                                </button>

                            </div>

                        </div>

                        ))

                    )

                }
                            </div>

        </OwnerLayout>

    );

}

export default OwnerBookings;