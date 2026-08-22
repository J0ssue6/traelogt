import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import StoreHeader from "@/features/storefront/components/StoreHeader";
import { useStorefrontProduct } from "@/features/storefront/hooks/useStorefrontProduct";
import { useCart } from "@/features/cart/cart-context";
import { toast } from "sonner";

function ProductDetail() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  const product = useStorefrontProduct(slug);
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (product.isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <StoreHeader />

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />

          <div className="space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (product.isError) {
    return (
      <main className="min-h-screen bg-background">
        <StoreHeader />

        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-2xl font-bold">Unable to load product</h1>

          <p className="mt-2 text-muted-foreground">
            Please try again shortly.
          </p>

          <Button
            variant="outline"
            className="mt-6"
            onClick={() => product.refetch()}
          >
            Try again
          </Button>
        </div>
      </main>
    );
  }

  if (!product.data) {
    return (
      <main className="min-h-screen bg-background">
        <StoreHeader />

        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>

          <p className="mt-2 text-muted-foreground">
            This product may no longer be available.
          </p>

          <Button
            variant="outline"
            className="mt-6"
            onClick={() => navigate("/products")}
          >
            Back to shop
          </Button>
        </div>
      </main>
    );
  }

  const currentProduct = product.data;
  const images = currentProduct.images;
  const variants = currentProduct.variants;
  const variant = variants[selectedVariant];

  const maxQuantity = variant?.stock ?? 0;
  const price = variant?.price ?? null;

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.min(Math.max(value, 1), maxQuantity));
  };

  const handleAddToCart = () => {
    if (!variant || variant.stock <= 0) return;

    addItem({
      variantId: variant.id,
      productSlug: currentProduct.slug,
      productName: currentProduct.name,
      variantName: variant.name,
      price: variant.price,
      quantity,
      imageUrl: images[0]?.url ?? null,
      sku: variant.sku,
      stock: variant.stock,
    });

    toast.success("Added to cart", {
      description: `${quantity} × ${currentProduct.name}${
        variant.name ? ` — ${variant.name}` : ""
      }`,
      action: {
        label: "View cart",
        onClick: () => navigate("/cart"),
      },
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <StoreHeader />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Button
          variant="ghost"
          className="mb-8 -ml-3 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Back
        </Button>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl bg-muted">
              <div className="aspect-square">
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].url}
                    alt={images[selectedImage].alt_text ?? currentProduct.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-lg border-2 ${
                      selectedImage === index
                        ? "border-accent"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt_text ?? currentProduct.name}
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {currentProduct.category && (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {currentProduct.category.name}
              </p>
            )}

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {currentProduct.name}
            </h1>

            {price !== null && (
              <p className="mt-5 text-2xl font-semibold">${price.toFixed(2)}</p>
            )}

            {currentProduct.description && (
              <p className="mt-6 leading-7 text-muted-foreground">
                {currentProduct.description}
              </p>
            )}

            {variants.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold">Options</p>

                <div className="flex flex-wrap gap-2">
                  {variants.map((item, index) => (
                    <Button
                      key={item.id}
                      type="button"
                      variant={
                        selectedVariant === index ? "default" : "outline"
                      }
                      onClick={() => {
                        setSelectedVariant(index);
                        setQuantity(1);
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {variant && (
              <div className="mt-8">
                <p className="text-sm text-muted-foreground">
                  {variant.stock > 0
                    ? `${variant.stock} available`
                    : "Out of stock"}
                </p>

                {variant.stock > 0 && (
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={quantity <= 1}
                        onClick={() => handleQuantityChange(quantity - 1)}
                      >
                        <Minus />
                      </Button>

                      <span className="w-10 text-center text-sm font-medium">
                        {quantity}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={quantity >= maxQuantity}
                        onClick={() => handleQuantityChange(quantity + 1)}
                      >
                        <Plus />
                      </Button>
                    </div>

                    <Button
                      className="flex-1 gap-2"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      <ShoppingBag />
                      Add to cart
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
