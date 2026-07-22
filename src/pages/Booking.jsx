import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import FarmerLayout from "../layouts/FarmerLayout";
import MapPicker from "../components/MapPicker";
import "../styles/Booking.css";

function Booking() {

   const location = useLocation();

    const selectedOwner = location.state?.owner || {};

    const [form, setForm] = useState({

    ownerId: selectedOwner._id || "",

    ownerName: selectedOwner.name || "",

    machineType:
        selectedOwner.machineTypes?.[0] || "",

    farmerName: "",

    mobile: "",

    village: "",

    bookingDate: "",

    bookingTime: "",

    workType: "",

    acres: "",

    hours: "",

    notes: ""

});

    const [position, setPosition] = useState({

        lat: 11.9416,

        lng: 79.8083

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const saveBooking = async (e) => {

        e.preventDefault();

        try {

            await api.post("/bookings", {

                ...form,

                location: position

            });

            alert("✅ Booking Request Sent Successfully");

            setForm({

                    ownerId: selectedOwner._id || "",

                    ownerName: selectedOwner.name || "",

                    machineType: selectedOwner.machineTypes?.[0] || "",

                    farmerName: "",

                    mobile: "",

                    village: "",

                    bookingDate: "",

                    bookingTime: "",

                    workType: "",

                    acres: "",

                    hours: "",

                    notes: ""

                });
            setPosition({

                lat: 11.9416,

                lng: 79.8083

            });

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Unable to Send Booking"

            );

        }

    };
        return (

        <FarmerLayout>

            <div className="booking-page">

                <h1>🚜 Book Farm Equipment</h1>

                <form

                    className="booking-form"

                    onSubmit={saveBooking}

                >

                    {

                        form.ownerId && (

                            <>

                                <input

                                    type="hidden"

                                    name="ownerId"

                                    value={form.ownerId}

                                    readOnly

                                />

                                <input

                                    type="text"

                                    value={form.ownerName}

                                    readOnly

                                    style={{

                                        background: "#f3f4f6",

                                        fontWeight: "bold"

                                    }}

                                />

                            </>

                        )

                    }

                    <select

                        name="machineType"

                        value={form.machineType}

                        onChange={handleChange}

                        disabled={!!form.ownerId}

                        required

                    >

                        <option value="">

                            Select Machine

                        </option>

                        <option value="Tractor">

                            🚜 Tractor

                        </option>

                        <option value="Harvester">

                            🌾 Harvester

                        </option>

                        <option value="JCB">

                            🚧 JCB

                        </option>

                        <option value="Rotavator">

                            🌱 Rotavator

                        </option>

                        <option value="Cultivator">

                            🌿 Cultivator

                        </option>

                        <option value="Trailer">

                            🚛 Trailer

                        </option>

                    </select>

                    <input

                        type="text"

                        name="farmerName"

                        placeholder="Farmer Name"

                        value={form.farmerName}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="mobile"

                        placeholder="Mobile Number"

                        value={form.mobile}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="village"

                        placeholder="Village"

                        value={form.village}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="date"

                        name="bookingDate"

                        value={form.bookingDate}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="time"

                        name="bookingTime"

                        value={form.bookingTime}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="workType"

                        value={form.workType}

                        onChange={handleChange}

                        required

                    >

                        <option value="">

                            Select Work

                        </option>

                        <option value="Ploughing">Ploughing</option>

                        <option value="Rotavator">Rotavator</option>

                        <option value="Cultivator">Cultivator</option>

                        <option value="Harvesting">Harvesting</option>

                        <option value="Earth Work">Earth Work</option>

                        <option value="Transport">Transport</option>

                    </select>
                                        {

                        ["Tractor", "Rotavator", "Cultivator"].includes(form.machineType) && (

                            <input

                                type="number"

                                name="acres"

                                placeholder="Acres"

                                value={form.acres}

                                onChange={handleChange}

                                min="1"

                                required

                            />

                        )

                    }

                    {

                        ["Harvester", "JCB", "Trailer"].includes(form.machineType) && (

                            <input

                                type="number"

                                name="hours"

                                placeholder="Hours"

                                value={form.hours}

                                onChange={handleChange}

                                min="1"

                                required

                            />

                        )

                    }

                    <textarea

                        name="notes"

                        placeholder="Additional Notes"

                        value={form.notes}

                        onChange={handleChange}

                    />

                    <div

                        style={{

                            gridColumn: "1 / -1",

                            marginTop: "20px"

                        }}

                    >

                        <h3>

                            📍 Select Your Farm Location

                        </h3>

                        <MapPicker

                            position={position}

                            setPosition={setPosition}

                        />

                        <div

                            style={{

                                marginTop: "15px",

                                padding: "10px",

                                background: "#f3f4f6",

                                borderRadius: "8px",

                                fontWeight: "bold"

                            }}

                        >

                            Latitude : {position.lat.toFixed(6)}

                            <br />

                            Longitude : {position.lng.toFixed(6)}

                        </div>

                    </div>

                    {

                        form.ownerId && (

                            <div

                                style={{

                                    gridColumn: "1 / -1",

                                    background: "#ecfdf5",

                                    border: "1px solid #22c55e",

                                    borderRadius: "10px",

                                    padding: "15px",

                                    marginTop: "10px"

                                }}

                            >

                                <h3>

                                    👨‍🌾 Selected Owner

                                </h3>

                                <p>

                                    <strong>Name :</strong> {form.ownerName}

                                </p>

                                <p>

                                    <strong>Machine :</strong> {form.machineType}

                                </p>

                                <p>

                                    <strong>Price / Acre :</strong>

                                    {" "}

                                    ₹{selectedOwner.pricePerAcre || 0}

                                </p>

                                <p>

                                    <strong>Price / Hour :</strong>

                                    {" "}

                                    ₹{selectedOwner.pricePerHour || 0}

                                </p>

                            </div>

                        )

                    }
                                        <button

                        type="submit"

                        style={{

                            gridColumn: "1 / -1"

                        }}

                    >

                        🚜 Send Booking Request

                    </button>

                </form>

            </div>

        </FarmerLayout>

    );

}

export default Booking;