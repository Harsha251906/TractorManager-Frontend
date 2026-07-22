import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function Header() {

    return (

        <div
            style={{
                height: "60px",
                background: "#2e7d32",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,.2)"
            }}
        >

            <h2 style={{ margin: 0 }}>
                🚜 Tractor Manager
            </h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <Link
                    to="/"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    Dashboard
                </Link>

                <NotificationBell />

            </div>

        </div>

    );

}

export default Header;