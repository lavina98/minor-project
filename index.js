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
MongoClient.connect(url, {
  useNewUrlParser: true
}, function (err, db) {
  if (err) throw err;
  else
    console.log("Connected on port " + PORT);
  this.conn = db;
});

function getAllResponses(req, res) {
  var dbo = this.conn.db("heroku_92150sf3");
  //Find all documents in the customers collection:
  dbo.collection("test").find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
}

app.get('/', (req, res) => {
  res.json('Connected successfully');
})

app.get('/data', getAllResponses);

app.post('/', function (req, res) {
  console.log(req.body);
  // var intent = req.body.req1;
  var queryVal = req.body.queryResult.parameters.Formulae;
  console.log("query value is" + queryVal);
  var dbo = this.conn.db("heroku_92150sf3");
  var ans = '';
  // Find all documents in the customers collection:
  dbo.collection("test").find({
    topic: queryVal
  }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      console.log(result);
      console.log("Found");
      ans = result[0].info;
      console.log('result is :' + ans);
      var obj = {
        fulfillmentText: ans,
        fulfillmentMessages: [{
          card: {
            title: "card title",
            subtitle: "card text",
            imageUri: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
            buttons: [{
              text: "button text",
              postback: "https://assistant.google.com/"
            }]
          }
        }],
        source: "example.com",
        payload: {
          google: {
            expectUserResponse: true,
            richResponse: {
              items: [{
                simpleResponse: {
                  textToSpeech: "this is a simple response"
                }
              }]
            }
          }
        }
      };
      res.json(obj);
    } else {
      console.log("Not Found");
      var url = "https://www.google.co.in/search?q=" + queryVal + "&oq=" + queryVal;
      rp(url)
        .then(function (html) {
          console.log($('div > div > div > div > span', html).text());
          const info = $('div > div > div > div > span', html).text();
          const obj = {
            topic: queryVal,
            info: info
          };
          ans = info;
          console.log('ans is  ' + ans);
          dbo.collection("test").insertOne(obj, function (err, res) {
            if (err) throw err;

          });
          var obj1 = {
            fulfillmentText: ans,
            fulfillmentMessages: [{
              card: {
                title: "card title",
                subtitle: "card text",
                imageUri: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                buttons: [{
                  text: "button text",
                  postback: "https://assistant.google.com/"
                }]
              }
            }],
            source: "example.com",
            payload: {
              google: {
                expectUserResponse: true,
                richResponse: {
                  items: [{
                    simpleResponse: {
                      textToSpeech: "this is a simple response"
                    }
                  }]
                }
              }
            }
          };
          res.json(obj1);
        }).catch(function (err) {});
    }
  })
});

app.get('/testing', function (req, res) {
  res.json("LUUUUUVINA IS THE BEST");
});


app.get('/test', function (req, res) {
  cosnole.log
});