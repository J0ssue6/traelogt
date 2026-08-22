import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import NotFound from "@/pages/NotFound";

import Dashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import ProductVariants from "@/pages/admin/ProductVariants";
import Categories from "@/pages/admin/Categories";
import Orders from "@/pages/admin/Orders";

import AdminLayout from "@/components/admin/AdminLayout";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

import { CartProvider } from "./features/cart/cart-context";
import { AuthProvider } from "@/features/auth/auth-context";
import AdminLogin from "./features/auth/AdminLogin";
import ProtectedAdminRoute from "./features/auth/ProtectedAdminRoute";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* PUBLIC STOREFRONT */}

            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />

            <Route path="/products/:slug" element={<ProductDetail />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/order-confirmation/:orderNumber"
              element={<OrderConfirmation />}
            />

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

                <Route path="categories" element={<Categories />} />

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
