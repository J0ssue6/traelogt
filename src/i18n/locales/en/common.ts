const common = {
  actions: {
    back: "Back",
    clear: "Clear",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    continue: "Continue",
    tryAgain: "Try again",
    viewAll: "View all",
    viewAllProducts: "View all products",
  },

  status: {
    loading: "Loading...",
    success: "Success",
    error: "Something went wrong",
  },

  pagination: {
    page: "Page {{current}} of {{total}}",
    previous: "Previous",
    next: "Next",
  },
} as const;

export default common;
