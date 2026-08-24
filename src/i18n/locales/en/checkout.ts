const checkout = {
  header: {
    eyebrow: "Checkout",
    title: "Complete your order",
  },

  emptyCart: {
    title: "Your cart is empty",
    description: "Add some products before checking out.",
    action: "Continue shopping",
  },

  customer: {
    title: "Customer information",
    description: "Tell us where to send your order.",

    fields: {
      fullName: "Full name",
      phone: "Phone",
      email: "Email",
      department: "Department",
      municipality: "Municipality",
      address: "Delivery address",
      notes: "Order notes",
    },
  },

  order: {
    placing: "Placing order...",
    place: "Place order",
    summary: "Order summary",
    total: "Total",
  },

  errors: {
    unableToPlace: "Unable to place your order. Please try again.",
  },
};

export default checkout;
