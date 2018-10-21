var express = require('express');
var app = express();
const rp = require('request-promise');
const $ = require('cheerio');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_92150sf3:c3bghg1817nkncmtbsafjpblje@ds237713.mlab.com:37713/heroku_92150sf3";
const PORT = process.env.PORT || 5000;
app.listen(PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var conn;
MongoClient.connect(url,{ useNewUrlParser: true } , function(err, db) {
  if (err) throw err;
  else 
  console.log("Connected on port "+PORT); 
  this.conn = db; 
});
function getAllResponses(req,res){
var dbo = this.conn.db("heroku_92150sf3");
  //Find all documents in the customers collection:
  dbo.collection("test").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
}

app.get('/',(req,res)=>{
    res.json('Connected successfully');
})

app.get('/data', getAllResponses);

app.post('/', function (req, res) {
    // console.log(req.body);
    console.log(request);
    var intent = req.body.req1;
    console.log(intent);
    var dbo = this.conn.db("heroku_92150sf3");
    // Find all documents in the customers collection:
    console.log(intent);
    dbo.collection("test").find({
      intent: intent
    }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        console.log(result);
        console.log("Found");
        res.json("Found");
      } else {
        console.log("Not Found");
        var url = "https://www.google.co.in/search?q=" + intent + "&oq=" + intent;
        console.log(url);
        rp(url)
          .then(function (html) {
            console.log($('div > div > div > div > span', html).text());
            const info = $('div > div > div > div > span', html).text();
            const obj = {
              intent: intent,
              info: info
            };
            dbo.collection("test").insertOne(obj, function (err, res) {
              if (err) throw err;
              
            });
            res.json("Inserted");
          })
          .catch(function (err) {});
      }
    });
  
  
  
  })