import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        background: "#404448",
        color: "#fff",
        padding: "30px 20px",
        marginTop: "50px",
      }}
    >
      {/* 🔝 الجزء الأول */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* 🟢 LOGO */}
        <div>
          <h2>M Store</h2>
          <p style={{ fontSize: "14px" }}>
            Your favorite place for shopping 🛒
          </p>
        </div>

        {/* 🔵 LINKS */}
        <div>
          <h3>Links</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link to="/products" style={linkStyle}>
              Products
            </Link>
            <Link to="/cart" style={linkStyle}>
              Cart
            </Link>
          </div>
        </div>

        {/* 🟡 CONTACT + ICONS */}
        <div>
          <h3>Contact</h3>
          <p style={{ fontSize: "14px" }}>Email: store@email.com</p>
          <p style={{ fontSize: "14px" }}>Phone: 01000000000</p>

          {/* 🔥 Social Icons */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#25D366" }}
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#E1306C" }}
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1DA1F2" }}
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* 🔻 خط */}
      <hr style={{ margin: "20px 0", borderColor: "#666" }} />

      {/* 🔽 COPYRIGHT */}
      <p style={{ textAlign: "center", fontSize: "12px" }}>
        ©️ 2026 M Store. All rights reserved.
      </p>
    </div>
  );
}

export default Footer; 