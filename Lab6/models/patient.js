const mongoose = require("mongoose");
const { validate } = require("./doctor");

const patientSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value.length > 5;
            },
            message: "Name must be at least 5 characters long"
        },
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function(value){
                return value >= 0 && value <= 100;
            },
            message: "Age must be min 0 and max 100"
        },
    },
    weight: {
        type: Number,
        required: true,
        validate: {
            validator: function(value){
                return value >= 1 && value <= 250;
            },
            message: "Weight must be min 1 and max 250"
        },
    },
});

module.exports = mongoose.model("Patient", patientSchema);