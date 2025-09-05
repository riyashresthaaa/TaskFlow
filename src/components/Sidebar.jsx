import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout, session } = useAuth();
  const navigate = useNavigate();
  const linkClass = ({ isActive }) => "side-link" + (isActive ? " active" : "");

  return (
    <aside className="sidebar">
      <Link to="/" className="brand-logo-only">
        <img src="/taskflow.png" alt="TaskFlow" className="brand-img" />
      </Link>

      <div className="side-group"></div>

      <div className="sidebar-bottom">
        {session.isAuthenticated ? (
          <>
            <NavLink to="/profile" className={({ isActive }) => "side-link profile-link" + (isActive ? " active" : "")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                  src={user.photoDataUrl || "/taskflow.png"}
                  alt=""
                  style={{ width: 24, height: 24, borderRadius: "50%", background: "#fff" }}
                />
                <div>
                  <div>Profile</div>
                  <small>{user.name || "User"}</small>
                </div>
              </div>
            </NavLink>

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        )}
      </div>
    </aside>
  );
}
