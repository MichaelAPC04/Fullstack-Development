const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/");

const PORT_NUMBER = 8080;

let db = [];

let app = express();
app.use(express.static("node_modules/bootstrap/dist/css"));
app.listen(PORT_NUMBER, function() {
    print(`listening on port ${PORT_NUMBER}`);
});

app.get("/", function(req, res) {
    res.sendFile(VIEWS_PATH + "index.html");
});

app.get("/contactus", function(req, res) {
    res.sendFile(VIEWS_PATH + "contactus.html");
});

app.get("/houses/cost", function(req, res) {
    let story = parseInt(req.query.stories);
    let room = parseInt(req.query.rooms);
    let cost = story * (Math.random()*(10 - 5) + 5) + room * (Math.random()*(10 - 5) + 5);
    res.send(`The building cost of ${story} stories and ${room} bedrooms house is $${cost}`);
});


app.use(function(req, res) {
    res.sendFile(VIEWS_PATH + "404.html");
});
