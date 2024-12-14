const express = require("express");
const app = express();
const path = require("path");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
//app.set("templates", path.join(__dirname, "views"));

app.listen(8080, function (err) {
    console.log("We are listening on port 8080");
});

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
//app.use(express.json());

app.get("/students/add", function (req, res){
    res.render("student.html", {db:db.length});
});

// app.post("/students/add", function (req, res){
//     res.sendFile(path.join(__dirname, "views", "add_student.html"));
// });

let db = [];
app.post("/students/new", function (req, res){
    console.log(req.body);
    db.push({name: req.body.fullName, 
        age: req.body.age});
    res.send(db);
});

//let msg = `values ${}`