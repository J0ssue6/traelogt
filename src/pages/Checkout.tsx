import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StoreHeader from "@/features/storefront/components/StoreHeader";
import { useCart } from "@/features/cart/cart-context";
import {
  createCustomerOrder,
  type CheckoutCustomer,
} from "@/features/checkout/api/checkout.api";

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

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
      const result = await createCustomerOrder(form, items);

      clearCart();

      navigate(`/order-confirmation/${result.order_number}`, {
        state: {
          orderNumber: result.order_number,
          receiptUploadToken: result.receipt_upload_token,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to place your order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>

          <p className="mt-2 text-muted-foreground">
            Add some products before checking out.
          </p>

          <Button className="mt-6" onClick={() => navigate("/products")}>
            Continue shopping
          </Button>
        </div>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <StoreHeader />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Complete your order
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border bg-card p-6"
          >
            <div>
              <h2 className="text-lg font-semibold">Customer information</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us where to send your order.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerName">Full name</Label>
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
                <Label htmlFor="customerPhone">Phone</Label>
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
                <Label htmlFor="customerEmail">Email</Label>
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

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
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
                <Label htmlFor="municipality">Municipality</Label>
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
              <Label htmlFor="address">Delivery address</Label>
              <Textarea
                id="address"
                required
                rows={3}
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Order notes</Label>
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
              {isSubmitting ? "Placing order..." : "Place order"}
            </Button>
          </form>

          <aside className="h-fit rounded-2xl border bg-card p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold">Order summary</h2>

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
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-5">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
