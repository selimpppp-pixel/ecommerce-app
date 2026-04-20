import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/searchSlice";

// 🔥 Firebase
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // 🔥 user state من Firebase
  const [user, setUser] = useState(null);

  // 👂 نسمع تغييرات login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🧮 عدد المنتجات في الكارت
  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // 🔴 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // 🎨 style للينكات
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "#404448",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed", // 🔥 يخليه ثابت
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* 🟢 LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#ff9900",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          M
        </div>

        <h2 style={{ margin: 0 }}>M Store</h2>
      </div>

      {/* 🟡 SEARCH */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => dispatch(setSearch(e.target.value))}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            fontSize: "16px"
          }}
        />
      </div>

      {/* 🔵 LINKS */}
     <div
  style={{
    display: "flex",
    gap: "25px", // 🔥 المسافة بين اللينكات
    alignItems: "center",
    marginRight: "40px", // 🔥 يبعدهم عن يمين الشاشة
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

        <Link to="/cart" style={linkStyle}>
          Cart 🛒 ({totalCount})
        </Link>

        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
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