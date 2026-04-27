import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart, // 🔥 جديد
} from "../redux/slices/cartSlice";

import { useNavigate } from "react-router-dom"; // 🔥 جديد
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🔥

  const cart = useSelector((state) => state.cart.items);

  // 🧮 حساب التوتال
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ marginTop: "70px", padding: "20px" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  My Cart
<FaShoppingCart size={20} color="#ff9900" />
</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {/* 📦 عرض المنتجات */}
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
          {/* 💰 التوتال */}
          <h3>Total: {total} $</h3>

          {/* ✅ Checkout */}
          <button
            onClick={() => {
              navigate("/payment");    // 🔁 يروح للصفحة
            }}
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
        </>
      )}
    </div>
  );
}

export default Cart;