import { Link, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar({
  title,
  menu,
  user,
  sidebarOpen,
  setSidebarOpen,
}) {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Dark Background */}

      <div
        className={`sidebar-overlay ${
          sidebarOpen ? "show" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        {/* Close Button */}

        <button
          className="close-sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes />
        </button>

        <div>

          <div className="sidebar-logo">
            {title}
          </div>

          <div className="sidebar-user">

            <h3>{user?.name}</h3>

            <p>{user?.role}</p>

          </div>

          <nav className="sidebar-menu">

            {menu.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${
                  location.pathname === item.path
                    ? "active"
                    : ""
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>{item.icon}</span>

                {item.name}

              </Link>

            ))}

          </nav>

        </div>

        <div className="sidebar-footer">

          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;