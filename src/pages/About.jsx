import { FaStar, FaTruck, FaLock, FaHeadset } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function About() {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        marginTop: "70px",
        padding: "30px",
        minHeight: "100vh",
        background: darkMode ? "#111" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        textAlign: "center",
      }}
    >
      <h2>About M Store 🛍</h2>

      <p style={{ maxWidth: "600px", margin: "20px auto" }}>
        Welcome to M Store! We provide high-quality products at the best prices.
        Our goal is to make your shopping experience fast, easy, and enjoyable.
      </p>

      {/* ⭐ Rating */}
      <div style={{ margin: "20px 0" }}>
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color="#ff9900" />
        ))}
        <p style={{ marginTop: "10px" }}>Rated 4.8 by our customers</p>
      </div>

      {/* 💡 Features */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        <div>
          <FaTruck size={30} />
          <p>Fast Delivery</p>
        </div>

        <div>
          <FaLock size={30} />
          <p>Secure Payment</p>
        </div>

        <div>
          <FaHeadset size={30} />
          <p>24/7 Support</p>
        </div>
      </div>
    </div>
  );
}

export default About;