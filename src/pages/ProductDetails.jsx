import { useParams } from "react-router-dom"; 
// ده hook بيجيب الـ id من الرابط

import { useEffect, useState } from "react";
import API from "../services/api";

// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function ProductDetails() {

  // بنجيب id من اللينك
  const { id } = useParams();

  // dispatch عشان نضيف للكارت
  const dispatch = useDispatch();

  // state نخزن فيه بيانات المنتج
  const [product, setProduct] = useState(null);

  // state عشان نعمل responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // متابعة حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // جلب المنتج من API
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  // لو لسه البيانات محملتش
  if (!product) return <p style={{ marginTop: "70px" }}>Loading...</p>;

  return (
    <div
      style={{
        marginTop: "70px",
        padding: "20px",

        // هنا بنعمل layout
        display: "flex",

        // لو موبايل نخليهم تحت بعض
        flexDirection: isMobile ? "column" : "row",

        gap: "30px",
        alignItems: "center",
      }}
    >

      {/* صورة المنتج */}
      <img
        src={product.image}
        style={{
          width: isMobile ? "100%" : "300px",
          maxWidth: "400px",
          borderRadius: "10px",
        }}
      />

      {/* تفاصيل المنتج */}
      <div
        style={{
          maxWidth: "500px",
        }}
      >
        {/* اسم المنتج */}
        <h2>{product.title}</h2>

        {/* الوصف */}
        <p style={{ lineHeight: "1.6" }}>
          {product.description}
        </p>

        {/* السعر */}
        <h3 style={{ color: "green" }}>
          {product.price} $
        </h3>

        {/* زرار إضافة للكارت */}
        <button
          onClick={() => {
            dispatch(
              addToCart({
                ...product,

                // بنحدد id عشان بعض APIs بتستخدم _id
                id: product.id || product._id,
              })
            );
          }}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#ff9900",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;