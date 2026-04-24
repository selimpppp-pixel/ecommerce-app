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

  // المنتجات في الكارت
  const cartItems = useSelector((state) => state.cart.items);

  // بيانات اليوزر
  const [user, setUser] = useState(null);

  // responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // متابعة تسجيل الدخول
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // متابعة حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // حساب عدد المنتجات في الكارت
  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // تسجيل الخروج
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // ستايل اللينكات
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
        right: 0, // 👈 حل المشكلة
        width: "100%",
      
        padding: isMobile ? "0 10px" : "0 25px",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* 🔵 LEFT (اللوجو) */}
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

      {/* 🟡 CENTER (اللينكات) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "10px" : "25px",
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
              padding: "4px 8px",
              borderRadius: "5px",
              fontSize: isMobile ? "12px" : "14px",
            }}
          >
            {user.displayName || user.email}
          </span>
        )}
<Link
  to="/products"
  style={{
    ...linkStyle,
    marginRight: isMobile ? "5px" : "15px", // 👈 الحل
  }}
>
  Products
</Link>
      </div>

      {/* 🔴 RIGHT (search + cart + logout) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
       gap: isMobile ? "8px" : "15px",
        }}
      >
        {/* البحث */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "6px",
            padding: "4px 8px",
            width: isMobile ? "120px" : "180px",
          }}
        >
          <FaSearch size={14} color="#333" style={{ marginRight: "4px" }} />

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

        {/* الكارت */}
        <Link
          to="/cart"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? "28px" : "32px",
            height: isMobile ? "28px" : "32px",
            borderRadius: "8px",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <FaShoppingCart size={16} color="#fff" />

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

        {/* logout */}
        {user && (
  <button
    onClick={handleLogout}
    style={{
      background: "red",
      color: "#fff",
      border: "none",

      // 👇 صغرنا الحجم
      padding: isMobile ? "2px 6px" : "4px 10px",

      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",

      // 👇 أهم حاجة عشان ميتلزقش في الحافة
      marginRight: "5px",

      // 👇 حجم الخط أصغر
      fontSize: isMobile ? "10px" : "13px",

      // 👇 عرض ثابت صغير يخليه يبان
      minWidth: isMobile ? "50px" : "65px",
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