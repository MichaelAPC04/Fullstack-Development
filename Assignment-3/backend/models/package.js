const mongoose = require("mongoose");   // Imports.
//const { validate } = require("./driver");

/**
 * Package Schema
 * @param {mongoose.Schema.Types.ObjectId} _id - Auto generated MongoDB ID.
 * @param {String} pId - Custom generated package ID.
 * @param {String} pTitle - Package title.
 * @param {Number} pWeight - Package weight.
 * @param {String} pDest - Package destination.
 * @param {String} pDesc - Package description.
 * @param {Boolean} pIsAllocated - Package allocation status.
 * @param {String} pDriverID - ID of the driver assigned to the package.
 * @param {Date} pCreatedAt - Date when the was package added.
 */
let packageSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    pId: {
        type: String,
        required: true,
        default: function(){
            // Auto-generate package ID.
            let char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            let pId = "P" + char + char + "-MC-" + Math.floor(Math.random() * 1000).toString().padStart(3, "0");
            return pId;
        }
    },
    pTitle: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value.length >= 3 && value.length <= 15;
            },
            message: "Title can only be between 3 to 15 characters."
        }
    },
    pWeight: {
        type: Number,
        required: true,
        validate: {
            validator: function(value){
                return value > 0;
            },
            message: "Weight must be greater than 0."
        }
    },
    pDest: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value.length >= 5 && value.length <= 15;
            },
            message: "Destination can only be between 5 to 15 characters."
        }
    },
    pDesc: {
        type: String,
        required: false,
        validate: {
            validator: function(value){
                return value.length <= 30;
            },
            message: "Description can only be up to 30 characters long or less."
        }
    },
    pIsAllocated: {
        type: Boolean,
        required: true
    },
    pDriverID: {
        type: String,
        required: true,
        ref: "Driver"
    },
    pCreatedAt: {
        type: Date,
        required: false,
        default: function(){
            let date = new Date();
            return date;
        }
    }
});

module.exports = mongoose.model("Package", packageSchema);