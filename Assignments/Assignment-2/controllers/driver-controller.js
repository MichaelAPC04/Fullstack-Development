const Driver = require("../models/driver");   // Imports.
const Package = require("../models/package");
// Import the counter functions.
const {saveCreateCounter, saveRetrieveCounter, saveUpdateCounter, saveDeleteCounter} = require("../counter");

module.exports = {
    // A1 ROUTES.

    /**
     * @function addDriver - Adds a new driver to the database, increments create counter.
     * @param {Object} req - Request object. New driver's details.
     * @param {Object} res - Response object.
     * @returns {void} - Render "driver_list.html" if successful. Else, render "404.html".
     */
    addDriver: async function(req, res){
        let driver = new Driver({dName: req.body.dName, dDepartment: req.body.dDepartment, dLicense: req.body.dLicense, dIsActive: req.body.dIsActive});
        await driver.save();
        await saveCreateCounter();
        res.redirect("getDrivers");
    },

    /**
     * @function getDriver - Get all drivers from database, increments retrieve counter.
     * @param {Object} req - Request object. 
     * @param {Object} res - Response object.
     * @returns {void} - Render "driver_list.html" if successful. Else, render "invalid_data.html".
     */
    getDriver: async function(req, res){
        try {
            let driver = await Driver.find({});
            await saveRetrieveCounter();
            res.render("driver_list", { db: driver });
        } catch (err) {
            res.render("invalid_data");
        }
    },

    /**
     * @function removeDriver - Remove a driver from database, increments delete counter.
     * @param {Object} req - Request object, the driver's MongoDB ID.
     * @param {Object} res - Response object.
     * @returns {void} - Redirect to "getDrivers" if successful.
     */
    removeDriver: async function(req, res){
        let dId = req.body.dId;
        let obj = await Driver.deleteOne({dId: dId});
        await saveDeleteCounter();
        res.redirect("getDrivers");
    },

    // POSTMAN RESTful API ROUTES ONLY

    /**
     * @function getDriverJSON - Get all drivers from the database, increments retrieve counter.
     * @param {Object} req - Request object.
     * @param {Object} res - Response object. A JSON object of all drivers if successful.
     * @returns - JSON object (see above). 
     */
    getDriverJSON: async function(req, res){
        let driver = await Driver.find({});
        await saveRetrieveCounter();
        res.status(200).json(driver);
    },

    /**
     * @function addDriverJSON - Adds new driver to the database, increments create counter.
     * @param {Object} req - Request object, the new driver's details.
     * @param {Object} res - Response object. JSON object with the driver's MongoDB ID and auto-generated ID.
     * @returns - JSON object (see above). 
     */
    addDriverJSON: async function(req, res){
        let driver = new Driver({dName: req.body.dName, dDepartment: req.body.dDepartment, dLicense: req.body.dLicense, dIsActive: req.body.dIsActive});
        await driver.save();
        await saveCreateCounter();
        res.status(200).json({ _id: driver._id, dId: driver.dId });
    },

    /**
     * @function removeDriverJSON - Remove a driver from the database, increments delete counter.
     * @param {Object} req - Request object, the driver's MongoDB ID.
     * @param {Object} res - Response object, JSON object with the deletion status.
     * @returns - JSON object (see above). 
     */
    removeDriverJSON: async function(req, res){
        let _id = req.body._id;
        let driver = await Driver.findById(_id).populate("dAssignedPackages");  // Populate driver's assigned packages array.
        if(driver){
            // If driver has assigned packages, delete them.
            await Package.deleteMany({_id: {$in: driver.dAssignedPackages}});
        }
        await saveDeleteCounter();
        // Delete the driver.
        let obj = await Driver.deleteOne({_id: _id});
        res.status(200).json(obj);
    },

    /**
     * @function updateDriver - Update a driver's license and department.
     * @param {Object} req - Request object, the driver's MongoDB ID and new details.
     * @param {Object} res - Response object, JSON object with the update status. 
     * @returns - JSON object (see above). JSON error object if driver ID not found.
     */
    updateDriver: async function(req, res){
        let id = req.body.id;
        let driver = await Driver.findById(id);
        if(!driver){
            res.status(404).json({status: "ID not found"});
            return;
        }
        driver.dLicense = req.body.dLicense;
        driver.dDepartment = req.body.dDepartment;
        await driver.save();
        await saveUpdateCounter();
        res.status(200).json({status: "Driver updated successfully"});
    },
};