import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../firebase";
import api from "../services/api";
import "../styles/Login.css";

function OtpLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (mobile.length !== 10) {
      alert("Enter a valid 10 digit mobile number");
      return;
    }

    try {
      setLoading(true);

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal",
          }
        );
      }

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + mobile,
        window.recaptchaVerifier
      );

      setConfirmationResult(result);

      alert("OTP Sent Successfully");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }

    setLoading(false);
  };

  const verifyOTP = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const result = await confirmationResult.confirm(otp);

      const idToken = await result.user.getIdToken();

      const res = await api.post("/auth/firebase-login", {
        idToken,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
  console.error("FULL ERROR:", error);
  console.error("CODE:", error.code);
  console.error("MESSAGE:", error.message);

  alert(error.code + "\n\n" + error.message);

  setLoading(false);
}

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>📱</h1>

        <h2>Login with Mobile OTP</h2>

        <input
          type="tel"
          placeholder="Enter 10 Digit Mobile Number"
          value={mobile}
          onChange={(e) => {
            const value = e.target.value
              .replace(/\D/g, "")
              .slice(0, 10);

            setMobile(value);
          }}
          maxLength={10}
          inputMode="numeric"
        />

        <button
          className="login-btn"
          onClick={sendOTP}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <br />
        <br />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
                .replace(/\D/g, "")
                .slice(0, 6)
            )
          }
          maxLength={6}
        />

        <button
          className="login-btn"
          onClick={verifyOTP}
          disabled={!confirmationResult || loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div
          id="recaptcha-container"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>

      </div>
    </div>
  );
}

export default OtpLogin;