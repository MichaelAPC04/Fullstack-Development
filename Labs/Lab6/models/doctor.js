const mongoose = require("mongoose");
const { validate } = require("./patient");

const doctorSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value.length > 3;
            },
            message: "Name must be at least 3 characters long"
        }
    },
    speciality: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value.length > 10;
            },
            message: "Speciality must be at least 10 characters long"
        },
    },
    patients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }]
});

module.exports = mongoose.model("Doctor", doctorSchema);