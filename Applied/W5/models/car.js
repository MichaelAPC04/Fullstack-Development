class Car {
	constructor(maker, model) {
		this.maker = maker;
		this.model = model;
		this.id = Math.round(Math.random() * 1000);
	}
}

module.exports = Car;