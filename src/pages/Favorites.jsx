import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div style={{ marginTop: "70px", padding: "20px" }}>
      <h2>❤️ Favorites</h2>

      {/* ❌ لو فاضية */}
      {favorites.length === 0 ? (
        <p>No favorite products yet 😢</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {favorites.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "15px",
                background: "#fff",
              }}
            >
              <img
                src={product.image}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/products/${product.id}`)
                }
              />

              <h4>{product.title}</h4>
              <p style={{ color: "green" }}>
                {product.price} $
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;