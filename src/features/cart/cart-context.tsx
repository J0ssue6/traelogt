import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { clearStoredCart, getStoredCart, saveCart } from "./cart-storage";

import type { CartItem } from "./types";

type AddToCartInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddToCartInput) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getStoredCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = (item: AddToCartInput) => {
    setItems((current) => {
      const existing = current.find(
        (cartItem) => cartItem.variantId === item.variantId,
      );

      if (!existing) {
        return [
          ...current,
          {
            ...item,
            quantity: Math.min(item.quantity ?? 1, item.stock),
          },
        ];
      }

      return current.map((cartItem) => {
        if (cartItem.variantId !== item.variantId) {
          return cartItem;
        }

        return {
          ...cartItem,
          quantity: Math.min(
            cartItem.quantity + (item.quantity ?? 1),
            cartItem.stock,
          ),
          stock: item.stock,
          price: item.price,
        };
      });
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity: Math.min(Math.max(quantity, 1), item.stock),
            }
          : item,
      ),
    );
  };

  const removeItem = (variantId: string) => {
    setItems((current) =>
      current.filter((item) => item.variantId !== variantId),
    );
  };

  const clearCart = () => {
    setItems([]);
    clearStoredCart();
  };

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
}
