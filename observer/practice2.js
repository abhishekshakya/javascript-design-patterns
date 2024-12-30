class NotificationManager {
  observers = new Map();

  subscribe(event, callback, id) {
    if (this.observers.has(event)) {
      const listeners = this.observers.get(event);
      listeners.push({ id, callback });
    } else {
      const listeners = [{ id, callback }];
      this.observers.set(event, listeners);
    }
    console.log(id, "subscribed to", event);
  }

  unSubscribe(event, id) {
    if (this.observers.has(event)) {
      const listeners = this.observers.get(event);
      const filteredListeners = listeners.filter(
        (listern) => listern.id !== id
      );
      this.observers.set(event, filteredListeners);
      console.log(id, "unsubscribed from", event);
    } else {
      console.log("No such event", event);
    }
  }

  notify(event) {
    const listeners = this.observers.get(event);
    listeners.forEach((listener) => listener.callback());
  }
}

const notificationManager = new NotificationManager();
notificationManager.subscribe(
  "newMessage",
  () => {
    console.log("Hey Web, New message recieved!!");
  },
  "web"
);
notificationManager.subscribe(
  "newMessage",
  () => {
    console.log("Hey Andriod, New message recieved!!");
  },
  "andriod"
);
notificationManager.subscribe(
  "newMessage",
  () => {
    console.log("Hey iOS, New message recieved!!");
  },
  "iOS"
);

notificationManager.subscribe(
  "newOrder",
  () => {
    console.log("Hey Web, New order aligned!!");
  },
  "web"
);

notificationManager.subscribe(
  "newOrder",
  () => {
    console.log("Hey Andriod, New order aligned!!");
  },
  "andriod"
);

notificationManager.subscribe(
  "newOrder",
  () => {
    console.log("Hey iOS, New order aligned!!");
  },
  "iOS"
);

notificationManager.notify("newMessage");
notificationManager.notify("newOrder");

notificationManager.unSubscribe("newMessage", "andriod");
notificationManager.unSubscribe("newMessage", "iOS");
notificationManager.unSubscribe("newOrder", "andriod");
notificationManager.unSubscribe("newOrder", "iOS");

notificationManager.notify("newMessage");
notificationManager.notify("newOrder");
