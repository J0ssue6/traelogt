import type { CartItem } from "./types";

const CART_STORAGE_KEY = "traelogt-cart";

export function getStoredCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartItem =>
        item &&
        typeof item === "object" &&
        typeof item.variantId === "string" &&
        typeof item.productSlug === "string" &&
        typeof item.productName === "string" &&
        typeof item.variantName === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number" &&
        typeof item.stock === "number",
    );
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearStoredCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
}
