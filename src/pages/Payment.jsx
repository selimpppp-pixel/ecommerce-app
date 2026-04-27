import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    Swal.fire({
      title: "Payment Successful 💳✨",
      text: "Your order has been placed!",
      icon: "success",
      confirmButtonColor: "#ff9900",
    }).then(() => {
      dispatch(clearCart());   // 🧹 يفضي الكارت بعد الدفع
      navigate("/success");    // 🔁 يروح لصفحة النجاح
    });
  };

  return (
    <div
      style={{
        marginTop: "70px",
        padding: "20px",
        maxWidth: "500px",
        marginInline: "auto",
      }}
    >
      <h2>💳 Payment</h2>

      {/* 💰 Total */}
      <h3 style={{ marginBottom: "20px" }}>
        Total: {total} $
      </h3>

      {/* 💳 Fake Form */}
      <input
        type="text"
        placeholder="Card Number"
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Card Holder Name"
        style={inputStyle}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="MM/YY"
          style={{ ...inputStyle, flex: 1 }}
        />

        <input
          type="text"
          placeholder="CVV"
          style={{ ...inputStyle, flex: 1 }}
        />
      </div>

      {/* ✅ Pay Button */}
      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          background: "linear-gradient(45deg,#ffb347,#ff9900)",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Pay Now 💳
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default Payment;