const express = require("express");   // Imports.
const driverController = require("../controllers/driver-controller");
const router = express.Router();

// A1 ROUTES.
router.get("/addDriver", function(req, res){
    res.render("add_driver");
});
router.get("/getDrivers", driverController.getDriver);
router.get("/removeDriver", function(req, res){
    res.render("delete_driver");
});
router.post("/addDriver", driverController.addDriver);
router.post("/removeDriver", driverController.removeDriver);



// POSTMAN RESTful API ROUTES ONLY.
router.get("/api/v1/getDrivers", driverController.getDriverJSON);
router.post("/api/v1/addDriver", driverController.addDriverJSON);
router.delete("/api/v1/removeDriver", driverController.removeDriverJSON);
router.put("/api/v1/updateDriver", driverController.updateDriver);

module.exports = router;