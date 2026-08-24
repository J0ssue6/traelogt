const checkout = {
  header: {
    eyebrow: "Finalizar compra",
    title: "Completa tu pedido",
  },

  emptyCart: {
    title: "Tu carrito está vacío",
    description: "Añade algunos productos antes de finalizar tu compra.",
    action: "Continuar comprando",
  },

  customer: {
    title: "Información del cliente",
    description: "Indícanos dónde debemos enviar tu pedido.",

    fields: {
      fullName: "Nombre completo",
      phone: "Teléfono",
      email: "Correo electrónico",
      department: "Departamento",
      municipality: "Municipio",
      address: "Dirección de entrega",
      notes: "Notas del pedido",
    },
  },

  order: {
    placing: "Realizando pedido...",
    place: "Realizar pedido",
    summary: "Resumen del pedido",
    total: "Total",
  },

  errors: {
    unableToPlace: "No se pudo realizar tu pedido. Inténtalo de nuevo.",
  },
};

export default checkout;
