import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  // 🟢 الكاتيجوري
  const [categories, setCategories] = useState([]);

  // 🟢 الكاتيجوري المختارة
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🟢 Dropdown
  const [showCategories, setShowCategories] = useState(false);

  // 🟢 🆕 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const search = useSelector((state) => state.search.query);

  // 📦 جلب المنتجات
  useEffect(() => {
    const getProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data.products || res.data);
    };

    getProducts();
  }, []);

  // 📂 جلب الكاتيجوري
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
    setProducts(res.data.products || res .data || [] );

    setShowCategories(false);
    setCurrentPage(1); // 🔥 يرجع لأول صفحة
  };

  // 🔍 فلترة السيرش
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes((search || "").toLowerCase())
  );

  // 🟢 🆕 حساب المنتجات في الصفحة
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div style={{ marginTop: "70px", padding: "20px" }}>
      <h2>Products</h2>

      {/* 🔽 Dropdown Categories */}
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
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: 0,
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "8px",
              width: "200px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              zIndex: 100,
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f1f1",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
                onMouseLeave={(e) => (e.target.style.background = "#fff")}
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📦 المنتجات */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {/* 🔥 استخدمنا currentProducts بدل filteredProducts */}
        {currentProducts.map((product) => (
          <div
            key={product.id || product._id}
            style={{
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <img
              src={product.image}
              onClick={() => navigate(`/products/${product.id || product._id}`)}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />

            <h4
              onClick={() => navigate(`/products/${product.id || product._id}`)}
              style={{ cursor: "pointer" }}
            >
              {product.title}
            </h4>

            <p style={{ color: "green" }}>{product.price} $</p>

            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    ...product,
                    id: product.id || product._id,
                  })
                );
              }}
              style={{
                marginTop: "auto",
                padding: "8px",
                background: "#ff9900",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>

      {/* 🔢 Pagination Buttons */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {[...Array(Math.ceil(filteredProducts.length / itemsPerPage))].map(
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: "5px",
                padding: "6px 12px",
                background: currentPage === i + 1 ? "orange" : "#eee",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Products;