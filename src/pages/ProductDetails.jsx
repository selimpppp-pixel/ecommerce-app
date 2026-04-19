import { useParams } from "react-router-dom"; // 👈 عشان نجيب id من الرابط
import { useEffect, useState } from "react";
import API from "../services/api";

// 🛒 Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function ProductDetails() {
  // 📌 بنجيب الـ id من URL (مثلاً /products/5)
  const { id } = useParams();

  // 🧠 dispatch عشان نستخدم Redux
  const dispatch = useDispatch();

  // 📦 state نخزن فيه بيانات المنتج
  const [product, setProduct] = useState(null);

  // 🔄 أول ما الصفحة تفتح → نجيب المنتج من API
  useEffect(() => {
    const getProduct = async () => {
      try {
        // 📡 طلب المنتج بالـ id
        const res = await API.get(`/products/${id}`);

        // 🟢 نحفظ المنتج في state
        setProduct(res.data);
      } catch (error) {
        console.log(error); // ❌ لو في error
      }
    };

    getProduct();
  }, [id]); // 👈 كل ما الـ id يتغير يعيد الطلب

  // ⏳ لو لسه البيانات ماجتش
  if (!product) return <p style={{ marginTop: "70px" }}>Loading...</p>;

  return (
    <div
      style={{
        marginTop: "70px",
        padding: "20px",

        display: "flex", // 🔥 يخلي الصورة والتفاصيل جنب بعض
        gap: "30px",
        alignItems: "center",
      }}
    >
      {/* 🖼️ صورة المنتج */}
      <img
        src={product.image}
        style={{
          width: "300px",
          borderRadius: "10px",
        }}
      />

      {/* 📄 تفاصيل المنتج */}
      <div>
        {/* 🏷️ اسم المنتج */}
        <h2>{product.title}</h2>

        {/* 📝 الوصف */}
        <p>{product.description}</p>

        {/* 💰 السعر */}
        <h3 style={{ color: "green" }}>{product.price} $</h3>

        {/* 🛒 زرار Add to Cart */}
        <button
          onClick={() => {
            // 🔥 نضيف المنتج للكارت في Redux
            dispatch(
              addToCart({
                ...product,

                // 👇 مهم عشان بعض APIs بتستخدم id أو _id
                id: product.id || product._id,
              })
            );
          }}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#ff9900",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;