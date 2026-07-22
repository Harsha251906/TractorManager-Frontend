import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import MapPicker from "../components/MapPicker";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        name: "",

        email: "",

        mobile: "",

        password: "",

        confirmPassword: "",

        role: "Farmer",

        village: "",

        district: "",

        state: "",

        machineTypes: [],

        pricePerAcre: "",

        pricePerHour: "",

        serviceRadius: 20

    });

    const [position, setPosition] = useState({

        lat: 11.9416,

        lng: 79.8083

    });

    const machineList = [

        "Tractor",

        "Harvester",

        "Rotavator",

        "Cultivator",

        "Trailer",

        "JCB"

    ];

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "mobile") {

            if (!/^\d*$/.test(value)) return;

            if (value.length > 10) return;

        }

        setForm({

            ...form,

            [name]: value

        });

    };

    const handleMachine = (machine) => {

        if (form.machineTypes.includes(machine)) {

            setForm({

                ...form,

                machineTypes: form.machineTypes.filter(

                    (item) => item !== machine

                )

            });

        }

        else {

            setForm({

                ...form,

                machineTypes: [

                    ...form.machineTypes,

                    machine

                ]

            });

        }

    };

    const getCurrentLocation = () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (positionData) => {

                setPosition({

                    lat: positionData.coords.latitude,

                    lng: positionData.coords.longitude

                });

            },

            () => {

                alert("Unable to fetch your location.");

            }

        );

    };

    const registerUser = async (e) => {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {

            return alert("Passwords do not match");

        }

        try {

            setLoading(true);

            const res = await api.post("/auth/register", {

                ...form,

                location: {

                    lat: position.lat,

                    lng: position.lng

                }

            });

            localStorage.setItem("token", res.data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );

                alert("Registration Successful");

                // Redirect according to role
                if (res.data.user.role === "Owner") {
                    navigate("/owner");
                }
                else if (res.data.user.role === "Farmer") {
                    navigate("/farmer");
                }
                else if (res.data.user.role === "Admin") {
                    navigate("/admin");
                }
                else {
                    navigate("/login");
                }

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            <form

                className="register-card"

                onSubmit={registerUser}

            >

                <h1>🚜 Tractor Manager</h1>

                <h2>Create Account</h2>

                <input

                    type="text"

                    name="name"

                    placeholder="Full Name"

                    value={form.name}

                    onChange={handleChange}

                    required

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={handleChange}

                    required

                />

                <input

                    type="text"

                    name="mobile"

                    placeholder="Mobile Number"

                    value={form.mobile}

                    onChange={handleChange}

                    maxLength={10}

                    required

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={form.password}

                    onChange={handleChange}

                    required

                />

                <input

                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={form.confirmPassword}

                    onChange={handleChange}

                    required

                />

                <select

                    name="role"

                    value={form.role}

                    onChange={handleChange}

                >

                    <option value="Farmer">

                        Farmer

                    </option>

                    <option value="Owner">

                        Owner

                    </option>

                </select>

                <input

                    type="text"

                    name="village"

                    placeholder="Village"

                    value={form.village}

                    onChange={handleChange}

                />

                <input

                    type="text"

                    name="district"

                    placeholder="District"

                    value={form.district}

                    onChange={handleChange}

                />

                <input

                    type="text"

                    name="state"

                    placeholder="State"

                    value={form.state}

                    onChange={handleChange}

                />

                {

                    form.role === "Owner" &&

                    <>

                        <h3>

                            🚜 Select Machines

                        </h3>

                        <div className="machine-grid">

                            {

                                machineList.map((machine) => (

                                    <label key={machine}>

                                        <input

                                            type="checkbox"

                                            checked={

                                                form.machineTypes.includes(machine)

                                            }

                                            onChange={() =>

                                                handleMachine(machine)

                                            }

                                        />

                                        {machine}

                                    </label>

                                ))

                            }

                        </div>
                                                <input

                            type="number"

                            name="pricePerAcre"

                            placeholder="Price Per Acre (₹)"

                            value={form.pricePerAcre}

                            onChange={handleChange}

                            min="0"

                        />

                        <input

                            type="number"

                            name="pricePerHour"

                            placeholder="Price Per Hour (₹)"

                            value={form.pricePerHour}

                            onChange={handleChange}

                            min="0"

                        />

                        <input

                            type="number"

                            name="serviceRadius"

                            placeholder="Service Radius (KM)"

                            value={form.serviceRadius}

                            onChange={handleChange}

                            min="1"

                            max="100"

                        />

                        <button

                            type="button"

                            className="location-btn"

                            onClick={getCurrentLocation}

                        >

                            📍 Use My Current Location

                        </button>

                        <div

                            style={{

                                marginTop: "20px",

                                marginBottom: "20px"

                            }}

                        >

                            <MapPicker

                                position={position}

                                setPosition={setPosition}

                            />

                        </div>

                        <div className="location-info">

                            <strong>

                                Latitude :

                            </strong>

                            {position.lat.toFixed(6)}

                            <br />

                            <strong>

                                Longitude :

                            </strong>

                            {position.lng.toFixed(6)}

                        </div>

                    </>

                }

                <button

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Creating Account..."

                            : "Create Account"

                    }

                </button>

                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>
                            </form>

        </div>

    );

}

export default Register;