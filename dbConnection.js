var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_92150sf3:c3bghg1817nkncmtbsafjpblje@ds237713.mlab.com:37713/heroku_92150sf3";
var mongoose = require('mongoose');
// MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, db) {
//     if (err) throw err;
//     else 
//     console.log("Connected"); 
//     // console.log(db);
//     module.exports = db;    
//   });
mongoose.connect(url, { useNewUrlParser: true });
module.exports = mongoose.connection;
// module.exports = conn