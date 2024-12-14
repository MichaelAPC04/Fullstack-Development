/*
TEST FILE, this is not needed for the lab task
*/

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const app = express;
const PORT_NUMBER = 8080;
app.listen(PORT_NUMBER);

app.use(express.urllencoded({extended: false}));


let db;
let collection;

async function connectDB() {
    await client.connect();
    db = client.db("week-5-lab");
    collection = db.collection("Week5");
    console.log("Connected to database successfully");

    await collection.insertOne({name:"Tiger"});
    await collection.insertMany([{name:"Tom"}, {name:"woods"}]);
}

connectDB();

// npm install mongodb
// type node app.js to run the db

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/fleet/new", async function(req, res){
    let newCar = {
        maker: req.body.maker,
        model: req.body.model,
        year: req.body.year
    };
    await collection.insertOne(newCar);
    res.send("Successful");

    //redirect to a different page
    //res.redirect("/fleet");
});