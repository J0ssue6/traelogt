const productDetail = {
  navigation: {
    back: "Volver",
    backToShop: "Volver a la tienda",
  },

  states: {
    loading: "Cargando producto...",
    unableToLoad: "No se pudo cargar el producto",
    tryAgainMessage: "Inténtalo de nuevo en unos momentos.",
    productNotFound: "Producto no encontrado",
    productUnavailable: "Es posible que este producto ya no esté disponible.",
  },

  product: {
    noImage: "No hay imagen disponible",
    options: "Opciones",
    available: "{{count}} disponibles",
    outOfStock: "Agotado",
  },

  cart: {
    addToCart: "Añadir al carrito",
    added: "Añadido al carrito",
    viewCart: "Ver carrito",
  },

  quantity: {
    label: "Cantidad",
    decrease: "Disminuir cantidad",
    increase: "Aumentar cantidad",
  },
};

export default productDetail;
