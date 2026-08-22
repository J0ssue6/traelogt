export type CartItem = {
  variantId: string;
  productSlug: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  sku: string | null;
  stock: number;
};
