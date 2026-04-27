import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../redux/slices/cartSlice";

import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);

  // 🧮 حساب التوتال
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        marginTop: "70px",
        padding: "20px",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column", // ✅ اتصلحت
        maxWidth: "900px",
        marginInline: "auto",
      }}
    >
      <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        My Cart
        <FaShoppingCart size={20} color="#ff9900" />
      </h2>

      {cart.length === 0 ? (
        <p style={{ marginTop: "40px" }}>Cart is empty 😢</p>
      ) : (
        <>
          {/* 📦 المنتجات */}
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "15px",
                display: "flex",
                gap: "15px",
                alignItems: "center",
                border: "1px solid #eee",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {/* 🖼️ الصورة */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  background: "#fff",
                  borderRadius: "8px",
                }}
              />

              <div>
                <h4>{item.title}</h4>
                <p>{item.price} $</p>

                {/* ➖ ➕ */}
                <button onClick={() => dispatch(decreaseQty(item.id))}>
                  ➖
                </button>

                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>

                <button onClick={() => dispatch(increaseQty(item.id))}>
                  ➕
                </button>

                {/* 🗑️ */}
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  style={{ marginLeft: "10px" }}
                >
                  Remove 🗑️
                </button>
              </div>
            </div>
          ))}

          {/* 🔽 الجزء اللي تحت */}
          <div style={{ marginTop: "auto" }}>
            <h3>Total: {total} $</h3>

            <button
              onClick={() => navigate("/payment")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Checkout ✅
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;