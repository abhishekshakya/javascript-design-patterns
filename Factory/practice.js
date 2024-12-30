class PaymentGateway {
  gateWay = "";
  startPayment() {
    console.log("Payment started", this.gateWay);
  }

  showPaymentUI() {
    console.log("payment UI shown", this.gateWay);
  }
}

class PaypalProcessor extends PaymentGateway {
  constructor() {
    super();
    this.gateWay = "paypal";
    console.log("paypal instanciated");
  }
}

class StripeProcessor extends PaymentGateway {
  constructor() {
    super();
    this.gateWay = "stripe";
    console.log("stripe instanciated");
  }
}

class RazorPayProcessor extends PaymentGateway {
  constructor() {
    super();
    this.gateWay = "razorPay";
    console.log("razorPay instanciated");
  }
}

class PaymentProcessor {
  static createPaymentGateway(type) {
    switch (type) {
      case "paypal":
        return new PaypalProcessor();
      case "stripe":
        return new StripeProcessor();
      case "razorPay":
        return new RazorPayProcessor();
    }
  }
}

const payPal = PaymentProcessor.createPaymentGateway("paypal");
payPal.startPayment();

const stripe = PaymentProcessor.createPaymentGateway("stripe");
stripe.startPayment();

const razor = PaymentProcessor.createPaymentGateway("razorPay");
razor.startPayment();
