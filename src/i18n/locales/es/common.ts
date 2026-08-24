const common = {
  actions: {
    back: "Volver",
    clear: "Limpiar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    close: "Cerrar",
    continue: "Continuar",
    tryAgain: "Intentar de nuevo",
    viewAll: "Ver todo",
    viewAllProducts: "Ver todos los productos",
  },

  status: {
    loading: "Cargando...",
    success: "Éxito",
    error: "Algo salió mal",
  },

  pagination: {
    page: "Página {{current}} de {{total}}",
    previous: "Anterior",
    next: "Siguiente",
  },
} as const;

export default common;
