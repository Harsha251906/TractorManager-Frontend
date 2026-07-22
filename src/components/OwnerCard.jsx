import { useNavigate } from "react-router-dom";
import "./OwnerCard.css";

function OwnerCard({ owner }) {

    const navigate = useNavigate();

    const bookNow = () => {

        navigate("/booking", {
            state: {
                owner: owner
            }
        });

    };

    return (

        <div className="owner-card">

            <div className="owner-header">

                <div>
                    <h2>👨‍🌾 {owner.name}</h2>
                    <p>📍 {owner.village}, {owner.district}</p>
                </div>

                <div className="owner-status">
                    {owner.available ? "🟢 Available" : "🔴 Busy"}
                </div>

            </div>

            <div className="owner-body">

                <p>
                    ⭐ Rating :
                    <strong> {owner.rating || 5}</strong>
                </p>

                <p>
                    📏 Distance :
                    <strong> {owner.distance?.toFixed(1)} KM</strong>
                </p>

                <p>
                    🚜 Machines :
                    <strong>
                        {" "}
                        {owner.machineTypes?.join(", ")}
                    </strong>
                </p>

                <p>
                    🌍 Service Radius :
                    <strong> {owner.serviceRadius} KM</strong>
                </p>

                <p>
                    💰 Price / Acre :
                    <strong> ₹{owner.pricePerAcre}</strong>
                </p>

                <p>
                    ⏱ Price / Hour :
                    <strong> ₹{owner.pricePerHour}</strong>
                </p>

                <p>
                    📞 Mobile :
                    <strong> {owner.mobile}</strong>
                </p>

            </div>

            <div className="owner-footer">

                <button
                    className="call-btn"
                    onClick={() => window.location.href = `tel:${owner.mobile}`}
                >
                    📞 Call
                </button>

                <button
                    className="book-btn"
                    onClick={bookNow}
                >
                    🚜 Book Now
                </button>

            </div>

        </div>

    );

}

export default OwnerCard;