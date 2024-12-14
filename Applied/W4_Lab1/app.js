const express = require('express');
const Book = require('./models/book');
const PORT_NUMBER = 8080;

let app = express();
let db = [];

app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('images'));

app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({extended: true}));

app.listen(PORT_NUMBER, function() {
    console.log(`Listening on port number ${PORT_NUMBER}`);
});

app.get('/', function(request, response) {
    response.render('index');
});

app.get('/add-book', function(request, response){
    response.render('add-book');
});

app.get('/view-books', function(request, response){
    response.render('view-books', {records: db});
});

app.post("/add-book-post", function(request, response){
    let newBook = new Book(request.body.title, request.body.author, request.body.year);
    db.push(newBook);
    response.redirect("/view-books");
});

app.get("*", function(request, response){
    response.render("404");
});