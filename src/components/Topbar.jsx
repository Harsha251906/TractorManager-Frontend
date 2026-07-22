import "../styles/Topbar.css";

function Topbar({

    title,

    user

}) {

    const firstLetter =

        user?.name

            ? user.name.charAt(0).toUpperCase()

            : "U";

    return (

        <header className="topbar">

            <div className="topbar-left">

                <h2 className="topbar-title">

                    {title}

                </h2>

            </div>

            <div className="topbar-right">

                <div className="profile-box">

                    <div className="profile-avatar">

                        {firstLetter}

                    </div>

                    <div>

                        <div
                            style={{
                                fontWeight: "700",
                                color: "#111827"
                            }}
                        >
                            {user?.name || "User"}
                        </div>

                        <div
                            style={{
                                fontSize: "13px",
                                color: "#6b7280"
                            }}
                        >
                            {user?.role || "Member"}
                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Topbar;