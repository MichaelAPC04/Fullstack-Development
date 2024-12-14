const express = require("express");
const app = express();
const path = require("path");
const Teacher = require("./teacher");

let db = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, function(err){
    console.log("We are listening on port 8080");
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/homepage.html"));
});

app.get("/apc/teachers", function(req, res){
    res.send(db);
});

app.get("/apc/teachers/add", function(req, res){
    res.sendFile(path.join(__dirname, "/views/add_teacher.html"));
});

app.post("/apc/teachers/add", function(req, res){
    console.log(req.body);
    let newTeacher = new Teacher(req.body.teacher_name, req.body.teacher_salary, req.body.teacher_rank);
    db.push(newTeacher);
    res.send(db);
});

app.get("/apc/teachers/remove/:id", function(req, res){
    let id = req.params.id;
    for(let i = 0; i < db.length; i++){
        if(db[i].id == id){
            db.splice(i, 1);
            return;
        }
    }
    res.send(db);
});