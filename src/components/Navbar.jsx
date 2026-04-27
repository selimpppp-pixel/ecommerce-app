import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/searchSlice";

import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState, useRef } from "react";
import {
  FaHeart,
  FaSearch,
  FaMoon,
  FaSun,
  FaShoppingCart,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.favorites.items);

  const { darkMode, setDarkMode } = useTheme();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div
      style={{
        background: darkMode ? "#1f1f1f" : "#ffffff",
        color: darkMode ? "#fff" : "#000",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "fixed",
        top: 0,
        width: "100%",
        boxSizing: "border-box",
        zIndex: 9999,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2
          onClick={() => navigate("/")}
          style={{ margin: 0, cursor: "pointer" }}
        >
          <span style={{ color: "#ff9900" }}>M</span> Store
        </h2>

        {/* 👤 الاسم هنا جنب اللوجو */}
        {user && (
          <span style={{ fontSize: "14px", opacity: 0.8 }}>
            ({user.displayName || user.email.split("@")[0]})
          </span>
        )}

        {/* LINKS */}
        {!isMobile && (
          <>
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Home
            </span>

            <span onClick={() => navigate("/products")} style={{ cursor: "pointer" }}>

    Products

  </span>
  <span onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>
  About
</span>

<span onClick={() => navigate("/contact")} style={{ cursor: "pointer" }}>
  Contact
</span>
          </>
        )}
      </div>

      {/* SEARCH */}
      {!isMobile && user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: darkMode ? "#333" : "#f1f1f1",
            borderRadius: "20px",
            padding: "6px 12px",
            width: "200px",
          }}
        >
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            style={{
              border: "none",
              outline: "none",
              marginLeft: "8px",
              background: "transparent",
              width: "100%",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </div>
      )}

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px", marginRight: "20px" ,}}>
        {!isMobile && user && (
          <>
            {/* ❤️ */}
            <div
              onClick={() => navigate("/favorites")}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <FaHeart color="black" />
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-10px",
            
                 backgroundColor: "orange",
                  color: "#fff",
                  borderRadius: "50%",
                  fontSize: "10px",
                  padding: "2px 5px",
                }}
              >
                {favorites.length}
              </span>
            </div>

            {/* 🛒 */}
            <div
              onClick={() => navigate("/cart")}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <FaShoppingCart />
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-10px",
                  background: "orange",
                  backgroundColor: "orange",
                  color: "#fff",
                  borderRadius: "50%",
                  fontSize: "10px",
                  padding: "2px 5px",
                }}
              >
                {totalCount}
              </span>
            </div>

            {/* 🌙 */}
            <div onClick={() => setDarkMode(!darkMode)} style={{ cursor: "pointer" }}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </div>

            {/* 🔴 LOGOUT */}
            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "12px",
                marginLeft: "10PX",
              }}
            >
              Logout
            </button>
          </>
        )}

        {/* 📱 MOBILE */}
{isMobile && (
  <div ref={menuRef}>

    {/* زرار المنيو */}
    <div
      onClick={() => setShowMenu(prev => !prev)}
      style={{ cursor: "pointer", fontSize: "22px" }}
    >
      ☰
    </div>

    {/* overlay */}
    {showMenu && (
      <div
        onClick={() => setShowMenu(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(0,0,0,0.4)",
          zIndex: 999,
        }}
      />
    )}

    {/* المينيو */}
    {showMenu && (
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "75%",
          height: "100vh",
          background: darkMode ? "#1a1a1a" : "#fff",
          color: darkMode ? "#fff" : "#000",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
  {/* 👤 USER */}
  <h3 style={{ marginBottom: "10px" }}>
    👋 Welcome {user?.displayName || user?.email?.split("@")[0]}
  </h3>

  <hr />

  {/* 🔗 LINKS */}
  {[
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Favorites", path: "/favorites", count: favorites.length },
    { name: "Cart", path: "/cart", count: totalCount },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ].map((item, i) => (
    <div
      key={i}
      onClick={() => {
        navigate(item.path);
        setShowMenu(false); // 👈 يقفل المينيو
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = darkMode ? "#333" : "#f2f2f2")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      <span>
        👉 {item.name}
        {item.count !== undefined && ` (${item.count})`}
      </span>

      <span>›</span> {/* سهم */}
    </div>
  ))}

  <hr />

  {/* 🌙 DARK MODE */}
  <div
    onClick={() => setDarkMode(!darkMode)}
    style={{
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </div>

  <hr />

  {/* 🚪 LOGOUT */}
  <button
    onClick={() => {
      handleLogout();
      setShowMenu(false);
    }}
    style={{
      background: "red",
      color: "#fff",
      border: "none",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "10px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;