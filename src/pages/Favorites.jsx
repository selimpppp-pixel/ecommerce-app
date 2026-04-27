import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../redux/slices/favoritesSlice";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";

function Favorites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div style={{ marginTop: "70px", padding: "20px" }}>
      
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          background: "#ff9900",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        ← Back
      </button>

      <h2>❤️ Favorites</h2>

      {/* ❌ لو فاضية */}
      {favorites.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No favorite products yet 😢</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {favorites.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "12px",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {/* ❤️ REMOVE */}
              <div
                onClick={() => {
                  dispatch(toggleFavorite(product));

                  Swal.fire({
                    title: "Removed from favorites 💔",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                  });
                }}
                style={{
                  alignSelf: "flex-end",
                  cursor: "pointer",
                }}
              >
                <FaHeart color="red" />
              </div>

              {/* 🖼️ IMAGE */}
              <img
                src={product.image}
                onClick={() => navigate(`/products/${product.id}`)}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />

              {/* 📌 TITLE */}
              <h4 style={{ fontSize: "14px", margin: "8px 0" }}>
                {product.title}
              </h4>

              {/* 💰 PRICE */}
              <p style={{ color: "#ff9900", fontWeight: "bold" }}>
                ${product.price}
              </p>

              {/* ⭐ STARS */}
              <div style={{ marginBottom: "8px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        i < Math.round(product.rating?.rate || 4)
                          ? "#ff9900"
                          : "#ccc",
                      fontSize: "13px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* 🔘 VIEW */}
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                style={{
                  padding: "6px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#232f3e",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;