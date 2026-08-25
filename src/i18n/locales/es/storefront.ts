const storefront = {
  theme: {
    toggle: "Cambiar tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
  header: {
    navigation: {
      home: "Inicio",
      shop: "Tienda",
      categories: "Categorías",
      cart: "Carrito",
    },
    search: {
      label: "Buscar productos",
      placeholder: "Buscar productos...",
      mobilePlaceholder: "¿Qué estás buscando?",
      button: "Buscar",
    },
    language: {
      label: "Idioma",
    },
    accessibility: {
      openMenu: "Abrir menú de navegación",
      searchProducts: "Buscar productos",
      shoppingBag: "Bolsa de compras",
    },
  },
  mobileMore: {
    preferences: {
      appearance: "Apariencia",
    },
  },
  mobileFilters: {
    all: "Todo",
    new: "Novedades",
    popular: "Popular",
    featured: "Destacados",
    categories: "Categorías",
  },
  footer: {
    brand: {
      description:
        "Descubre productos cuidadosamente seleccionados para ti, todo en un solo lugar.",
      cta: "Explorar la tienda",
    },
    navigation: {
      shop: {
        title: "Tienda",
        allProducts: "Todos los productos",
        categories: "Categorías",
        featured: "Productos destacados",
      },
      explore: {
        title: "Explorar",
        home: "Inicio",
        categories: "Categorías",
        cart: "Tu carrito",
      },
      support: {
        title: "Ayuda",
        contact: "Contáctanos",
        faq: "Preguntas frecuentes",
        shipping: "Envíos y entregas",
      },
      connect: {
        title: "Conecta",
        email: "hello@traelogt.com",
        instagram: "Instagram",
        location: "Singapur",
      },
    },
    legal: {
      copyright: "© 2026 Traelogt. Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
      language: "Idioma",
    },
  },
  products: {
    title: "Todos los productos",
    titleWithCategory: "Comprar por categoría",
    categoryDescription: "Explora productos en la categoría {{category}}.",
    description: "Explora todo lo que está disponible en Traelogt.",
    searchPlaceholder: "Buscar productos...",
    clear: "Limpiar",
    loading: "Cargando productos...",
    productCount:
      "{{count}} {{count, plural, one {producto} other {productos}}}",
    error: {
      title: "No se pudieron cargar los productos",
      description: "Inténtalo de nuevo en breve.",
      retry: "Reintentar",
    },
    empty: {
      title: "No se encontraron productos",
      description: "Prueba con otra búsqueda o explora todos los productos.",
      viewAll: "Ver todos los productos",
    },
    pagination: {
      previous: "Anterior",
      next: "Siguiente",
      pageOf: "Página {{current}} de {{total}}",
    },
  },
  categories: {
    loading: "Cargando categorías...",
    error: "No se pueden cargar las categorías.",
    empty: "Las categorías estarán disponibles próximamente.",
  },
};

export default storefront;
