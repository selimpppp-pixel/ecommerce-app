import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/searchSlice";

import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const [user, setUser] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: isMobile ? "14px" : "18px",
  };

  return (
    <div
      style={{
        background: "#404448",
        color: "#fff",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        padding: isMobile ? "0 15px" : "0 25px", // 👈 زودنا padding
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#ff9900",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          M
        </div>

        <h2 style={{ margin: 0, fontSize: isMobile ? "14px" : "18px" }}>
          M Store
        </h2>
      </div>

      {/* CENTER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "8px" : "25px",
        }}
      >
        {!user ? (
          <Link to="/" style={linkStyle}>
            Login
          </Link>
        ) : (
          <span
            style={{
              ...linkStyle,
              background: "#ff9900",
              color: "#000",
              padding: "3px 6px",
              borderRadius: "5px",
              fontSize: isMobile ? "11px" : "14px",
              maxWidth: "90px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {/* 👇 قص الإيميل */}
            {user.displayName || user.email}
          </span>
        )}

        <Link to="/products" style={linkStyle}>
          Products
        </Link>
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "6px" : "15px",
        }}
      >
        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "6px",
            padding: "3px 6px",
            width: isMobile ? "90px" : "180px", // 👈 أصغر
          }}
        >
          <FaSearch size={12} color="#333" style={{ marginRight: "4px" }} />

          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "11px",
            }}
          />
        </div>

        {/* CART */}
        <Link
          to="/cart"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            position: "relative",
          }}
        >
          <FaShoppingCart size={14} color="#fff" />

          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              background: "red",
              color: "#fff",
              borderRadius: "50%",
              fontSize: "9px",
              padding: "2px 4px",
            }}
          >
            {totalCount}
          </span>
        </Link>

        {/* LOGOUT */}
        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: isMobile ? "2px 6px" : "5px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: isMobile ? "10px" : "14px",
              marginRight: "6px", // 👈 حل المشكلة
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;