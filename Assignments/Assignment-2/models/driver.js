const mongoose = require("mongoose");   // Imports.
const { validate } = require("./package");

/**
 * Driver Schema
 * @param {mongoose.Schema.Types.ObjectId} _id - Auto generated MongoDB ID.
 * @param {String} dId - Custom generated driver ID.
 * @param {String} dName - Driver's name.
 * @param {String} dDepartment - Driver's department.
 * @param {String} dLicense - Driver's license number.
 * @param {Boolean} dIsActive - Driver's active status.
 * @param {Date} dDate - Date when the driver was added.
 * @param {Array} dAssignedPackages - Packages assigned to the driver.
 */
let driverSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    dId: {
        type: String,
        required: true,
        default: function(){
            // Auto-generate driver ID.
            let char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            let dId = "D" + Math.floor(Math.random() * 100).toString().padStart(2, "0") + "-33-" + char + char + char;
            return dId;
        }
    },
    dName: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value.length >= 3 && value.length <= 20;
            },
            message: "Name can only be between 3 to 20 characters."
        }
    },
    dDepartment: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                value.toLowerCase();
                return value == "food" || value == "furniture" || value == "electronic";
            },
            message: "Department can only be food, furniture or electronic."
        }
    },
    dLicense: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value.length == 5;
            },
            message: "License can only be 5 characters long."
        }
    },
    dIsActive: {
        type: Boolean,
        required: true
    },
    dDate: {
        type: Date,
        required: false,
        default: function(){
            let date = new Date();
            return date;
    }},
    dAssignedPackages: [{
        type: Array,
        ref: "Package",
        required: true
    }]
});

module.exports = mongoose.model("Driver", driverSchema);