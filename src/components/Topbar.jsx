import { FaBars } from "react-icons/fa";

import "../styles/Topbar.css";

function Topbar({

    title,

    user,

    toggleSidebar

}) {

    const firstLetter =
        user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U";

    return (

        <header className="topbar">

            <div className="topbar-left">

                <button
                    className="menu-btn"
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>

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

                        <div className="profile-name">

                            {user?.name || "User"}

                        </div>

                        <div className="profile-role">

                            {user?.role || "Member"}

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Topbar;