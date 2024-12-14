const express = require("express");
const ejs = require("ejs");
const mongodb = require("mongodb");
const path = require("path");
const Car = require("./models/car");

let app = express();
const PORT_NUMBER = 8081;

app.listen(PORT_NUMBER, () => {
	console.log(`Listening on port ${PORT_NUMBER}`);
});

app.use(express.urlencoded({ extended: true }));

// Configure Express for EJS
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

const url = "mongodb://localhost:27017/";
//Configure MongoDB
const client = new MongoClient(url);
let db;
let collection;

async function main() {
	await client.connect();
	db = client.db("fleet");
	collection = db.collection("cars");

	return "Connected successfully to server.";
}

main().then(console.log);

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});


app.get("/addcar", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "addcar.html"));
});

app.post("/addcar", async function (req, res) {
	let car = new Car(req.body.maker, req.body.model);
	const insertResult = await collection.insertOne(car);
	res.redirect("/getcars");
});

app.get("/delcar", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "deletecar.html"));
});


app.get("/getcars", async function (req, res) {
	const findResult = await collection.find({}).toArray();
	res.render("getcars", { cars: findResult });
});

app.post("/delcar", async function (req, res) {
	let id = parseInt(req.body.id);
	let filter = { id: id };
	const deleteResult = await collection.deleteOne(filter);
	res.redirect("/getcars");
});

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "views/404.html"));
});