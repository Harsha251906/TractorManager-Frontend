import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EmailOtpLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= SEND OTP =================

  const sendOTP = async () => {
    try {
      setLoading(true);

      const res = await api.post("/otp/send", {
        email,
      });

      alert(res.data.message);

      setOtpSent(true);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to Send OTP"
      );

    }

    setLoading(false);
  };

  // ================= VERIFY OTP =================

  const verifyOTP = async () => {

    try {

      setLoading(true);

      const res = await api.post("/otp/verify", {
        email,
        otp,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Invalid OTP"
      );

    }

    setLoading(false);

  };

  return (
    <div
      style={{
        width: "400px",
        margin: "60px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,.2)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        📧 Email OTP Login
      </h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={sendOTP}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading
          ? "Sending..."
          : "Send OTP"}
      </button>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter 6 Digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
            }}
          />

          <button
            onClick={verifyOTP}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}

export default EmailOtpLogin;