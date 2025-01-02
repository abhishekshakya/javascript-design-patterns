class Shipping {
    request(zipStart, zipEnd, weight) {
        console.log('OLD zipStart: ', zipStart, 'zipEnd: ', zipEnd, 'weight: ', weight);
        return '$50';
    }
}

class AdvancedShipping {
    login(credentials) {
        console.log('login with ', JSON.stringify(credentials));
    }

    setStart(start) {
        console.log('set start ', start);
    }

    calculate(weight) {
        console.log('calculate weight ', weight);
        return '$45';
    }

    setDestination(destination) {
        console.log('set destination ', destination);
    }
}

class ShippingAdaptor {
    constructor(credentials) {
        this.shipping = new AdvancedShipping();
        this.shipping.login(credentials);
    }

    request(zipStart, zipEnd, weight) {
        this.shipping.setStart(zipStart);
        this.shipping.setDestination(zipEnd);
        return this.shipping.calculate(weight)
    }
}

const oldShipping = new Shipping();
console.log(oldShipping.request('12345', '54321', '2kg'));

const credentials = { token: "30a8-6ee1" };
const newShipping = new ShippingAdaptor(credentials)
console.log(newShipping.request('12345', '54321', '2kg'));