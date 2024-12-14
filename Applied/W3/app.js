// Express is a dependency
// MUST "npm init" in terminal
// package, description, entry point (index.js) app.js test command, git repository, keywords, author, license
// "npm i express" in terminal
// delete "node modules" folder before submission

const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/");

const PORT_NUMBER = 8080;

let db = [];

// const app = express(); // also works
let app = express();
app.use(express.static("node_modules/bootstrap/dist/css"));
app.listen(PORT_NUMBER, function() {
    print(`listening on port ${PORT_NUMBER}`);
});

app.get("/addparcel/:sender/:address", function(req, res) {
    //fileName = VIEWS_PATH + "index.html";
    let newID = math.round(math.random()*1000);
    let senderID = req.params.sender;
    let senderAddress = req.params.address;
    db.push({id: newID, sender: senderID, address: senderAddress});
    //res.sendFile(fileName);
});

app.get("/getparcels", function(req, res) {
    let result = "";
    for (let i = 0; i < db.length; i++) {
        result += db[i].id + " " + db[i].sender + " " + db[i].address + "<br>";
    }
    res.send(result);
});

app.get("/deleteid")


/**
app.get("/", function(req, res) {
    fileName = VIEWS_PATH + "index.html"; 
    res.sendFile(fileName);
});

app.get("/add/:no1:/:no2", function(req, res) {
    fileName = VIEWS_PATH + "index.html";
    let number1 = parseInt(req.params.no1);
    let number2 = parseInt(req.params.no2);
    let result = number1 + number2;
    res.send(String(result));
});

app.get("/sub", function(req, res) {
    let number1 = parseInt(req.params.no1);
    let number2 = parseInt(req.params.no2);
    let result = number1 - number2;
    res.send(result + "");
});

app.get("/info", function(req, res) {
    fileName = VIEWS_PATH + "info.html";
    res.sendFile(fileName);
});
*/