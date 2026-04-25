import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

// 🔥 استدعاء SweetAlert
import Swal from "sweetalert2";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state لتخزين المنتجات
  const [products, setProducts] = useState([]);

  // state لتخزين الكاتيجوري
  const [categories, setCategories] = useState([]);

  // الكاتيجوري المختارة
  const [selectedCategory, setSelectedCategory] = useState(null);

  // اظهار او اخفاء dropdown
  const [showCategories, setShowCategories] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // قيمة البحث من redux
  const search = useSelector((state) => state.search.query);

  // جلب المنتجات من API
  useEffect(() => {
    const getProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data.products || res.data);
    };
    getProducts();
  }, []);

  // جلب الكاتيجوري
  useEffect(() => {
    const getCategories = async () => {
      const res = await API.get("/products/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

  // اختيار كاتيجوري
  const handleCategoryClick = async (cat) => {
    setSelectedCategory(cat);

    const res = await API.get(`/products/category/${cat}`);
    setProducts(res.data.products || res.data || []);

    setShowCategories(false);
    setCurrentPage(1);
  };

  // فلترة المنتجات حسب البحث
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes((search || "").toLowerCase())
  );

  // pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div style={{ marginTop: "70px", padding: "20px" }}>
      <h2>Products</h2>

      {/* زرار الكاتيجوري */}
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

        {/* قائمة الكاتيجوري */}
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
                style={{ padding: "10px", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "#fff")
                }
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* عرض المنتجات */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {currentProducts.map((product) => (
          <div
            key={product.id || product._id}
            style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "15px",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* صورة المنتج */}
            <img
              src={product.image}
              onClick={() =>
                navigate(`/products/${product.id || product._id}`)
              }
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />

            {/* اسم المنتج */}
            <h4
              onClick={() =>
                navigate(`/products/${product.id || product._id}`)
              }
              style={{ cursor: "pointer", margin: "10px 0" }}
            >
              {product.title}
            </h4>

            {/* السعر */}
            <p style={{ color: "green", fontWeight: "bold" }}>
              {product.price} $
            </p>

            {/* الأزرار */}
            <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
              
              {/* 🛒 زرار إضافة للكارت */}
              <button
                onClick={() => {
                  // إضافة للكارت
                  dispatch(
                    addToCart({
                      ...product,
                      id: product.id || product._id,
                    })
                  );

                  // 🔥 Sweet Alert
                  Swal.fire({
                    title: "Added to cart 🛒",
                    text: `${product.title}`,
                    icon: "success",
                    timer: 1200,
                    showConfirmButton: false,
                  });
                }}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: "#ff9900",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>

              {/* زرار تفاصيل */}
              <button
                onClick={() =>
                  navigate(`/products/${product.id || product._id}`)
                }
                style={{
                  flex: 1,
                  padding: "8px",
                  background: "#333",
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
        ))}
      </div>

      {/* pagination */}
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