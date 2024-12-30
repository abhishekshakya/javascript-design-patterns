class MiddlewareManager {
  middlewares = [];
  add(payload) {
    this.middlewares.push(payload);
  }

  remove(id) {
    this.middlewares.forEach((mw) => {
      if (mw.id === id) {
        this.middlewares = [
          ...this.middlewares.slice(0, id),
          ...this.middlewares.slice(id + 1, this.middlewares.length),
        ];
      }
    });
  }

  execute(payload) {
    const run = (idx) => {
      if (idx >= this.middlewares.length) return () => {};
      this.middlewares[idx].callback(payload, () => run(idx + 1));
    };
    run(0);
  }
}

const manager = new MiddlewareManager();
manager.add({
  id: "orderValidation",
  callback: (order, next) => {
    if (order.stock > 0) {
      console.log("validation done");
      next();
    } else {
      console.log("validation error");
    }
  },
});

manager.add({
  id: "updateInventory",
  callback: (order, next) => {
    order.stock = order.stock - order.quantity;
    console.log("inventory updated");
    next();
  },
});

manager.add({
  id: "paymentProcess",
  callback: (order, next) => {
    if (!order.paymentValid) {
      console.log("payment failed");
      return;
    }
    console.log("amount deducted from", order.user.paymentMethod);
    next();
  },
});

manager.add({
  id: "confirm",
  callback: (order, next) => {
    console.log("mail sent to", order.user.id);
    next();
  },
});

manager.add({
  id: "logging",
  callback: (order, next) => {
    console.log("final details");
    console.log(order);
    next();
  },
});

const order = {
  productId: "P123",
  quantity: 2,
  user: {
    id: "U456",
    paymentMethod: "credit_card",
  },
  stock: 5, // Current stock for the product
  paymentValid: true, // Whether payment details are valid
};

manager.execute(order);
