var express = require('express');
var router = express.Router();
var tests = require('../models/test');

router.get('/', function(req, res){
  console.log(req.header);  
});

router.post('/submit', function(req, res){
  console.log('Submit tests');
  console.log(req.body);
  tests.submitTest(req.body).then(
    function(status) {
      

    }
  )
  res.json('Submit called');
})

module.exports = router;