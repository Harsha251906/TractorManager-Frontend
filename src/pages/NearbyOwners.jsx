import { useEffect, useState, useCallback } from "react";
import FarmerLayout from "../layouts/FarmerLayout";
import OwnerCard from "../components/OwnerCard";
import api from "../services/api";
import "../styles/NearbyOwners.css";

function NearbyOwners() {

    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState({
        lat: null,
        lng: null
    });

    const [machineType, setMachineType] = useState("");

    const machineList = [
        "Tractor",
        "Harvester",
        "Rotavator",
        "Cultivator",
        "Trailer",
        "JCB"
    ];

    const loadOwners = useCallback(async (lat, lng, machine) => {

        try {

            setLoading(true);

            const res = await api.get("/users/nearby", {

                params: {
                    lat,
                    lng,
                    machineType: machine
                }

            });

            setOwners(res.data.data || []);

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Unable to load nearby owners."

            );

        }

        finally {

            setLoading(false);

        }

    }, []);

    const getCurrentLocation = useCallback(() => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported by your browser.");

            setLoading(false);

            return;

        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setLocation({
                    lat,
                    lng
                });

                loadOwners(
                    lat,
                    lng,
                    machineType
                );

            },

            (error) => {

                console.log(error);

                alert("Unable to get your current location.");

                setLoading(false);

            }

        );

    }, [loadOwners, machineType]);

    useEffect(() => {

        getCurrentLocation();

    }, [getCurrentLocation]);

    const handleMachineChange = (e) => {

        const value = e.target.value;

        setMachineType(value);

        if (location.lat && location.lng) {

            loadOwners(
                location.lat,
                location.lng,
                value
            );

        }

    };
        return (

        <FarmerLayout>

            <div className="nearby-page">

                <div className="nearby-header">

                    <h1>🚜 Nearby Tractor Owners</h1>

                    <p>
                        Find available tractor owners near your location.
                    </p>

                </div>

                <div className="filter-box">

                    <select
                        value={machineType}
                        onChange={handleMachineChange}
                    >

                        <option value="">
                            All Machines
                        </option>

                        {

                            machineList.map((machine) => (

                                <option
                                    key={machine}
                                    value={machine}
                                >

                                    {machine}

                                </option>

                            ))

                        }

                    </select>

                    <button
                        onClick={getCurrentLocation}
                    >

                        📍 Refresh Location

                    </button>

                </div>

                {

                    loading && (

                        <div className="loading-box">

                            <h2>

                                🔄 Searching Nearby Owners...

                            </h2>

                        </div>

                    )

                }

                {

                    !loading && owners.length === 0 && (

                        <div className="empty-box">

                            <h2>

                                😔 No Owners Found

                            </h2>

                            <p>

                                No tractor owners are available nearby.

                            </p>

                        </div>

                    )

                }

                <div className="owners-grid">

                    {

                        owners.map((owner) => (

                            <OwnerCard
                                key={owner._id}
                                owner={owner}
                            />

                        ))

                    }

                </div>

                {

                    location.lat &&
                    location.lng && (

                        <div className="location-box">

                            <h3>

                                📍 Your Current Location

                            </h3>

                            <p>

                                Latitude : {location.lat.toFixed(6)}

                            </p>

                            <p>

                                Longitude : {location.lng.toFixed(6)}

                            </p>

                        </div>

                    )

                }

            </div>

        </FarmerLayout>

    );

}

export default NearbyOwners;