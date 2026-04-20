import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Success from "./pages/Success.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
          />
          <Route 
          path="/success" element={<Success />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;