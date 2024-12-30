class BankAccount {
  authenticated = false;
  constructor(name, balance = 0) {
    this.name = name;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withDraw(amount) {
    this.balance -= amount;
  }

  authenticate() {
    this.authenticated = true;
  }
}

const bankHandler = {
  get(obj, prop) {
    if (!obj.authenticated && prop !== "authenticate") {
      console.log("Not authenticated");
      return;
    }
    return Reflect.get(obj, prop);
  },

  set(obj, prop, value) {
    console.log(
      `setting prop: ${prop} from ${Reflect.get(obj, prop)} to ${value}`
    );
    return Reflect.set(obj, prop, value);
  },
};

const account = new BankAccount("Abhishek", 500);
const proxy = new Proxy(account, bankHandler);

try {
  proxy.balance;
} catch (e) {}

try {
  proxy.deposit(5);
} catch (e) {}

proxy.authenticate();
console.log(proxy.balance);
proxy.deposit(500);
console.log(proxy.balance);
