const express = require("express");
const app = express();
const path = require("path");
const Doctor = require("./models/doctor");
const Patient = require("./models/patient");
const PORT_NUMBER = 8080;
const mongoose = require("mongoose");

let url = "mongodb://localhost:27017/lab6";

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT_NUMBER, function(err){
    console.log(`Listening on port number ${PORT_NUMBER}`);
});

async function connect(){
    await mongoose.connect(url);
    console.log("Successfully connected");
}

connect().catch(err => console.log(err));

app.use("/apc", require("./routes/doctor-routes"));
app.use("/apc", require("./routes/patient-routes"));