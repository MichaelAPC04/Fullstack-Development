const Package = require("../models/package");   // Imports.
const Driver = require("../models/driver");
// Import the counter functions.
const {saveCreateCounter, saveRetrieveCounter, saveUpdateCounter, saveDeleteCounter} = require("../counter");

module.exports = {
    // A1 ROUTES.

    /**
     * @function addPackage - Adds a new package to the database.
     * @param {Object} req - Request object. Driver ID and new package's details.
     * @param {Object} res - Response object.
     * @returns {void} - Render "package_list.html" if successful. Else, render "error.html".
     */
    addPackage: async function(req, res){
        try{
            let driver = await Driver.findOne({dId: req.body.pDriverID});   // Try to find the driver.
            if(!driver){
                res.render("error", {error: "Driver not found."});
                return;
            }

            // Create a new package, save it, increment the counter and render the list of packages page.
            let package = new Package({pTitle: req.body.pTitle, pWeight: req.body.pWeight, pDest: req.body.pDest, pDesc: req.body.pDesc, pIsAllocated: req.body.pIsAllocated, pDriverID: req.body.pDriverID});
            await package.save();
            await saveCreateCounter();
            let packages = await Package.find({});
            res.render("package_list", { db2: packages });
        } catch(err){
            res.render("invalid_data");
        }
    },

    /**
     * @function getPackage - Gets all packages from database.
     * @param {Object} req - Request object. 
     * @param {Object} res - Response object.
     * @returns {void} - Render "package_list.html" if successful. Else, render "error.html".
     */
    getPackage: async function(req, res){
        try {
            let package = await Package.find({});
            await saveRetrieveCounter();
            res.render("package_list", { db2: package });
        } catch (err) {
            res.render("invalid_data");
        }
    },

    /**
     * @function removePackage - Remove a package from the database.
     * @param {Object} req - Request object, the MongoDB package ID.
     * @param {Object} res - Response object.
     * @returns {void} - Render "package_list.html" if successful. Else, "404.html" is rendered. 
     */
    removePackage: async function(req, res){
        let pId = req.body.pId;
        let obj = await Package.deleteOne({pId: pId});
        await saveDeleteCounter();
        let packages = await Package.find({});
        res.render("package_list", { db2: packages });
    },

    // RESTful API ROUTES ONLY

    /**
     * @function addPackageJSON - Add a new package to the database.
     * @param {Object} req - Request object, the Driver's MongoDB ID and package details.
     * @param {Object} res - Response object, JSON error if driver not found/ invalid inputs. Else, JSON object with package/ MongoDB ID.
     * @returns - JSON object (see above).
     */
    addPackageJSON: async function(req, res){
        try{
            let driver = await Driver.findOne({_id: req.body.pDriverID});   // Try to find the driver.
            if(!driver){
                res.status(404).json({error: "Driver not found."});
                return;
            }

            // Create a new package, save it, increment the counter and return the JSON object.
            let package = new Package({pTitle: req.body.pTitle, pWeight: req.body.pWeight, pDest: req.body.pDest, pDesc: req.body.pDesc, pIsAllocated: req.body.pIsAllocated, pDriverID: req.body.pDriverID});
            
            // push package to driver's assigned packages
            driver.dAssignedPackages.push(package);
            await driver.save();
            await package.save();
            await saveCreateCounter();
            res.status(200).json({_id: package._id, pId: package.pId});
        } catch(err){
            res.status(500).json({error: "Invalid data inputs"});
        }
    },

    /**
     * @function getPackageJSON - Get all packages from the database. Increments the retrieve counter.
     * @param {Object} req - Request object.
     * @param {Object} res - Response object, a JSON object with all packages if successful.
     * @returns - JSON object (see above).
     */
    getPackageJSON: async function(req, res){
        let package = await Package.find({});
        await saveRetrieveCounter();
        res.status(200).json(package);
    },

    /**
     * @function removePackageJSON - Remove a package from the database
     * @param {Object} req - Request object, the MongoDB package ID.
     * @param {Object} res - Response object, JSON object with a delete status.
     * @returns - JSON object (see above).
     */
    removePackageJSON: async function(req, res){
        let pId = req.body.pId;
        let package = await Package.findById(pId);
        if(package){
            // Find MongoDB package ID, if assigned to a driver, remove it from their assigned package list.
            let driver = await Driver.findById(package.pDriverID);
            if(driver){
                // Remove package from driver's array of assigned packages, then update driver.
                driver.dAssignedPackages.splice(driver.dAssignedPackages.indexOf(pId), 1);
                await driver.save();
            }
        }

        // Delete package, increment delete counter and return JSON object of the deletion.
        let obj = await Package.deleteOne({_id: pId});
        await saveDeleteCounter();
        res.status(200).json(obj);
    },

    /**
     * @function updatePackage - Update a package's destination.
     * @param {Object} req - Request object, the MongoDB package ID and new destination.
     * @param {Object} res - Response object, JSON object with updated package ID and destination.
     * @returns - JSON object (see above).
     */
    updatePackage: async function(req, res){
        let id = req.body.id;
        let package = await Package.findById(id);
        if(!package){
            res.status(404).json({status: "ID not found"});
            return;
        }
        package.pDest = req.body.pDest;
        await package.save();
        await saveUpdateCounter();
        res.status(200).json({status: "Update successful", pId: package.pId, pDest: package.pDest});
    },
};