import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common";
import enNavigation from "./locales/en/navigation";
import enProducts from "./locales/en/products";
import enCart from "./locales/en/cart";
import enCategories from "./locales/en/categories";
import enHome from "./locales/en/home";
import esStorefront from "./locales/es/storefront";

import esCommon from "./locales/es/common";
import esNavigation from "./locales/es/navigation";
import esProducts from "./locales/es/products";
import esCart from "./locales/es/cart";
import esCategories from "./locales/es/categories";
import esHome from "./locales/es/home";
import enStorefront from "./locales/en/storefront";
import enProductDetail from "./locales/en/productDetail";
import esProductDetail from "./locales/es/productDetail";

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
