import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import NotFound from "@/pages/NotFound";

import Dashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import ProductVariants from "@/pages/admin/ProductVariants";
import AdminCategories from "@/pages/admin/Categories";
import Orders from "@/pages/admin/Orders";

import AdminLayout from "@/layouts/AdminLayout";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

import { CartProvider } from "./features/cart/cart-context";
import { AuthProvider } from "@/features/auth/auth-context";
import AdminLogin from "./features/auth/AdminLogin";
import ProtectedAdminRoute from "./features/auth/ProtectedAdminRoute";
import { Toaster } from "./components/ui/sonner";
import Categories from "./pages/Categories";
import StorefrontLayout from "./layouts/StorefrontLayout";
import ScrollToTop from "./components/ScrollTop";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* PUBLIC STOREFRONT */}
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-confirmation/:orderNumber"
                element={<OrderConfirmation />}
              />

              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* ADMIN LOGIN */}

            <Route path="/admin/login" element={<AdminLogin />} />

            {/* PROTECTED ADMIN */}

            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />

                <Route path="products" element={<AdminProducts />} />

                <Route
                  path="products/:productId/variants"
                  element={<ProductVariants />}
                />

                <Route path="categories" element={<AdminCategories />} />

                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
