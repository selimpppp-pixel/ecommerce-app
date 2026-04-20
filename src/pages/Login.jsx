import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 🔥 ضفنا Link

// 🔥 Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  // 🧠 state لتخزين الإيميل والباسورد
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🚀 Login باستخدام Firebase
  const handleLogin = async () => {
    try {
      // 🔥 تسجيل الدخول من Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("FIREBASE USER:", userCredential.user);

      // 🟢 نخزن token عشان ProtectedRoute يشتغل
      localStorage.setItem("token", userCredential.user.uid);

      // 🔁 نروح لصفحة المنتجات
      navigate("/products");
    } catch (error) {
      console.log("FIREBASE LOGIN ERROR:", error.message);

      // ❌ لو البيانات غلط
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
          border: "1px solid #eee",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {/* 📧 Email */}
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
          }}
        />

        {/* 🔒 Password */}
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
          }}
        />

        {/* 🔘 Login Button */}
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

        {/* 👇 🔥 هنا حطينا لينك التسجيل */}
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