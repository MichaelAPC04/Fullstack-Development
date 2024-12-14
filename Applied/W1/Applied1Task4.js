class carModel{
    constructor(model, year, brand, price){
        this.model = model;
        this.year = year;
        this.brand = brand;
        this.price = price;
    }

    calcPrice(){
        let basePrice = 10000;
        let discount = (2024-this.year)*0.1;
        var newPrice = basePrice * discount;
        this.price = newPrice;
    }

}

let testModel = new carModel("X7", 2020, "BMW", 10000);
console.log(testModel.price);
carModel.price = testModel.calcPrice();
console.log(testModel.price);