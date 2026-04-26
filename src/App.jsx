import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Success from "./pages/Success.jsx";
import Favorites from "./pages/Favorites.jsx"; // ✅ مهم جدًا

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* 🔵 Navbar */}
      <Navbar />

      <Routes>
        {/* 🏠 Home */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Login />
            </>
          }
        />

        {/* 📝 Register */}
        <Route path="/register" element={<Register />} />

        {/* 🛍️ Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* 📄 Product Details */}
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* ❤️ Favorites */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* 🛒 Cart */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ✅ Success */}
        <Route path="/success" element={<Success />} />
      </Routes>

      {/* 🔻 Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;