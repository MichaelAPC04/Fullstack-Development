const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= -10 && value <= 55;
            },
            message: "Temperature must be between -10 and 55",
        },
    },
    windspeed: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0 && value <= 60;
            },
            message: "Windspeed must be between 0 and 60",
        },
    },
    isRainy: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("Weather", weatherSchema);