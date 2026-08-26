import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/features/cart/cart-context";
import {
  createCustomerOrder,
  type CheckoutCustomer,
  type DeliveryMethod,
} from "@/features/checkout/api/checkout.api";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/guatemala";

const SHIPPING_COSTS: Record<DeliveryMethod, number> = {
  delivery: 50,
  "los-amates-pickup": 25,
  "mariscos-pickup": 0,
};

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { t } = useTranslation("checkout");

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");

  const [form, setForm] = useState<CheckoutCustomer>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    department: "",
    municipality: "",
    address: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shippingCost = SHIPPING_COSTS[deliveryMethod];
  const total = subtotal + shippingCost;

  const updateField = (field: keyof CheckoutCustomer, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result = await createCustomerOrder(
        form,
        items,
        deliveryMethod,
        shippingCost,
      );

      clearCart();

      navigate(`/order-confirmation/${result.order_number}`, {
        state: {
          orderNumber: result.order_number,
          receiptUploadToken: result.receipt_upload_token,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.unableToPlace"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">{t("emptyCart.title")}</h1>

        <p className="mt-2 text-muted-foreground">
          {t("emptyCart.description")}
        </p>

        <Button className="mt-6" onClick={() => navigate("/products")}>
          {t("emptyCart.action")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {t("header.eyebrow")}
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("header.title")}
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-card p-6"
        >
          <div>
            <h2 className="text-lg font-semibold">{t("customer.title")}</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {t("customer.description")}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName">
              {t("customer.fields.fullName")}
            </Label>

            <Input
              id="customerName"
              required
              value={form.customerName}
              onChange={(event) =>
                updateField("customerName", event.target.value)
              }
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerPhone">
                {t("customer.fields.phone")}
              </Label>

              <Input
                id="customerPhone"
                required
                value={form.customerPhone}
                onChange={(event) =>
                  updateField("customerPhone", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail">
                {t("customer.fields.email")}
              </Label>

              <Input
                id="customerEmail"
                type="email"
                value={form.customerEmail}
                onChange={(event) =>
                  updateField("customerEmail", event.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label>Delivery method</Label>

              <p className="mt-1 text-sm text-muted-foreground">
                Choose how you would like to receive your order.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                  className="mt-1"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">Home delivery</span>
                    <span className="font-semibold">
                      {formatCurrency(SHIPPING_COSTS.delivery)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Delivered to your address anywhere in Guatemala.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="los-amates-pickup"
                  checked={deliveryMethod === "los-amates-pickup"}
                  onChange={() => setDeliveryMethod("los-amates-pickup")}
                  className="mt-1"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">Pickup in Los Amates</span>
                    <span className="font-semibold">
                      {formatCurrency(SHIPPING_COSTS["los-amates-pickup"])}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Pick up your order at our Los Amates pickup point.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="mariscos-pickup"
                  checked={deliveryMethod === "mariscos-pickup"}
                  onChange={() => setDeliveryMethod("mariscos-pickup")}
                  className="mt-1"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      Pickup at Farmacia Daly, Mariscos
                    </span>

                    <span className="font-semibold">{formatCurrency(0)}</span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Pick up your order at Farmacia Daly in Mariscos.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {deliveryMethod === "delivery" && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">
                    {t("customer.fields.department")}
                  </Label>

                  <Input
                    id="department"
                    required
                    value={form.department}
                    onChange={(event) =>
                      updateField("department", event.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="municipality">
                    {t("customer.fields.municipality")}
                  </Label>

                  <Input
                    id="municipality"
                    required
                    value={form.municipality}
                    onChange={(event) =>
                      updateField("municipality", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("customer.fields.address")}</Label>

                <Textarea
                  id="address"
                  required
                  rows={3}
                  value={form.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                />
              </div>
            </>
          )}

          {deliveryMethod !== "delivery" && (
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm font-medium">Pickup location</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {deliveryMethod === "mariscos-pickup"
                  ? "Farmacia Daly, Mariscos"
                  : "Los Amates pickup point"}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                You will receive pickup instructions after placing your order.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">{t("customer.fields.notes")}</Label>

            <Textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("order.placing") : t("order.place")}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl border bg-card p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold">{t("order.summary")}</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium">{item.productName}</p>

                  <p className="text-muted-foreground">
                    {item.variantName} × {item.quantity}
                  </p>
                </div>

                <span className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t pt-5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>

              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>

              <span>
                {shippingCost === 0
                  ? formatCurrency(0)
                  : formatCurrency(shippingCost)}
              </span>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg font-semibold">
              <span>{t("order.total")}</span>

              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
