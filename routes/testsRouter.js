var express = require('express');
var router = express.Router();
var tests = require('../models/test');

router.post('/', function(req, res){
  console.log(req.header);  
  tests.getTest(req.body.subject).then(
    function(result){
      console.log(result);
      res.json(result);
    }
  )
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