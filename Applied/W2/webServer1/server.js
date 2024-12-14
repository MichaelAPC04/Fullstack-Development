// TASK 1 BELOW: //

/*
let http = require("http");

http.createServer(function (request, response) {
    console.log("request", request.url);
    response.writeHead(200);
    response.write("Lab Week 2");
    response.end();
}).listen(8080);
console.log("Server running at http://localhost:8080/");
*/

var http = require("http"); 
var fs = require("fs"); // file system lib to read a file

http.createServer(function (req, res) {
		fs.readFile("./views/index.html", function (error, content) {
			if (error) {
				// if an error (not null) occurred while reading the file such as file not found
				console.log("Sorry we got an error");
			} else {
				// there is no error
				res.end(content); // send the content of the file (either index or info) to the client
			}
		});
	}).listen(8080); // this is the port number