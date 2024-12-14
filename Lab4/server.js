// GENERAL IMPORTS
const express = require("express");
const app = express();
const path = require("path");
const Computer = require("./computer");
const PORT_NUMBER = 8080;

// MONGO IMPORTS
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

let db;
let collection;

app.use(express.json());
app.use(express.static("node_modules/bootstrap/dist/css"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));

app.listen(PORT_NUMBER, function(err){
    console.log(`Listening on port number ${PORT_NUMBER}`);
});

async function ConnectDB() {
    await client.connect;
    db = client.db("week-6-lab");
    collection = db.collection("lab4");
    console.log("database connected successfully");

    await collection.insertMany([{name:"Linux", cCpu:"Intel", cRam:"16GB", cStorage: "100GB", cWindows: "false"}, {name:"Mac", cCpu: "M4", cRam: "8GB", cStorage: "10GB", cWindows: "false"}, {name:"Windows", cCpu:"Intel", cRam:"8GB", cStorage: "200GB", cWindows: "true"}]);
}

ConnectDB();

app.get("/", async function(req, res){
    const findResult = await collection.find({}).toArray();
    res.render("index", {count: findResult});
});

app.get("/apc/computers", async function(req, res){
    const findResult = await collection.find({}).toArray();
    res.render("list_computers", {count: findResult});
});

app.get("/apc/computers/windows", async function(req, res){
    const findResult = await collection.find({}).toArray();
    res.render("windows_attribute", {count: findResult});
});

app.get("/apc/computers/remove", async function (req, res) {
    res.render("remove_computer"); 
});

app.post("/apc/computers/remove", async function (req, res) {
	let id = new mongodb.ObjectId(req.body.id);
	let filter = { _id: id };
	const deleteResult = await collection.deleteOne(filter);
	res.render("remove_computer", {count: deleteResult});
});

app.get("/apc/computers/add", async function (req, res) {
    res.render("add_computer");
});

app.post("/apc/computers/add", async function (req, res) {
    let computer = new Computer(req.body.cCpu, req.body.cRam, req.body.cStorage, Boolean(req.body.cWindows));
	const result = await collection.insertOne(computer);
    res.render("list_computers", {count: result});
});