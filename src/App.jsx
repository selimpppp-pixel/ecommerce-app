import { BrowserRouter, Routes, Route } from "react-router-dom";

// 📄 Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Success from "./pages/Success.jsx";
import Favorites from "./pages/Favorites.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx"; // ⚠️ خليها C كابيتال

// 🧩 Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* 🔵 Navbar */}
      <Navbar />
<main>
      <Routes>
        {/* 🏠 Home  */}
       <Route
  path="/"
  element={
    <>
      <Hero />
      <Login />
    </>
  }
/>
        <Route path="/register" element={<Register />} />

        {/* 🛍️ Products */}
        <Route
          path="/products"
          element={
           
              <Products />
        
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

        {/* ℹ️ About (مفتوحة) */}
        <Route path="/about" element={<About />} />

        {/* 📞 Contact (مفتوحة) */}
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Success */}
        <Route path="/success" element={<Success />} />
      </Routes>
      </main>

      {/* 🔻 Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;