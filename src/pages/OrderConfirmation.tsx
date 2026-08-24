import {
  CheckCircle2,
  Copy,
  CreditCard,
  FileCheck2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { supabase } from "@/lib/supabase";

type PaymentSettings = {
  bank_name: string;
  account_holder: string;
  account_number: string;
  account_type: string | null;
  currency: string;
  instructions: string | null;
};

type OrderDetails = {
  id: string;
  order_number: string;
  total: number;
  status: string;
};

type OrderPayment = {
  status: string;
  receipt_upload_token: string | null;
  receipt_path: string | null;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

function OrderConfirmation() {
  const navigate = useNavigate();
  const { orderNumber = "" } = useParams();
  const location = useLocation();

  const confirmedOrderNumber =
    (location.state as { orderNumber?: string } | null)?.orderNumber ??
    orderNumber;

  const receiptUploadToken = (
    location.state as { receiptUploadToken?: string } | null
  )?.receiptUploadToken;

  const [paymentSettings, setPaymentSettings] =
    useState<PaymentSettings | null>(null);

  const [order, setOrder] = useState<OrderDetails | null>(null);

  const [payment, setPayment] = useState<OrderPayment | null>(null);

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function loadPaymentInformation() {
      if (!confirmedOrderNumber || !receiptUploadToken) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc(
        "get_customer_payment_details",
        {
          p_order_number: confirmedOrderNumber,
          p_receipt_upload_token: receiptUploadToken,
        },
      );

      if (error) {
        console.error("Unable to load payment information:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      setPaymentSettings({
        bank_name: data.bank_name,
        account_holder: data.account_holder,
        account_number: data.account_number,
        account_type: data.account_type,
        currency: data.currency,
        instructions: data.instructions,
      });

      setOrder({
        id: data.order_id,
        order_number: data.order_number,
        total: Number(data.total),
        status: data.order_status,
      });

      setPayment({
        status: data.payment_status,
        receipt_upload_token: data.receipt_upload_token,
        receipt_path: data.receipt_path,
      });

      setLoading(false);
    }

    loadPaymentInformation();
  }, [confirmedOrderNumber, receiptUploadToken]);

  const copyAccountNumber = async () => {
    if (!paymentSettings?.account_number) return;

    await navigator.clipboard.writeText(paymentSettings.account_number);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setUploadError(null);
    setSelectedFile(null);

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Please upload a JPG, PNG, or PDF file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError("The receipt must be 10 MB or smaller.");
      return;
    }

    setSelectedFile(file);
  };

  const handleReceiptUpload = async () => {
    if (!selectedFile || !order || !payment?.receipt_upload_token) {
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const fileExtension =
        selectedFile.name.split(".").pop()?.toLowerCase() ?? "file";

      const filePath = `${payment.receipt_upload_token}/${crypto.randomUUID()}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-receipts")
        .upload(filePath, selectedFile, {
          contentType: selectedFile.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message || "Unable to upload receipt.");
      }

      const { error: submitError } = await supabase.rpc(
        "submit_payment_receipt",
        {
          p_order_number: order.order_number,
          p_receipt_upload_token: payment.receipt_upload_token,
          p_receipt_path: filePath,
        },
      );

      if (submitError) {
        await supabase.storage.from("payment-receipts").remove([filePath]);

        throw new Error(
          submitError.message || "Unable to submit payment receipt.",
        );
      }

      setPayment({
        ...payment,
        status: "receipt_submitted",
        receipt_path: filePath,
      });

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Unable to submit payment receipt.",
      );
    } finally {
      setUploading(false);
    }
  };

  const receiptSubmitted = payment?.status === "receipt_submitted";

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 className="h-9 w-9 text-accent" />
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Order received
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Your order has been created. Please complete your bank transfer
            using the information below to continue processing your order.
          </p>

          {confirmedOrderNumber && (
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">Order number</p>

              <p className="mt-2 text-2xl font-bold">{confirmedOrderNumber}</p>
            </div>
          )}
        </div>

        {loading ? (
          <Card className="mt-8">
            <CardContent className="py-10 text-center text-muted-foreground">
              Loading payment instructions...
            </CardContent>
          </Card>
        ) : paymentSettings ? (
          <>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Bank transfer instructions
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="rounded-xl border bg-muted/30 p-5">
                  <p className="text-sm text-muted-foreground">
                    Amount to transfer
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {paymentSettings.currency}{" "}
                    {Number(order?.total ?? 0).toFixed(2)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bank</p>

                    <p className="font-semibold">{paymentSettings.bank_name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account holder
                    </p>

                    <p className="font-semibold">
                      {paymentSettings.account_holder}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account type
                    </p>

                    <p className="font-semibold capitalize">
                      {paymentSettings.account_type ?? "Bank account"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account number
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <p className="flex-1 rounded-lg border bg-muted px-4 py-3 font-mono text-lg font-semibold">
                        {paymentSettings.account_number}
                      </p>

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={copyAccountNumber}
                        title="Copy account number"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {copied && (
                      <p className="mt-2 text-sm text-accent">
                        Account number copied.
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {paymentSettings.instructions && (
                  <div>
                    <h2 className="font-semibold">Important instructions</h2>

                    <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">
                      {paymentSettings.instructions}
                    </p>
                  </div>
                )}

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
                  <p className="font-semibold">Important</p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Please transfer the exact amount shown above and keep your
                    payment receipt. After making the transfer, upload your
                    receipt below.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {receiptSubmitted ? (
                    <FileCheck2 className="h-5 w-5" />
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}

                  {receiptSubmitted
                    ? "Receipt submitted"
                    : "Submit your payment receipt"}
                </CardTitle>
              </CardHeader>

              <CardContent>
                {receiptSubmitted ? (
                  <div className="rounded-xl border bg-muted/30 p-5">
                    <p className="font-semibold">
                      Your receipt has been submitted successfully.
                    </p>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      We will verify your transfer and update your order once
                      the payment has been confirmed.
                    </p>

                    <p className="mt-4 text-sm font-medium">
                      Payment status:{" "}
                      <span className="text-accent">Receipt submitted</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="payment-receipt"
                        className="text-sm font-medium"
                      >
                        Payment receipt
                      </label>

                      <input
                        ref={fileInputRef}
                        id="payment-receipt"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                        onChange={handleFileChange}
                        className="mt-2 block w-full cursor-pointer rounded-lg border bg-background p-3 text-sm"
                      />

                      <p className="mt-2 text-xs text-muted-foreground">
                        JPG, PNG, or PDF. Maximum size: 10 MB.
                      </p>
                    </div>

                    {selectedFile && (
                      <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                        <p className="font-medium">Selected file</p>

                        <p className="mt-1 text-muted-foreground">
                          {selectedFile.name}
                        </p>
                      </div>
                    )}

                    {uploadError && (
                      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                        {uploadError}
                      </div>
                    )}

                    <Button
                      type="button"
                      size="lg"
                      className="w-full gap-2"
                      disabled={
                        !selectedFile ||
                        uploading ||
                        !payment?.receipt_upload_token
                      }
                      onClick={handleReceiptUpload}
                    >
                      <Upload className="h-4 w-4" />

                      {uploading
                        ? "Uploading receipt..."
                        : "Submit payment receipt"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="mt-8">
            <CardContent className="py-10 text-center">
              <h2 className="font-semibold">
                Payment instructions are temporarily unavailable.
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Please contact us with your order number before making a
                payment.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/products")}
          >
            Continue shopping
          </Button>
        </div>
      </div>
    </>
  );
}

export default OrderConfirmation;
