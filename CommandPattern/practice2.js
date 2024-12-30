class ICommand {
  execute() {}
  undo() {}
}

class Pizza {
  order() {
    console.log("Pizza ordered");
  }

  cancel() {
    console.log("Pizza order canceled");
  }
}

class Pasta {
  order() {
    console.log("Pasta ordered");
  }

  cancel() {
    console.log("Pasta order canceled");
  }
}

class Drink {
  order() {
    console.log("Drink ordered");
  }

  cancel() {
    console.log("Drink order canceled");
  }
}

class OrderPizzaCommand extends ICommand {
  constructor(pizza) {
    super();
    this.pizza = pizza;
  }

  execute() {
    this.pizza.order();
  }

  undo() {
    this.pizza.cancel();
  }
}
class OrderPastaCommand extends ICommand {
  constructor(pasta) {
    super();
    this.pasta = pasta;
  }

  execute() {
    this.pasta.order();
  }

  undo() {
    this.pasta.cancel();
  }
}
class OrderDrinkCommand extends ICommand {
  constructor(drink) {
    super();
    this.drink = drink;
  }

  execute() {
    this.drink.order();
  }

  undo() {
    this.drink.cancel();
  }
}
class ComboMealCommand extends ICommand {
  constructor(commands) {
    super();
    this.commands = commands;
  }

  execute() {
    console.log("Ordering Combo Meal");
    this.commands.forEach((cmd) => cmd.execute());
  }

  undo() {
    console.log("Canceling Combo Meal");
    this.commands.forEach((cmd) => cmd.undo());
  }
}

//Invoker
class Waiter {
  constructor() {
    this.orderHistory = [];
    this.redoStack = [];
  }

  takeOrder(command) {
    this.redoStack = [];
    this.orderHistory.push(command);
    command.execute();
  }

  cancelLastOrder() {
    const lastOrderCmd = this.orderHistory.pop();
    this.redoStack.push(lastOrderCmd);
    lastOrderCmd.undo();
  }

  reOrderLastOrder() {
    const lastCanceledOrderCmd = this.redoStack.pop();
    this.orderHistory.push(lastCanceledOrderCmd);
    lastCanceledOrderCmd.execute();
  }
}

const pizza = new Pizza();
const pasta = new Pasta();
const drink = new Drink();

const waiter = new Waiter();

const pizzaOrderCmd = new OrderPizzaCommand(pizza);
const pastaOrderCmd = new OrderPastaCommand(pasta);
const drinkOrderCmd = new OrderDrinkCommand(drink);
const comboOrderCmd = new ComboMealCommand([pizzaOrderCmd, pastaOrderCmd]);

waiter.takeOrder(pizzaOrderCmd);
waiter.takeOrder(pastaOrderCmd);
waiter.takeOrder(drinkOrderCmd);
waiter.cancelLastOrder();
waiter.reOrderLastOrder();
waiter.takeOrder(comboOrderCmd);
waiter.cancelLastOrder();
