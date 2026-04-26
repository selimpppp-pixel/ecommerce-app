import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { useTheme } from "../context/ThemeContext"; // 👈 مهم

function Login() {
  const navigate = useNavigate();
  const { darkMode } = useTheme(); // 👈 مهم

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("token", userCredential.user.uid);
      navigate("/products");
    } catch (error) {
      alert("Email or Password wrong ❌");
    }
  };

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          borderRadius: "10px",
          background: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#000",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#ff9900",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        {/* Register */}
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#ff9900", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;