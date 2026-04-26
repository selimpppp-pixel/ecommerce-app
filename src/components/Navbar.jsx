import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/searchSlice";

import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState, useRef } from "react";
import { FaHeart, FaSearch, FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const { darkMode, setDarkMode } = useTheme();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const menuRef = useRef();

  // 👤 user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 📱 responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 👆 close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    await signOut(auth);
    setShowMenu(false);
    navigate("/");
  };

  return (
    <div
      style={{
        background: darkMode ? "#222" : "#36383a",
        color: "#fff",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 10px" : "0 15px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <h2
          style={{
            margin: 0,
            cursor: "pointer",
            fontSize: isMobile ? "16px" : "20px",
          }}
          onClick={() => navigate("/")}
        >
          <span style={{ color: "#ff9900" }}>M</span> Store
        </h2>

        {user && (
          <span
            onClick={() => navigate("/products")}
            style={{
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Products
          </span>
        )}
      </div>

      {/* SEARCH */}
      {user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "20px",
            padding: "6px 10px",
            width: isMobile ? "120px" : "180px",
          }}
        >
          <FaSearch size={14} color="#333" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            style={{
              border: "none",
              outline: "none",
              marginLeft: "8px",
              width: "100%",
            }}
          />
        </div>
      )}

      {/* BURGER */}
      <div ref={menuRef} style={{ position: "relative" }}>
        <div
          onClick={() => setShowMenu(!showMenu)}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginRight: isMobile ? "20px" : "60px",
          }}
        >
          <span style={{ width: "25px", height: "3px", background: "#fff" }} />
          <span style={{ width: "25px", height: "3px", background: "#fff" }} />
          <span style={{ width: "25px", height: "3px", background: "#fff" }} />
        </div>

        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: "45px",
              right: 0,
              transform: "translateX(-20px)",
              background: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
              borderRadius: "12px",
              padding: "15px",
              width: "230px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* USER */}
            {user && (
              <div
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                👤 {user.displayName || user.email}
              </div>
            )}

            {/* DARK MODE */}
            <div
              onClick={() => setDarkMode(!darkMode)}
              style={{ cursor: "pointer", padding: "6px" }}
            >
              {darkMode ? <FaSun /> : <FaMoon />} Dark Mode
            </div>

            {/* FAVORITES */}
            <div
              onClick={() => {
                navigate("/favorites");
                setShowMenu(false);
              }}
              style={{ cursor: "pointer", padding: "6px" }}
            >
              ❤️ Favorites
            </div>

            {/* CART */}
            <div
              onClick={() => {
                navigate("/cart");
                setShowMenu(false);
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              <span>Cart</span>
              <span style={{ color: "red" }}>{totalCount}</span>
            </div>

            {/* LOGOUT */}
            {user && (
              <button
                onClick={handleLogout}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;