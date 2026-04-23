import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/searchSlice";

import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const [user, setUser] = useState(null);

  // respo 1- ده اتضاف هنا (فوق خالص)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // respo 2- ده اتضاف برضه
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
    fontSize: isMobile ? "14px" : "18px", //  بيصغر في الموبايل
  };

  return (
    <div
      style={{
        background: "#404448",
        color: "#fff",
        padding: "6px 15px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        maxwidth: "1200px",
        margin:"0 auto",
        zIndex: 1000,
    boxSizing:"border-box",
      }}
    >
      {/* 🟢 LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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

      {/* 🔵 LINKS */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? "10px" : "30px", // 📱 مسافة أقل
          alignItems: "center",
        }}
      >
        {!user && (
          <Link to="/" style={linkStyle}>
            Login
          </Link>
        )}

        <Link to="/products" style={linkStyle}>
          Products
        </Link>
      </div>

      {/* 🔍 SEARCH */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderRadius: "6px",
          padding: "3px 6px",

          // هنا المهم
          width: isMobile ? "120px" : "180px",
        }}
      >
        <span style={{ marginRight: "4px" }}>🔍</span>

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => dispatch(setSearch(e.target.value))}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "12px",
          }}
        />
      </div>

      {/* 🛒 CART */}
      <Link
        to="/cart"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "28px" : "32px",
          height: isMobile ? "28px" : "32px",
          borderRadius: "8px",
          color: "#000",
          position: "relative",
          fontWeight: "bold",
          marginLeft: "5px",
          flexShrink: 0, // 🔥 يخليه ميختفيش
        }}
      >
        🛒
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            background: "red",
            color: "#fff",
            borderRadius: "50%",
            fontSize: "10px",
            padding: "2px 5px",
          }}
        >
          {totalCount}
        </span>
      </Link>

      {/* 🔴 LOGOUT */}
      {user && (
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "#fff",
            border: "none",
            padding: "4px 8px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            marginLeft: "5px",
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;