var path = require('path')
var fs = require('fs');

const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const baseUrl = process.env.API_ID;
const key = process.env.API_KEY;

console.log(__dirname)

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Setup empty Array
let projectData = {};

// Callback function to complete GET '/all'

app.get('/all', sendData);

function sendData (req, res) {
    console.log(req.query)
    res.send(projectData);
    console.log(projectData)
}

// Post Route

app.post('/addData', addData);

function addData(req,res){

    const newData = req.body;
    console.log(req.body);
    projectData["score_tag"] = newData.score_tag;
    projectData["agreement"] = newData.agreement;
    projectData["subjectivity"] = newData.subjectivity;
    projectData["irony"] = newData.irony;
    projectData["confidence"] = newData.confidence;
    res.send(projectData);
}

