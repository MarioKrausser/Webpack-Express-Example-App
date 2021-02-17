const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

var path = require('path')
var fs = require('fs');

const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require("cors")
const fetch = require('node-fetch');
const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//Add your API Call Variables
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
const key = process.env.API_KEY;
const output = "&lang=en&of=json&txt=";


console.log(__dirname)

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


//Post Route
// app.post('/addData', addData);
//
// async function addData(request,response){
//
//     const url = request.body.url;
//
//     console.log("url", request.body.url);
//     console.log( baseUrl + key + output + url );
//
//   fetch(baseUrl + key + output + url )
//     .then( result => {
//       const data = await response.json();
//       console.log( "API", result );
//       response.send( result.json() )
//       console.log( "API-Micha", result.json() );
//     } )
// }
app.post("/addData", async (req, res) => {
  const url = req.body.url;
  const response = await fetch(baseUrl + key + output + url );
  console.log(response);
  try {
    const data = await response.json();
    res.send(data);
  } catch (err){
    console.log("error: ", err);
  }
});
