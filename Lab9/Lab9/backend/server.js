const express = require('express');
const app = express();
const PC = require('./models/pc');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');


//array of PCs
let db = [];

const server = http.createServer(app);

//socket.io server
const io = new Server(server);

//to JSON data
app.use(express.json());
app.use(cors());


server.listen(8080);


//to get all PCs
//test this endpoint by sending a GET request to http://localhost:8080/api/pcs
app.get('/api/pcs', async (req, res) => {
    res.json(db);
});
//to save a new PC
//test this endpoint by sending a POST request to http://localhost:8080/api/pcs
app.post('/api/pcs', async (req, res) => {
    let pc = new PC(req.body.cpu, req.body.ram, req.body.hdd);
    db.push(pc);
    res.json(pc);
});
