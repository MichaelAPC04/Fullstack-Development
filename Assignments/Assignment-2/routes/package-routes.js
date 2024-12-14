const express = require("express");   // Imports.
const packageController = require('../controllers/package-controller');
const router = express.Router();
const Driver = require("../models/driver");

// A1 ROUTES.
router.get("/addPackage", async function(req, res){
    try{
        let driver = await Driver.find({});
        res.render("add_package", {db: driver});  // Get all drivers from database.
    } catch(err){
        res.render("invalid_data");
    }
});
router.get("/getPackages", packageController.getPackage);
router.get("/removePackage", function(req, res){
    res.render("delete_package");
});
router.post("/addPackage", packageController.addPackage);
router.post("/removePackage", packageController.removePackage);


// POSTMAN RESTful API ROUTES ONLY.

router.post("/api/v1/addPackage", packageController.addPackageJSON);
router.get("/api/v1/getPackage", packageController.getPackageJSON);
router.delete("/api/v1/removePackage", packageController.removePackageJSON);
router.put("/api/v1/updatePackage", packageController.updatePackage);

module.exports = router;