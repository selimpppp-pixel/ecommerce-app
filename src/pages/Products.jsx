import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleFavorite } from "../redux/slices/favoritesSlice";
import { useTheme } from "../context/ThemeContext";
import Swal from "sweetalert2";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const search = useSelector((state) => state.search.query);
  const favorites = useSelector((state) => state.favorites.items);

  const { darkMode } = useTheme();

  useEffect(() => {
    const getProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data.products || res.data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const res = await API.get("/products/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

  const handleCategoryClick = async (cat) => {
    setSelectedCategory(cat);
    const res = await API.get(`/products/category/${cat}`);
    setProducts(res.data.products || res.data || []);
    setShowCategories(false);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes((search || "").toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div
      style={{
        marginTop: "70px",
        padding: "25px",
        background: darkMode ? "#0f0f0f" : "#f7f7f7",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>🔥 Products</h2>

      {/* Categories */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <button
          onClick={() => setShowCategories(!showCategories)}
          style={{
            padding: "10px 16px",
            background: "#ff9900",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Browse Categories
        </button>

        <button
          onClick={async () => {
            const res = await API.get("/products");
            setProducts(res.data.products || res.data);
            setSelectedCategory(null);
          }}
          style={{
            marginLeft: "10px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          All Products
        </button>

        {showCategories && (
          <>
            <div
              onClick={() => setShowCategories(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 999,
              }}
            />

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "260px",
                height: "100%",
                background: darkMode ? "#1c1c1c" : "#fff",
                padding: "20px",
                zIndex: 1000,
              }}
            >
              <h3>Categories</h3>

              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
        }}
      >
        {currentProducts.map((product) => {
          const productId = product.id || product._id;
          const isFav = favorites.find((p) => p.id === productId);

          return (
            <div
              key={productId}
              style={{
                borderRadius: "16px",
                padding: "15px",
                background: darkMode ? "#1a1a1a" : "#fff",
                border: "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
              }}
            >
              <div style={{ position: "relative" , overflow: "hidden"}}>
                {product.price > 100 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "red",
                      color: "#fff",
                      fontSize: "12px",
                      padding: "4px 6px",
                      borderRadius: "6px",
                      zIndex: 2
                    }}
                  >
                    SALE
                  </span>
                )}

<div
  onClick={() => {
  dispatch(toggleFavorite({ ...product, id: productId }));

  if (!isFav) {
    Swal.fire({
      title: "Added to favorites ❤️",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }
}}
  style={{
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    zIndex: 3,              // 🔥 أهم سطر
    background: "#fff",     // 👌 يخليه واضح
    padding: "5px",
    borderRadius: "50%",
  }}
>
                  {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>

                {/* 🔥 IMAGE WITH ZOOM */}
                <img
                  src={product.image}
                  onClick={() => navigate(`/products/${productId}`)}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: "10px",
                    transition: "0.4s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>

              <h4>{product.title}</h4>

              {/* 💰 السعر */}
              <p style={{ color: "#ff9900", fontWeight: "bold" }}>
                ${product.price}
              </p>

              {/* ⭐ النجوم */}
              <div style={{ marginBottom: "10px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        i < Math.round(product.rating?.rate || 4)
                          ? "#ff9900"
                          : "#ccc",
                      fontSize: "14px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    dispatch(addToCart({ ...product, id: productId }));
                    Swal.fire({
                      title: "Added to cart 🛒",
                      icon: "success",
                      timer: 1000,
                      showConfirmButton: false,
                    });
                  }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "linear-gradient(45deg,#ffb347,#ff9900)",
                    color: "#000",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Add
                </button>

                <button
                  onClick={() => navigate(`/products/${productId}`)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#232f3e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔢 Pagination */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {Array.from({
          length: Math.ceil(filteredProducts.length / itemsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background:
                currentPage === i + 1 ? "#ff9900" : "#ddd",
              color: currentPage === i + 1 ? "#fff" : "#000",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Products;