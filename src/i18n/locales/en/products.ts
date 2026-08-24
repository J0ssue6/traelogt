const products = {
  title: {
    shop: "Shop",
    all: "All products",
    featured: "Featured products",
    category: "Shop by category",
  },

  description: {
    all: "Browse everything currently available on Traelogt.",
    category: "Browse products in the {{category}} category.",
    featured: "Explore what's available on Traelogt.",
  },

  search: {
    placeholder: "Search products...",
    label: "Search products",
    mobileLabel: "Search products",
    mobilePlaceholder: "What are you looking for?",
  },

  results: {
    product: "{{count}} product",
    product_plural: "{{count}} products",
    noProducts: "No products found",
    noProductsDescription: "Try a different search or browse all products.",
  },

  product: {
    options: "Options",
    available: "{{count}} available",
    outOfStock: "Out of stock",
    addToCart: "Add to cart",
    addedToCart: "Added to cart",
    productNotFound: "Product not found",
    unableToLoad: "Unable to load product",
    unavailable: "This product may no longer be available.",
  },
} as const;

export default products;
