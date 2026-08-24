import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/features/cart/cart-context";

function Cart() {
  const navigate = useNavigate();
  const { t } = useTranslation("cart");

  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {t("header.eyebrow")}
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("header.title")}
        </h1>

        {items.length > 0 && (
          <p className="mt-2 text-muted-foreground">
            {t("header.itemCount", { count: itemCount })}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border bg-card px-6 py-20 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />

          <h2 className="mt-5 text-xl font-semibold">{t("empty.title")}</h2>

          <p className="mt-2 text-muted-foreground">{t("empty.description")}</p>

          <Button className="mt-6" onClick={() => navigate("/products")}>
            {t("empty.action")}
          </Button>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border bg-card">
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 p-5 sm:p-6">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        {t("item.noImage")}
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          to={`/products/${item.productSlug}`}
                          className="font-semibold hover:text-accent"
                        >
                          {item.productName}
                        </Link>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.variantName}
                        </p>

                        {item.sku && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t("item.sku", { sku: item.sku })}
                          </p>
                        )}
                      </div>

                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center rounded-lg border">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          aria-label={t("quantity.decrease")}
                        >
                          <Minus />
                        </Button>

                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={item.quantity >= item.stock}
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          aria-label={t("quantity.increase")}
                        >
                          <Plus />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.variantId)}
                      >
                        <Trash2 />
                        {t("item.remove")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-2xl border bg-card p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold">{t("summary.title")}</h2>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("summary.subtotal")}
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("summary.shipping")}
                </span>
                <span>{t("summary.shippingCalculated")}</span>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex justify-between text-lg font-semibold">
              <span>{t("summary.total")}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={() => navigate("/checkout")}
            >
              {t("summary.checkout")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
