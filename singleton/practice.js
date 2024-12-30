class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.sharedState = "THIS IS SHARED";
  }

  getState() {
    return this.sharedState;
  }

  setState(state) {
    this.sharedState = state;
  }
}

const obj = new Singleton();
console.log(obj.getState());

const obj2 = new Singleton();
obj2.setState("I AM OBJ 2");

console.log(obj.getState());
