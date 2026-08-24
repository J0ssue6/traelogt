const products = {
  title: {
    shop: "Tienda",
    all: "Todos los productos",
    featured: "Productos destacados",
    category: "Comprar por categoría",
  },

  description: {
    all: "Explora todo lo que está disponible actualmente en Traelogt.",
    category: "Explora productos de la categoría {{category}}.",
    featured: "Descubre lo que está disponible en Traelogt.",
  },

  search: {
    placeholder: "Buscar productos...",
    label: "Buscar productos",
    mobileLabel: "Buscar productos",
    mobilePlaceholder: "¿Qué estás buscando?",
  },

  results: {
    product: "{{count}} producto",
    product_plural: "{{count}} productos",
    noProducts: "No se encontraron productos",
    noProductsDescription:
      "Prueba con otra búsqueda o explora todos los productos.",
  },

  product: {
    options: "Opciones",
    available: "{{count}} disponibles",
    outOfStock: "Agotado",
    addToCart: "Añadir al carrito",
    addedToCart: "Añadido al carrito",
    productNotFound: "Producto no encontrado",
    unableToLoad: "No se pudo cargar el producto",
    unavailable: "Este producto puede que ya no esté disponible.",
  },
} as const;

export default products;
