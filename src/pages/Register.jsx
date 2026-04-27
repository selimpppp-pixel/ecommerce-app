import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    // ❗ تحقق من البيانات
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields ❗");
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

      // 🔥 نحفظ الاسم
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // 🔥 نسجله login
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
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "25px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account
        </h2>

        {/* 👤 User Name */}
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 📧 Email */}
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 🔑 Password */}
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 🔁 Confirm Password */}
        <input
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 🔘 Button */}
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff9900",
            border: "none",
            color: "#000",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;