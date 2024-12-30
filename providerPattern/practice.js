class LoggerService {
  log(message) {
    console.log(`Logger: ${message}`);
  }
}

class PaymentGateway {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  process(amount, userId) {
    console.log(
      `processing ${amount} for user: ${userId} APIKEY: ${this.apiKey}`
    );
  }
}

class EmailService {
  constructor(config) {
    this.config = config;
  }

  sendMail(mailID, content) {
    console.log(
      `sending mail to:${mailID} content:${content} CONFIG: ${JSON.stringify(
        this.config
      )}`
    );
  }
}

class ServiceProvider {
  services = {};

  registerService(serviceName, instance) {
    this.services[serviceName] = instance;
  }

  getService(serviceName) {
    return this.services[serviceName];
  }
}

class Order {
  constructor(provider) {
    this.logger = provider.getService("log");
    this.paymentGateway = provider.getService("payment");
  }

  placeOrder(userId, amount) {
    this.logger.log(`placing order for user: ${userId} amount:${amount}`);
    this.paymentGateway.process(amount, userId);
  }
}

class User {
  constructor(provider) {
    this.emailService = provider.getService("mail");
  }

  sendWelcomeMail(mailId) {
    this.emailService.sendMail(mailId, "Welcome onboard!!!");
  }
}

const init = (serviceProvider) => {
  const logger = new LoggerService();
  const emailService = new EmailService({ type: "http" });
  const paymentService = new PaymentGateway("APIXYZ");

  serviceProvider.registerService("log", logger);
  serviceProvider.registerService("mail", emailService);
  serviceProvider.registerService("payment", paymentService);
};

const provider = new ServiceProvider();
init(provider);

const order = new Order(provider);
const user = new User(provider);

order.placeOrder("Abhishek", "$500");
user.sendWelcomeMail("abc@example.com");
