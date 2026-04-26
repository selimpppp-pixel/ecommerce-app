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

  //  DARK MODE
  const {darkMode} = useTheme();

  // 🔄 المنتجات
  useEffect(() => {
    const getProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data.products || res.data);
    };
    getProducts();
  }, []);

  // 🔄 الكاتيجوري
  useEffect(() => {
    const getCategories = async () => {
      const res = await API.get("/products/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

  // 🎯 اختيار كاتيجوري
  const handleCategoryClick = async (cat) => {
    setSelectedCategory(cat);

    const res = await API.get(`/products/category/${cat}`);
    setProducts(res.data.products || res.data || []);

    setShowCategories(false);
    setCurrentPage(1);
  };

  // 🔍 فلترة
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
        padding: "20px",
        background: darkMode ? "#111" : "#f5f5f5",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <h2 style={{ color: darkMode ? "#fff" : "#000" }}>Products</h2>

      {/* Categories */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <button
          onClick={() => setShowCategories(!showCategories)}
          style={{
            padding: "10px 15px",
            background: "#ff9900",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Browse Categories
        </button>

        {showCategories && (
          <>
            {/* overlay */}
            <div
              onClick={() => setShowCategories(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 999,
              }}
            />

            {/* sidebar */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "250px",
                height: "100%",
                background: darkMode ? "#222" : "#fff",
                color: darkMode ? "#fff" : "#000",
                padding: "20px",
                zIndex: 1000,
                boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
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
                  onMouseEnter={(e) =>
                    (e.target.style.background = darkMode ? "#333" : "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  {cat}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* المنتجات */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {currentProducts.map((product) => {
          const productId = product.id || product._id;
          const isFav = favorites.find((p) => p.id === productId);

          return (
            <div
              key={productId}
              style={{
                borderRadius: "12px",
                padding: "15px",
                background: darkMode ? "#1e1e1e" : "#fff",
                border: darkMode ? "1px solid #333" : "1px solid #eee",
                color: darkMode ? "#fff" : "#000",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* ❤️ صورة + قلب */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <div
                  onClick={() =>
                    dispatch(
                      toggleFavorite({
                        ...product,
                        id: productId,
                      })
                    )
                  }
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    zIndex: 2,
                    background: darkMode ? "#333" : "#fff",
                    borderRadius: "50%",
                    padding: "5px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  {isFav ? (
                    <FaHeart size={16} color="red" />
                  ) : (
                    <FaRegHeart size={16} color="#999" />
                  )}
                </div>

                <img
                  src={product.image}
                  onClick={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                    setTimeout(() => {
                      navigate(`/products/${productId}`);
                    }, 200);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    transition: "0.3s",
                  }}
                />
              </div>

              <h4>{product.title}</h4>
              <p style={{ color: "#4caf50" }}>{product.price} $</p>

              {/* أزرار */}
              <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        ...product,
                        id: productId,
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
                    flex: 1,
                    padding: "8px",
                    background: darkMode ? "#ff8800" : "#ff9900",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  Add
                </button>

                <button
                  onClick={() => navigate(`/products/${productId}`)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: darkMode ? "#555" : "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;