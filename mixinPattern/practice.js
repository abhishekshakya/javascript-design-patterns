const LoggerMixin = {
  log(message) {
    console.log(`[LOG]: ${message}`);
  },
};

// Create a User class without extending anything but mix behaviors using object composition.
class User {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(User.prototype, LoggerMixin);

const user = new User("Alice");
user.log("User created!");
