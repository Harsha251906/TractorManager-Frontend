import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function DashboardHeader() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                background: "#fff",
                padding: "15px 25px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)"
            }}
        >

            <div>

                <h2>
                    👋 Welcome {user?.name}
                </h2>

                <p>
                    Have a productive farming day 🚜
                </p>

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <NotificationBell />

                <button
                    onClick={logout}
                    style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "12px 22px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default DashboardHeader;