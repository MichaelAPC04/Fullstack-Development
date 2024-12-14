const mongoose = require("mongoose");

const forecastSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
			validator: function (value) {
				return value <= 3;
			},
			message: "Name must be greater than 3 letters",
		},
    },
    date: {
        type: Date,
        required: true,
        validate: {
			validator: function (value) {
				return value < 8;
			},
			message: "Date must be greater than 8 letters",
		},
    },
    readings: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Forecast", forecastSchema);