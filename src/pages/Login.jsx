import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import api from "../services/api";
import socket from "../services/socket";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // CONNECT SOCKET
  // ==========================

  const connectSocket = (user) => {
    socket.disconnect();
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected :", socket.id);

      socket.emit("join", user._id);

      console.log("Joined Room :", user._id);
    });
  };

  // ==========================
  // REDIRECT USER
  // ==========================

  const redirectUser = (user) => {
    if (user.role === "Owner") {
      navigate("/owner", { replace: true });
    } else if (user.role === "Farmer") {
      navigate("/farmer", { replace: true });
    } else if (user.role === "Admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  // ==========================
  // EMAIL LOGIN
  // ==========================

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      connectSocket(res.data.user);

      alert("✅ Login Successful");

      redirectUser(res.data.user);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    }

    setLoading(false);
  };

  // ==========================
  // GOOGLE LOGIN
  // ==========================

  const loginWithGoogle = async () => {
    try {
      await signOut(auth);

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(
        auth,
        provider
      );

      const idToken =
        await result.user.getIdToken();

      const res = await api.post(
        "/auth/google-login",
        {
          idToken,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      connectSocket(res.data.user);

      alert("✅ Google Login Successful");

      redirectUser(res.data.user);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.message
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>🚜</h1>

        <h2>Tractor Manager</h2>

        {/* GOOGLE */}

        <div className="auth-buttons">

          <button
            type="button"
            className="google-btn"
            onClick={loginWithGoogle}
          >
            <FcGoogle size={22} />

            Continue with Google
          </button>

          <button
            type="button"
            className="phone-btn"
            onClick={() =>
              navigate("/otp-login")
            }
          >
            <FaPhoneAlt />

            Phone OTP
          </button>

        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* EMAIL LOGIN */}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div
            style={{
              position: "relative",
              marginBottom: "18px",
            }}
          >

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                marginBottom: 0,
                paddingRight: "45px",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : "Login"}
          </button>

        </form>

        <p
          style={{
            textAlign: "right",
            marginTop: "15px",
          }}
        >
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p className="register-text">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;