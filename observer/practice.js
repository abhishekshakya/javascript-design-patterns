class User {
  constructor(name) {
    this.name = name;
  }

  notify(message, sender) {
    console.log(`${this.name} recieved message ${message} from ${sender}`);
  }
}

class ChatRoom {
  observers = [];

  addUser(user) {
    this.observers.push(user);
  }

  removeUser(targetUser) {
    this.observers = this.observers.filter(
      (user) => user.name !== targetUser.name
    );
  }

  sendMessage(message, sender) {
    this.observers.forEach(
      (user) => user.name !== sender.name && user.notify(message, sender.name)
    );
  }
}

const Alice = new User("Alice");
const Bob = new User("Bob");
const Creek = new User("Creek");

const chatBox = new ChatRoom();
chatBox.addUser(Alice);
chatBox.addUser(Bob);
chatBox.addUser(Creek);
chatBox.sendMessage("Hiii", Alice);

chatBox.removeUser(Alice);
chatBox.sendMessage("Hii again!", Bob);
