const orderConfirmation = {
  header: {
    eyebrow: "Pedido recibido",
    title: "¡Gracias por tu pedido!",
    description:
      "Tu pedido ha sido creado. Completa la transferencia bancaria utilizando la información a continuación para continuar con el procesamiento de tu pedido.",
  },

  orderNumber: "Número de pedido",

  loading: "Cargando instrucciones de pago...",

  bankTransfer: {
    title: "Instrucciones para transferencia bancaria",
    amount: "Monto a transferir",
    bank: "Banco",
    accountHolder: "Titular de la cuenta",
    accountType: "Tipo de cuenta",
    defaultAccountType: "Cuenta bancaria",
    accountNumber: "Número de cuenta",
    copyAccountNumber: "Copiar número de cuenta",
    accountCopied: "Número de cuenta copiado.",
    importantInstructions: "Instrucciones importantes",
    important: "Importante",
    importantDescription:
      "Transfiere el monto exacto indicado anteriormente y conserva tu comprobante de pago. Después de realizar la transferencia, sube tu comprobante a continuación.",
  },

  receipt: {
    title: "Enviar comprobante de pago",
    submittedTitle: "Comprobante enviado",
    successTitle: "Tu comprobante ha sido enviado correctamente.",
    successDescription:
      "Verificaremos tu transferencia y actualizaremos tu pedido una vez que el pago haya sido confirmado.",
    paymentStatus: "Estado del pago:",
    statusSubmitted: "Comprobante enviado",
    fileLabel: "Comprobante de pago",
    fileHelp: "JPG, PNG o PDF. Tamaño máximo: 10 MB.",
    selectedFile: "Archivo seleccionado",
    uploading: "Subiendo comprobante...",
    submit: "Enviar comprobante de pago",

    errors: {
      invalidFile: "Sube un archivo JPG, PNG o PDF.",
      fileTooLarge: "El comprobante debe tener un tamaño máximo de 10 MB.",
      uploadFailed: "No se pudo subir el comprobante.",
      submitFailed: "No se pudo enviar el comprobante de pago.",
    },
  },

  unavailable: {
    title: "Las instrucciones de pago no están disponibles temporalmente.",
    description:
      "Contáctanos con tu número de pedido antes de realizar el pago.",
  },

  actions: {
    continueShopping: "Seguir comprando",
  },
};

export default orderConfirmation;
