import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart, // 🔥 جديد
} from "../redux/slices/cartSlice";

import { useNavigate } from "react-router-dom"; // 🔥 جديد

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
      <h2>My Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {/* 📦 عرض المنتجات */}
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "15px" }}>
              <h4>{item.title}</h4>
              <p>{item.price} $</p>

              {/* ➖ ➕ التحكم في الكمية */}
              <button onClick={() => dispatch(decreaseQty(item.id))}>
                ➖
              </button>

              <span style={{ margin: "0 10px" }}>{item.quantity}</span>

              <button onClick={() => dispatch(increaseQty(item.id))}>
                ➕
              </button>

              {/* 🗑️ حذف */}
              <button
                onClick={() => dispatch(removeItem(item.id))}
                style={{ marginLeft: "10px" }}
              >
                Remove 🗑️
              </button>
            </div>
          ))}

          {/* 💰 التوتال */}
          <h3>Total: {total} $</h3>

          {/* ✅ Checkout */}
          <button
            onClick={() => {
              dispatch(clearCart());   // 🧹 يفضي الكارت
              navigate("/success");    // 🔁 يروح للصفحة
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