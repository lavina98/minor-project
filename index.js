var express = require('express');
var app = express();
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

