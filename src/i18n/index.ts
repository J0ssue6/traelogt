import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common";
import enNavigation from "./locales/en/navigation";
import enProducts from "./locales/en/products";
import enCart from "./locales/en/cart";
import enCategories from "./locales/en/categories";
import enHome from "./locales/en/home";
import enStorefront from "./locales/en/storefront";
import enProductDetail from "./locales/en/productDetail";
import enCheckout from "./locales/en/checkout";
import enNotFound from "./locales/en/notFound";
import enOrderConfirmation from "./locales/en/orderConfirmation";

import esCommon from "./locales/es/common";
import esNavigation from "./locales/es/navigation";
import esProducts from "./locales/es/products";
import esCart from "./locales/es/cart";
import esCategories from "./locales/es/categories";
import esHome from "./locales/es/home";
import esStorefront from "./locales/es/storefront";
import esProductDetail from "./locales/es/productDetail";
import esCheckout from "./locales/es/checkout";
import esNotFound from "./locales/es/notFound";
import esOrderConfirmation from "./locales/es/orderConfirmation";

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    products: enProducts,
    cart: enCart,
    categories: enCategories,
    home: enHome,
    storefront: enStorefront,
    productDetail: enProductDetail,
    checkout: enCheckout,
    notFound: enNotFound,
    orderConfirmation: enOrderConfirmation,
  },

  es: {
    common: esCommon,
    navigation: esNavigation,
    products: esProducts,
    cart: esCart,
    categories: esCategories,
    home: esHome,
    storefront: esStorefront,
    productDetail: esProductDetail,
    checkout: esCheckout,
    notFound: esNotFound,
    orderConfirmation: esOrderConfirmation,
  },
};

i18n.use(initReactI18next).init({
  resources,

  lng: "es",
  fallbackLng: "es",

  ns: ["common", "navigation", "products", "cart", "categories"],

  defaultNS: "common",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
