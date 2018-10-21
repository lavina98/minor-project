var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/db";

app.listen(8100);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var conn;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  else 
  console.log("Connected"); 
  this.conn = db; 
});

app.post('/data', function (req, res) {
  var dbo = this.conn.db("db");
  //Find all documents in the customers collection:
  dbo.collection("test").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
})

