import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ================= AUTH =================
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpLogin from "./pages/OtpLogin";
import EmailOtpLogin from "./pages/EmailOtpLogin";

// ================= OWNER =================
import Dashboard from "./pages/Dashboard";
import Work from "./pages/Work";
import History from "./pages/History";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import OwnerBookings from "./pages/OwnerBookings";
import OwnerLiveTracking from "./pages/OwnerLiveTracking";

// ================= FARMER =================
import FarmerDashboard from "./pages/FarmerDashboard";
import NearbyOwners from "./pages/NearbyOwners";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import FarmerLiveTracking from "./pages/FarmerLiveTracking";

// ================= COMMON =================
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";

// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ================= ROLE ROUTE =================

function HomeRedirect() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "Owner") {
    return <Navigate to="/owner" replace />;
  }

  if (user.role === "Farmer") {
    return <Navigate to="/farmer" replace />;
  }

  if (user.role === "Admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* ================= DEFAULT ================= */}

          <Route path="/" element={<HomeRedirect />} />

          {/* ================= AUTH ================= */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/otp-login" element={<OtpLogin />} />

          <Route path="/email-otp" element={<EmailOtpLogin />} />

          {/* ================= OWNER ================= */}

          <Route
            path="/owner"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/work"
            element={
              <ProtectedRoute>
                <Work />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner-bookings"
            element={
              <ProtectedRoute>
                <OwnerBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner-live-tracking"
            element={
              <ProtectedRoute>
                <OwnerLiveTracking />
              </ProtectedRoute>
            }
          />

          {/* ================= FARMER ================= */}

          <Route
            path="/farmer"
            element={
              <ProtectedRoute>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nearby-owners"
            element={
              <ProtectedRoute>
                <NearbyOwners />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer-live-tracking"
            element={
              <ProtectedRoute>
                <FarmerLiveTracking />
              </ProtectedRoute>
            }
          />

          {/* ================= COMMON ================= */}

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= 404 ================= */}

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;