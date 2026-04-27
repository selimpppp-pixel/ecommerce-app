import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 📱 responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📦 fetch product
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

  if (!product) return <p style={{ marginTop: "80px" }}>Loading...</p>;

  return (
    <div
      style={{
        marginTop: "80px",
        padding: "20px",
        maxWidth: "1100px",   // 👈 أهم تحسين
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* 🔙 BACK */}
      <div
        onClick={() => navigate(-1)}
        style={{
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "bold",
          color: "#ff9900",
        }}
      >
        <FaArrowLeft /> Back
      </div>

      {/* MAIN */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* 🖼 IMAGE */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <img
            src={product.image}
            style={{
              width: "100%",
              maxHeight: "350px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* 📄 DETAILS */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: "10px" }}>
            {product.title}
          </h2>

          <p
            style={{
              lineHeight: "1.6",
              opacity: 0.7,
              marginBottom: "15px",
            }}
          >
            {product.description}
          </p>

          <h3
            style={{
              color: "#ff9900",
              fontSize: "22px",
              marginBottom: "20px",
            }}
          >
            ${product.price}
          </h3>

          {/* 🛒 BUTTON */}
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  ...product,
                  id: product.id || product._id,
                })
              );

              Swal.fire({
                title: "Added to cart 🛒",
                text: product.title,
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
              });
            }}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(45deg,#ffb347,#ff9900)",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;