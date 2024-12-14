const express = require('express');
const app = express();
const Driver = require('./models/driver');
const Package = require('./models/package');
const PORT_NUMBER = 8080;
const mongoose = require('mongoose');
const cors = require('cors');
const {saveCreateCounter, saveRetrieveCounter, saveUpdateCounter, saveDeleteCounter, getCreateCounter, getRetrieveCounter, getUpdateCounter, getDeleteCounter} = require('./counter');

const server = require('http').Server(app);
const io = require('socket.io')(server,{
    cors: {
        origin: '*',
    }
});

const { GoogleGenerativeAI } = require('@google/generative-ai');
const gemini_api_key = 'null';
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
    model: 'gemini-pro',
    geminiConfig,
});

let url = 'mongodb://localhost:27017/assignment3';

app.use(express.json());
app.use(cors());
app.use(express.static('imgs'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT_NUMBER, function (err){
    console.log(`Listening on port number ${PORT_NUMBER}`);
});

async function connect(){
    await mongoose.connect(url);
    console.log('Successfully connected');
}

connect().catch(err => console.error(err));

/* DRIVER API ROUTES */

app.get('/api/v2/getDrivers', async function (req, res) {
    let driver = await Driver.find({});
    await saveRetrieveCounter();
    res.status(200).json(driver);
});

app.post('/api/v2/addDriver', async function (req, res) {
    let driver = new Driver({dName: req.body.dName, dDepartment: req.body.dDepartment, dLicense: req.body.dLicense, dIsActive: req.body.dIsActive});
    await driver.save();
    await saveCreateCounter();
    res.status(200).json({ _id: driver._id, dId: driver.dId });
});

app.delete('/api/v2/removeDriver', async function (req, res) {
    let _id = req.body._id;
    let driver = await Driver.findById(_id).populate('dAssignedPackages');
    if(driver){
        let pId = driver.dAssignedPackages.map(p => p._id);
        await Package.deleteMany({_id: {$in: pId}});
    }
    await saveDeleteCounter();
    let obj = await Driver.deleteOne({_id: _id});
    res.status(200).json(obj);
});

app.put('/api/v2/updateDriver', async function (req, res) {
    let id = req.body.id;
    let driver = await Driver.findById(id);
    if(!driver){
        res.status(404).json({error: 'ID not found'});
        return;
    }
    driver.dLicense = req.body.dLicense;
    driver.dDepartment = req.body.dDepartment;
    await driver.save();
    await saveUpdateCounter();
    res.status(200).json({status: 'Driver updated successfully'});
});

/* PACKAGE API ROUTES */

app.get('/api/v2/getPackage', async function (req, res) {
    let package = await Package.find({});
    await saveRetrieveCounter();
    res.status(200).json(package);
});

app.post('/api/v2/addPackage', async function (req, res) {
    try{
        let driver = await Driver.findOne({_id: req.body.pDriverID});
        if(!driver){
            res.status(404).json({error: 'Driver not found'});
            return;
        }

        let package = new Package({pTitle: req.body.pTitle, pWeight: req.body.pWeight, pDest: req.body.pDest, pDesc: req.body.pDesc, pIsAllocated: req.body.pIsAllocated, pDriverID: req.body.pDriverID});
        driver.dAssignedPackages.push(package);
        await driver.save();
        await package.save();
        await saveCreateCounter();
        res.status(200).json({ _id: package._id, pId: package.pId });
    } catch (err){
        res.status(500).json({error: "Invalid data inputs"});
    }
});

app.delete('/api/v2/removePackage', async function (req, res) {
    let pId = req.body.pId;
    let package = await Package.findById(pId);
    if(package){
        let driver = await Driver.findById(package.pDriverID);
        if(driver){
            driver.dAssignedPackages.splice(driver.dAssignedPackages.indexOf(pId), 1);
            await driver.save();
        }
    }
    let obj = await package.deleteOne({_id: pId});
    await saveDeleteCounter();
    res.status(200).json(obj);
});

app.put('/api/v2/updatePackage', async function (req, res) {
    let id = req.body.id;
    let package = await Package.findById(id);
    if(!package){
        res.status(404).json({error: 'ID not found'});
        return;
    }
    package.pDest = req.body.pDest;
    await package.save();
    await saveUpdateCounter();
    res.status(200).json({status: "Update successful", pId: package.pId, pDest: package.pDest});
});

app.get('/api/v2/stats', async function (req, res) {
    let create = await getCreateCounter();
    let retrieve = await getRetrieveCounter();
    let update = await getUpdateCounter();
    let remove = await getDeleteCounter();
    res.status(200).json({create, retrieve, update, remove});
});

app.get('/api/v2/driverLength', async function (req, res) {
    let driver = await Driver.find({});
    res.status(200).json(driver.length);
});

app.get('/api/v2/packageLength', async function (req, res) {
    let package = await Package.find({});
    res.status(200).json(package.length);
});

io.on('connection', socket => {
    console.log('New connection made from client with ID = ' + socket.id);
    socket.on('calculateDistance', async ({pDest, idx}) => {
        try{
            let distance = await geminiModel.predict({
                prompt: `As accurately as possible, calculate the distance in kilometres between Melbourne and ${pDest}`,
                maxTokens: 150,
            });
            socket.emit('distanceResult', {distance, idx});
            console.log('Distance calculated: ', distance);
        } catch (err){
            console.error('Distance calculation error', err);
            socket.emit('distanceResult', {error: 'Distance calculation failed', idx});
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});