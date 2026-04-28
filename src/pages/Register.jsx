import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // 👈 مهم

function Register() {
  const { darkMode } = useTheme(); // 👈 مهم

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Fill all fields ❗");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      localStorage.setItem("token", userCredential.user.uid);

      alert("Account created successfully ✅");

      navigate("/products");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: darkMode
          ? "linear-gradient(to right, #1a1a1a, #2a2a2a)"
          : "linear-gradient(to right, #e6e9f0, #eef1f5)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "25px",
          borderRadius: "16px",
          background: darkMode ? "#1f1f1f" : "#fff",
          color: darkMode ? "#fff" : "#000",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        {/* 🔥 العنوان (متظبط 100%) */}
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            color: darkMode ? "#ff9900" : "#000",
            opacity: 1,
            zIndex: 10,
            position: "relative",
          }}
        >
          Create Account
        </h2>

        {/* 👤 NAME */}
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          style={inputStyle(darkMode)}
        />

        {/* 📧 EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle(darkMode)}
        />

        {/* 🔑 PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle(darkMode)}
        />

        {/* 🔁 CONFIRM */}
        <input
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle(darkMode)}
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff9900",
            border: "none",
            color: "#000",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

// 🔥 input style
const inputStyle = (darkMode) => ({
  width: "100%",
  marginBottom: "12px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  background: darkMode ? "#333" : "#fff",
  color: darkMode ? "#fff" : "#000",
});

export default Register;