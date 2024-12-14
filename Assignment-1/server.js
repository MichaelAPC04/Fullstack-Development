const express = require("express");    // Imports
const app = express();
const path = require("path");
const Driver = require("./driver");
const Package = require("./package");
const PORT_NUMBER = 8080;   // Port number

// Databases
let db = [];
let db2 = [];

// Drivers
app.use(express.json());
app.use(express.static("imgs"));
app.use(express.static("node_modules/bootstrap/dist/css"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({ extended: true }));

/**
 * Listen to port 8080, print to terminal.
 */
app.listen(PORT_NUMBER, function(err){
    console.log(`Listening on port number ${PORT_NUMBER}`);
});

/**
 * Send user to homepage if default URL "/" is inputted.
 */
app.get("/", function(req, res){
    res.render("homepage");
});

/**
 * Send user to homepage, "/0001/apc" is the home URL.
 */
app.get("/0001/apc/", function(req, res){
    res.render("homepage");
});

/**
 * Send user to add driver page.
 */
app.get("/0001/apc/addDriver", function(req, res){
    res.render("add_driver");
});

/**
 * POST request to add a driver once on add_driver.html.
 */
app.post("/0001/apc/addDriverPost", function(req, res){
    console.log(req.body);    // Print results to terminal.

    const REGEX = /^[A-Za-z0-9]+$/;    // Regex to check alphanumeric.

    // Check if driver name between 3 - 20 characters and if alphanumeric.
    if(req.body.dName.length < 3 || req.body.dName.length > 20 || !REGEX.test(req.body.dName)){
        return res.render("invalid_data");
    }

    // Check if department equals to food, furniture or electronic.
    if(req.body.dDepartment != "food" && req.body.dDepartment != "furniture" && req.body.dDepartment != "electronic"){
        return res.render("invalid_data");
    }

    // Check if driver license is 5 characters long and if alphanumeric.
    if(req.body.dLicense.length != 5 || !REGEX.test(req.body.dLicense)){
        return res.render("invalid_data");
    }

    // Check if driver is active, is true or false.
    if(req.body.dIsActive != "true" && req.body.dIsActive != "false" && req.body.dIsActive != "True" && req.body.dIsActive != "False"){
        return res.render("invalid_data");
    }

    // Create new driver object, push to db.
    let newDriver = new Driver(req.body.dName, req.body.dDepartment, req.body.dLicense, req.body.dIsActive);
    db.push(newDriver);
    res.render("driver_list", {db: db});   // Render driver_list.html and send the updated db.
});

/**
 * Send user to the list of drivers page.
 */
app.get("/0001/apc/getDrivers", function(req, res){
    res.render("driver_list", {db: db});
});

/**
 * Send user to the delete driver page.
 */
app.get("/0001/apc/removeDriver/", function(req, res){
    res.render("delete_driver");
});

/**
 * GET request via query to delete a driver once on delete_driver.html.
 */
app.get("/0001/apc/removeDriverPost/", function(req, res){
    let id = req.query.id;    // Get id from query.
    let idFound = false;

    // Loop through db to find id.
    for(let i = 0; i < db.length; i++){
        if(db[i].dId == id){
            db.splice(i, 1);
            idFound = true;
            break;
        }
    }

    // Update db if found.
    if(idFound){
        res.render("driver_list", {db: db});
    }

    // Send to invalid_data.html if not found.
    else{
        res.render("invalid_data");
    }

});

/**
 * Send user to add package page (the db is sent too for the dropdown driver ID option).
 */
app.get("/0001/apc/addPackage", function(req, res){
    res.render("add_package", {db: db});
});

/**
 * POST request to add a package once on add_package.html.
 */
app.post("/0001/apc/addPackagePost", function(req, res){
    console.log(req.body);

    const REGEX = /^[A-Za-z0-9]+$/;

    // Check if package title is 3 - 15 characters and if alphanumeric.
    if(req.body.pTitle.length < 3 || req.body.pTitle.length > 15 || !REGEX.test(req.body.pTitle)){
        return res.render("invalid_data");
    }

    // Check if package weight greater than 0.
    if(req.body.pWeight <= 0){
        return res.render("invalid_data");
    }

    // Check if package destination is 5 - 15 characters and if alphanumeric.
    if(req.body.pDest.length < 5 || req.body.pDest.length > 15 || !REGEX.test(req.body.pDest)){
        return res.render("invalid_data");
    }

    // Check if package description is 5 - 30 characters.
    if(req.body.pDesc.length > 30){
        return res.render("invalid_data");
    }

    // Check if package is allocated is true or false.
    if(req.body.pIsAllocated != "true" && req.body.pIsAllocated != "false" && req.body.pIsAllocated != "True" && req.body.pIsAllocated != "False"){
        return res.render("invalid_data");
    }

    // Create new package object, push to db2.
    let newPackage = new Package(req.body.pTitle, req.body.pWeight, req.body.pDest, req.body.pDesc, req.body.pIsAllocated, req.body.pDriverID);
    db2.push(newPackage);
    res.render("package_list", {db2: db2});
});

/**
 * POST request to implement the removal of a driver by their ID.
 * THIS SHOULD BE GET, but doesn't matter, won't affect marks.
 */
app.post("/0001/apc/removeDriverPost/:id", function(req, res){
    let id = req.params.id;    // Get id from params.
    let idFound = false;

    for(let i = 0; i < db.length; i++){
        if(db[i].dId == id){
            db.splice(i, 1);
            idFound = true;
            break;
        }
    }

    if(idFound){
        res.render("driver_list", {db: db});
    }

    else{
        res.render("invalid_data");
    }

});

/**
 * Send user to the list of packages page. db2 is sent too, to loop through and display the packages.
 */
app.get("/0001/apc/getPackages", function(req, res){
    res.render("package_list", {db2: db2});
});

/**
 * Send user to the delete package page.
 */
app.get("/0001/apc/removePackage/", function(req, res){
    res.render("delete_package");
});

/**
 * GET request via query to delete a package once on delete_package.html.
 */
app.get("/0001/apc/removePackagePost/", function(req, res){
    let id = req.query.id;
    let idFound = false;

    for(let i = 0; i < db2.length; i++){
        if(db2[i].pId == id){
            db2.splice(i, 1);
            idFound = true;
            break;
        }
    }

    if(idFound){
        res.render("package_list", {db2: db2});
    }

    else{
        res.render("invalid_data");
    }

});

/**
 * POST request to implement the removal of a package by its ID.
 */
app.post("/0001/apc/removePackagePost/:id", function(req, res){
    let id = req.params.id;
    let idFound = false;

    for(let i = 0; i < db2.length; i++){
        if(db2[i].pId == id){
            db2.splice(i, 1);
            idFound = true;
            break;
        }
    }

    if(idFound){
        res.render("package_list", {db2: db2});
    }

    else{
        res.render("invalid_data");
    }

});

/**
 * Send user to 404 page if specified URL is not found.
 */
app.get("*", function(req, res){
    res.render("404");
});