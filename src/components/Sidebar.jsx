import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar({ title, menu, user }) {

    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

    };

    return (

        <aside className="sidebar">

            <div>

                <h2 className="sidebar-logo">{title}</h2>

                <div className="sidebar-user">

                    <h3>{user?.name}</h3>

                    <p>{user?.role}</p>

                </div>

               <nav className="sidebar-menu">

                    {

                        menu.map((item)=>(
                            <Link
                                key={item.path}
                                to={item.path}
                                className={
                                    `sidebar-link ${
                                        location.pathname === item.path ? "active" : ""
                                    }`
                                }
                            >
                                <span>{item.icon}</span>
                                {item.name}
                            </Link>

                        ))

                    }

                </nav>

            </div>

            <button

                className="logout-btn"

                onClick={logout}

            >

                🚪 Logout

            </button>

        </aside>

    );

}

export default Sidebar;