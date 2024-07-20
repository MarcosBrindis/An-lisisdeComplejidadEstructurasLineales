export class Business {
    constructor(business, name, address, city, state, postal_code) {
        this.business= business;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postal_code = postal_code;
    }

    getData() {
        return {
            business: this.business,
            name: this.name,
            address: this.address,
            city: this.city,
            state: this.state,
            postal_code: this.postal_code,
        };
    }
}
