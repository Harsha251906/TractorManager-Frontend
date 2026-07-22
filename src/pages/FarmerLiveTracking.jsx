import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import FarmerLayout from "../layouts/FarmerLayout";

import api from "../services/api";
import socket, { connectUser } from "../services/socket";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});

function FarmerLiveTracking() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        loadBookings();

        const user = JSON.parse(localStorage.getItem("user"));

        if (user?._id) {

            connectUser(user._id);

        }

        socket.on("locationUpdated", (updatedBooking) => {

            setBookings((prev) =>

                prev.map((booking) =>

                    booking._id === updatedBooking._id

                        ? updatedBooking

                        : booking

                )

            );

        });

        return () => {

            socket.off("locationUpdated");

        };

    }, []);

    const loadBookings = async () => {

        try {

            const res = await api.get("/bookings");

            const accepted = res.data.data.filter(

                booking => booking.status === "Accepted"

            );

            setBookings(accepted);

        }

        catch (err) {

            console.log(err);

        }

    };

    const calculateDistance = (booking) => {

        if (

            !booking.location ||

            !booking.currentLocation ||

            booking.currentLocation.lat == null ||

            booking.currentLocation.lng == null

        ) {

            return null;

        }

        const R = 6371;

        const dLat =

            (booking.currentLocation.lat - booking.location.lat) *

            Math.PI /

            180;

        const dLng =

            (booking.currentLocation.lng - booking.location.lng) *

            Math.PI /

            180;

        const a =

            Math.sin(dLat / 2) *

            Math.sin(dLat / 2) +

            Math.cos(

                booking.location.lat * Math.PI / 180

            ) *

            Math.cos(

                booking.currentLocation.lat * Math.PI / 180

            ) *

            Math.sin(dLng / 2) *

            Math.sin(dLng / 2);

        const c =

            2 *

            Math.atan2(

                Math.sqrt(a),

                Math.sqrt(1 - a)

            );

        return (R * c).toFixed(2);

    };

    return (

        <FarmerLayout>

            <div style={{ padding: "30px" }}>

                <h1>🚜 Live Machine Tracking</h1>

                {

                    bookings.length === 0 ?

                        <h3>No Active Booking</h3>

                        :
                                            bookings.map((booking) => (

                        <div

                            key={booking._id}

                            style={{

                                background: "#fff",

                                padding: "20px",

                                marginBottom: "30px",

                                borderRadius: "12px",

                                boxShadow: "0 5px 15px rgba(0,0,0,.08)"

                            }}

                        >

                            <h2>

                                🚜 {booking.machineType}

                            </h2>

                            <p>

                                <b>Status :</b> {booking.status}

                            </p>

                            <p>

                                <b>Village :</b> {booking.village}

                            </p>

                            <p>

                                <b>Owner :</b>{" "}

                                {booking.acceptedBy?.name || "Waiting..."}

                            </p>

                            <p>

                                <b>Mobile :</b>{" "}

                                {booking.acceptedBy?.mobile || "-"}

                            </p>

                            <MapContainer

                                center={[

                                    booking.currentLocation?.lat ||

                                    booking.location?.lat ||

                                    11.9416,

                                    booking.currentLocation?.lng ||

                                    booking.location?.lng ||

                                    79.8083

                                ]}

                                zoom={15}

                                style={{

                                    height: "320px",

                                    width: "100%",

                                    borderRadius: "12px",

                                    marginTop: "15px"

                                }}

                            >

                                <TileLayer

                                    attribution="&copy; OpenStreetMap contributors"

                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                />

                                {

                                    booking.currentLocation?.lat &&

                                    booking.currentLocation?.lng && (

                                        <Marker

                                            position={[

                                                booking.currentLocation.lat,

                                                booking.currentLocation.lng

                                            ]}

                                        >

                                            <Popup>

                                                🚜 {booking.machineType}

                                                <br />

                                                Live Location

                                            </Popup>

                                        </Marker>

                                    )

                                }

                            </MapContainer>

                            <div

                                style={{

                                    marginTop: "15px",

                                    background: "#f5f5f5",

                                    padding: "15px",

                                    borderRadius: "10px",

                                    display: "grid",

                                    gridTemplateColumns: "repeat(2,1fr)",

                                    gap: "15px"

                                }}

                            >

                                <div>

                                    <b>📍 Latitude</b>

                                    <br />

                                    {booking.currentLocation?.lat || "-"}

                                </div>

                                <div>

                                    <b>📍 Longitude</b>

                                    <br />

                                    {booking.currentLocation?.lng || "-"}

                                </div>

                                <div>

                                    <b>📅 Booking Date</b>

                                    <br />

                                    {booking.bookingDate}

                                </div>

                                <div>

                                    <b>⏰ Booking Time</b>

                                    <br />

                                    {booking.bookingTime}

                                </div>

                                <div>

                                    <b>🌾 Work Type</b>

                                    <br />

                                    {booking.workType}

                                </div>

                                <div>

                                    <b>📦 Machine</b>

                                    <br />

                                    {booking.machineType}

                                </div>

                                {

                                    ["Harvester", "JCB", "Trailer"].includes(

                                        booking.machineType

                                    ) ? (

                                        <div>

                                            <b>⏱ Hours</b>

                                            <br />

                                            {booking.hours}

                                        </div>

                                    ) : (

                                        <div>

                                            <b>🌱 Acres</b>

                                            <br />

                                            {booking.acres}

                                        </div>

                                    )

                                }

                                <div>

                                    <b>📏 Distance</b>

                                    <br />

                                    {

                                        calculateDistance(booking)

                                            ? `${calculateDistance(booking)} km`

                                            : "Waiting for Owner Location"

                                    }

                                </div>

                                <div>

                                    <b>🚜 Status</b>

                                    <br />

                                    <span

                                        style={{

                                            color:

                                                booking.status === "Accepted"

                                                    ? "green"

                                                    : booking.status === "Completed"

                                                    ? "blue"

                                                    : "orange",

                                            fontWeight: "bold"

                                        }}

                                    >

                                        {booking.status}

                                    </span>

                                </div>

                                <div>

                                    <b>📝 Notes</b>

                                    <br />

                                    {booking.notes || "-"}

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </FarmerLayout>

    );

}

export default FarmerLiveTracking;