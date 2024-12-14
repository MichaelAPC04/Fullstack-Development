const express = require("express");    // Imports
const app = express();
const path = require("path");
const Driver = require("./models/driver");
const Package = require("./models/package");
const PORT_NUMBER = 8080;   // Port number
const mongoose = require("mongoose");
const driverRouter = require("./routes/driver-routes");
const packageRouter = require("./routes/package-routes");
const {db} = require("./counter");

let url = "mongodb://localhost:27017/assignment2";    // URL to connect to MongoDB.

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
 * Connect to MongoDB.
 */
async function connect(){
    await mongoose.connect(url);
    console.log("Successfully connected");
}

connect().catch(err => console.log(err));

// Routes.
app.use("/0001/apc", driverRouter);
app.use("/0001/apc", packageRouter);

/**
 * Send user to homepage if default URL "/" is inputted.
 */
app.get("/", async function(req, res){
    let driver = await Driver.find({});
    let package = await Package.find({});
    res.render("homepage", {driver: driver.length, package: package.length});
});

/**
 * Send user to homepage, "/0001/apc" is the home URL.
 */
app.get("/0001/apc/", async function(req, res){
    let driver = await Driver.find({});
    let package = await Package.find({});
    res.render("homepage", {driver: driver.length, package: package.length});
});

/**
 * Send user to stats page of CRUD operations on Firebase.
 */
app.get("/0001/apc/stats", async function(req, res){
    const countRef = db.collection("counters");   // Ref to the collection.
    const getCounters = await countRef.get();
    const counters = getCounters.docs.map(doc => doc.data());   // Get all docs and their data from the collection.
    res.render("stats", {db: counters});
});

/**
 * Send user to 404 page if specified URL is not found.
 */
app.get("*", function(req, res){
    res.render("404");
});