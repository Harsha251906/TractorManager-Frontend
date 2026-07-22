import { useEffect, useRef, useState } from "react";
import api from "../services/api";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import OwnerLayout from "../layouts/OwnerLayout";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});

function OwnerLiveTracking() {

    const [bookings, setBookings] = useState([]);

    const [selectedBooking, setSelectedBooking] = useState("");

    const [ownerLocation, setOwnerLocation] = useState(null);

    const [distance, setDistance] = useState("");

    const [eta, setEta] = useState("");

    const mapRef = useRef(null);

    const routingRef = useRef(null);

    useEffect(() => {

        loadBookings();

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

    useEffect(() => {

        if (!selectedBooking) return;

        const interval = setInterval(() => {

            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    const lat = position.coords.latitude;

                    const lng = position.coords.longitude;

                    setOwnerLocation({ lat, lng });

                    try {

                        await api.put(

                            `/bookings/${selectedBooking}/location`,

                            {

                                lat,

                                lng

                            }

                        );

                    }

                    catch (err) {

                        console.log(err);

                    }

                },

                (err) => console.log(err),

                {

                    enableHighAccuracy: true

                }

            );

        }, 5000);

        return () => clearInterval(interval);

    }, [selectedBooking]);
        const selected = bookings.find(

        booking => booking._id === selectedBooking

    );

    useEffect(() => {

        if (

            !mapRef.current ||

            !ownerLocation ||

            !selected?.location

        ) return;

        if (routingRef.current) {

            mapRef.current.removeControl(routingRef.current);

        }

        routingRef.current = L.Routing.control({

            waypoints: [

                L.latLng(

                    ownerLocation.lat,

                    ownerLocation.lng

                ),

                L.latLng(

                    selected.location.lat,

                    selected.location.lng

                )

            ],

            routeWhileDragging: false,

            addWaypoints: false,

            draggableWaypoints: false,

            fitSelectedRoutes: true,

            show: false,

            createMarker: () => null

        }).addTo(mapRef.current);

        routingRef.current.on(

            "routesfound",

            function (e) {

                const route = e.routes[0];

                setDistance(

                    (

                        route.summary.totalDistance /

                        1000

                    ).toFixed(2)

                );

                setEta(

                    Math.ceil(

                        route.summary.totalTime /

                        60

                    )

                );

            }

        );

    }, [ownerLocation, selected]);

    return (

        <OwnerLayout>

            <div style={{ padding: "25px" }}>

                <h1>📍 Owner Live Tracking</h1>

                <select

                    value={selectedBooking}

                    onChange={(e) =>

                        setSelectedBooking(

                            e.target.value

                        )

                    }

                    style={{

                        padding: "12px",

                        width: "350px",

                        marginBottom: "20px"

                    }}

                >

                    <option value="">

                        Select Booking

                    </option>

                    {

                        bookings.map((booking) => (

                            <option

                                key={booking._id}

                                value={booking._id}

                            >

                                {booking.machineType} -

                                {booking.farmerName}

                            </option>

                        ))

                    }

                </select>

                {

                    selected && (

                        <>

                            <MapContainer

                                center={[

                                    selected.location.lat,

                                    selected.location.lng

                                ]}

                                zoom={13}

                                style={{

                                    height: "500px",

                                    width: "100%",

                                    borderRadius: "12px"

                                }}

                                whenCreated={(map) =>

                                    (mapRef.current = map)

                                }

                            >

                                <TileLayer

                                    attribution="&copy; OpenStreetMap"

                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                />

                                <Marker

                                    position={[

                                        selected.location.lat,

                                        selected.location.lng

                                    ]}

                                >

                                    <Popup>

                                        👨‍🌾 Farmer

                                    </Popup>

                                </Marker>

                                {

                                    ownerLocation && (

                                        <Marker

                                            position={[

                                                ownerLocation.lat,

                                                ownerLocation.lng

                                            ]}

                                        >

                                            <Popup>

                                                🚜 Owner

                                            </Popup>

                                        </Marker>

                                    )

                                }

                            </MapContainer>

                            <div

                                style={{

                                    marginTop: "20px",

                                    display: "flex",

                                    gap: "20px",

                                    flexWrap: "wrap"

                                }}

                            >

                                <div>

                                    <b>📏 Distance</b>

                                    <br />

                                    {

                                        distance

                                            ? `${distance} km`

                                            : "-"

                                    }

                                </div>

                                <div>

                                    <b>⏱ ETA</b>

                                    <br />

                                    {

                                        eta

                                            ? `${eta} min`

                                            : "-"

                                    }

                                </div>

                                <div>

                                    <button

                                        onClick={() =>

                                            window.open(

                                                `https://www.google.com/maps/dir/?api=1&destination=${selected.location.lat},${selected.location.lng}`,

                                                "_blank"

                                            )

                                        }

                                        style={{

                                            padding: "12px 18px",

                                            background: "#16a34a",

                                            color: "#fff",

                                            border: "none",

                                            borderRadius: "8px",

                                            cursor: "pointer"

                                        }}

                                    >

                                        🧭 Open Navigation

                                    </button>

                                </div>

                            </div>

                        </>

                    )

                }

            </div>

        </OwnerLayout>

    );

}

export default OwnerLiveTracking;