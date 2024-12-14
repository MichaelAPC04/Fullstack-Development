// let http = require("http");
// let fs = require("fs");

// http.createServer(function (req, res) {
//     fs.readFile('./templates/index.html', (err, data) => {
//         if (err)throw err;
//             console.log(data);
//         });
//     }).listen(8080);
// console.log("Server running at http://localhost:8080/");

/*
let http = require("http");
let fs = require("fs");

http.createServer(function (req, res) {
    fs.readFile('./templates/index.html', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            console.error(err);
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}).listen(8080);

console.log("Server running at http://localhost:8080/");
*/

var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
		const url = new URL(req.url, `http://${req.headers.host}`);
		switch (url.pathname) {
			case "/": //if a request like http://localhost:8080 arrives (no pathname)
				fileName = "./templates/index.html";
				break;
			case "/info": //if a request like http://localhost:8080/info arrives
				fileName = "./templates/info.html";
				break;
			
			case "/add": // if a request like http://localhost:8080/add?x=3&y=8 arrives
				q = url.searchParams; // get the list of parameters in the query string (i.e. x & y)
				x = parseInt(q.get("x")); // get the value of x
				y = parseInt(q.get("y")); // get the value of y
				result = x + y; // do the arithmetic operation
				msg = `The result of ${x} + ${y} is ${result}`; // build the response using JS template
				res.end(msg); // send it back to the client
				return; // end this callback
				break;
			
			case "/sub": // if a request like http://localhost:8080/sub?x=13&y=5 arrives
				q = url.searchParams;
				x = parseInt(q.get("x"));
				y = parseInt(q.get("y"));
				result = x - y;
				msg = `The result of ${x} - ${y} is ${result}`;
				res.end(msg);
				return;
				break;

			case "/assessments":
				fileName = "./templates/assessments.html";
				break;

			case "/whichweek":
				q = url.searchParams;
				d = q.get("d");
				m = q.get("m");
				y = q.get("y");
				result = getDaysDiff(d, m, y);
				if (result == -1) {
					fileName = "./templates/404.html";
				} 
				else if (result == +1){
					fileName = "./templates/404.html";
				}
				else {
					msg = `The week number is ${result}`;
				}
				res.end(msg);
				return;
				break;

			default:
				fileName = "./templates/404.html";
				break;
		}
		fs.readFile(fileName, function (error, content) {
			if (error) {
				// if an error (not null) occurred while reading the file such as file not found
				console.log("Sorry we got an error");
			} else {
				// there is no error
				res.end(content); // send the content of the file (either index or info) to the client
			}
		});
	}).listen(8080); // this is the port number

/**
 * 
 * @param {day} d 
 * @param {month} m 
 * @param {year} y 
 * @returns week number since August 3,2020; returns -1 if the input is before 3rd of August 2020
 */


function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));

    let firstDay = new Date(2023,7,24); // first day in semester 2

    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}