import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function LocationMarker({ position, setPosition }) {

    useMapEvents({

        click(e) {

            setPosition({

                lat: e.latlng.lat,

                lng: e.latlng.lng

            });

        }

    });

    return position ? (

        <Marker position={[position.lat, position.lng]} />

    ) : null;

}

function MapPicker({ position, setPosition }) {

    return (

        <MapContainer

            center={[11.9416, 79.8083]}

            zoom={13}

            style={{

                height: "400px",

                width: "100%",

                borderRadius: "12px"

            }}

        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker

                position={position}

                setPosition={setPosition}

            />

        </MapContainer>

    );

}

export default MapPicker;