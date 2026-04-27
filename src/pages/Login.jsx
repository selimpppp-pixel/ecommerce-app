import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

import { useTheme } from "../context/ThemeContext";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 لو مسجل قبل كدا
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/products");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Fill all fields ❗");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("token", userCredential.user.uid);

      toast.success("Welcome back 🎉");

      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      toast.error("Email or Password wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Toaster />

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "25px",
          borderRadius: "12px",
          background: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#000",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        />

        {/* Password + 👁 */}
        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />

          <span
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
              fontSize: "14px",
              opacity: 0.7,
            }}
          >
            {showPass ? "🙈" : "👁"}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "#999" : "#ff9900",
            border: "none",
            color: "#000",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Register */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#ff9900", fontWeight: "bold" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;