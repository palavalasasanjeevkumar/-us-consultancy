/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// env CONFIG 
require('dotenv').config()
var MongoClient = require('mongodb').MongoClient;

// create a new express server
var app = express();
let bodyParser = require('body-parser');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// our Angular code is sending JSON data, but your Express app is parsing it as
// URL encoded data.
app.use(bodyParser.json());
const MONGO_HOST_URL = process.env.CTRLS_MONGO_DB_URL
const MONGO_DB_NAME = process.env.CTRL_MONGO_DB
const MONGO_DB_COLLECTION_NAME = process.env.CTRL_MONGO_COLLECTION

app.post('/insertData', (req, res) => {
  console.log(req.body);
  MongoClient.connect(MONGO_HOST_URL, function (err, db) {
    if (err) throw err;
    var dbo = db.db(MONGO_DB_NAME);
    var myobj = req.body;
    dbo.collection(MONGO_DB_COLLECTION_NAME).insert(myobj, function (err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.status(201).send({ "msg": 'Successfully data stored in DB.' })
});

app.get('/getData', (req, res) => {
  let returnData = []
  MongoClient.connect(MONGO_HOST_URL, function (err, db) {
    if (err) throw err;
    var dbo = db.db(MONGO_DB_NAME);
    var cursor = dbo.collection(MONGO_DB_COLLECTION_NAME).find();
    // Execute the each command, triggers for each document
    cursor.each(function (err, item) {
      // If the item is null then the cursor is exhausted/empty and closed
      if (item == null) {
        console.log("NO RECORDS FOUND");
        db.close(); // you may not want to close the DB if you have more code....
        res.status(200).send(returnData)
        return;
      }
      else {
        returnData.push(item)
      }
      // otherwise, do something with the item
    });
  });
});

// start server on the specified port and binding host
app.listen(6001, '0.0.0.0', function () {
  console.log("server starting on  http://localhost:6001/");
});


