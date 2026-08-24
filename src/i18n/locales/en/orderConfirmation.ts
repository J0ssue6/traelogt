const orderConfirmation = {
  header: {
    eyebrow: "Order received",
    title: "Thank you for your order!",
    description:
      "Your order has been created. Please complete your bank transfer using the information below to continue processing your order.",
  },

  orderNumber: "Order number",

  loading: "Loading payment instructions...",

  bankTransfer: {
    title: "Bank transfer instructions",
    amount: "Amount to transfer",
    bank: "Bank",
    accountHolder: "Account holder",
    accountType: "Account type",
    defaultAccountType: "Bank account",
    accountNumber: "Account number",
    copyAccountNumber: "Copy account number",
    accountCopied: "Account number copied.",
    importantInstructions: "Important instructions",
    important: "Important",
    importantDescription:
      "Please transfer the exact amount shown above and keep your payment receipt. After making the transfer, upload your receipt below.",
  },

  receipt: {
    title: "Submit your payment receipt",
    submittedTitle: "Receipt submitted",
    successTitle: "Your receipt has been submitted successfully.",
    successDescription:
      "We will verify your transfer and update your order once the payment has been confirmed.",
    paymentStatus: "Payment status:",
    statusSubmitted: "Receipt submitted",
    fileLabel: "Payment receipt",
    fileHelp: "JPG, PNG, or PDF. Maximum size: 10 MB.",
    selectedFile: "Selected file",
    uploading: "Uploading receipt...",
    submit: "Submit payment receipt",

    errors: {
      invalidFile: "Please upload a JPG, PNG, or PDF file.",
      fileTooLarge: "The receipt must be 10 MB or smaller.",
      uploadFailed: "Unable to upload receipt.",
      submitFailed: "Unable to submit payment receipt.",
    },
  },

  unavailable: {
    title: "Payment instructions are temporarily unavailable.",
    description:
      "Please contact us with your order number before making a payment.",
  },

  actions: {
    continueShopping: "Continue shopping",
  },
};

export default orderConfirmation;
