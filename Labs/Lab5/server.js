const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT_NUMBER = 8080;


app.use(express.static("node_modules/bootstrap/dist/css"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(PORT_NUMBER);

const Weather = require("./models/weather");
const Forecast = require("./models/forecast");

const url = "mongodb://localhost:27017/monash-weather-app";

async function connect(url) {
    await mongoose.connect(url);
    return "Connected successfully";
};

connect(url).then(console.log).catch((err) => console.log(err));

app.get("/", async function(req, res){
    queryForecasts = await Forecast.find({});
    forecastTotal = queryForecasts.length;
    queryWeather = await Weather.find({});
    res.render("index", {forecast: forecastTotal, weather: queryWeather});
});

app.get("/apc/forecasts", async function(req, res){
    queryForecasts = await Forecast.find({});
    queryReadings = await Weather.find({});
    readingsTotal = queryReadings.length;
    if (queryForecasts.length == 0){
        return "No forecasts are available";
    }
    res.render("index", {forecasts: queryForecasts, readingsTotal: readingsTotal});
});

app.get("/apc/readings/add", async function(req, res){
    queryReadings = await Weather.find({}).exec();
    readingsTotal = queryReadings.length;
    res.render("add_reading", {readingsTotal: readingsTotal});
});

app.post("/apc/readings/add/post", async function(req, res){
    const newReading = new Weather({
        temperature: req.body.temperature,
        windspeed: req.body.windspeed,
        isRainy: req.body.isRainy,
    });
    await newReading.save();
    res.redirect("/apc/forecasts");
});