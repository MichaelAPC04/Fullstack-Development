const express = require("express");
const app = express();
const path = require("path");
const Product = require("./product");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

let db = [];

app.use(express.json());
app.use(express.urlencoded ({extended: true}));
app.use(express.static("imgs"));
app.use(express.static("nodule_modules/bootstrap/dist/css"));

app.get("/", function(req, res){
    var today = new Date();
    res.render('index', {today: today});
});

app.get("/0001/products", function(req, res){
    if(db.length == 0){
        res.send("No products available");
    } else{
        res.render('products', {db: db});
    }
});

app.get("/0001/products/new", function(req, res){
    res.render("new", {db: db});
});

app.post("/0001/products/new", function(req, res){
    let pName = req.body.pName;
    let pCategory = req.body.pCategory;
    let pCost = req.body.pCost;
    let product = new Product(pName, pCategory, pCost);
    db.push(product);
    res.redirect("/0001/products");
});

app.listen(8080, function(err){
    console.log("We are listening on port 8080");
});