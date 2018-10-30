const express = require('express')
const userRouter = require('./routes/userRouter');
const testsRouter = require('./routes/testsRouter')
const dialogFlowRouter = require('./routes/dialogFlowRouter')

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.port || 8100;
app.listen(port, () => {
    console.log('Server running at port '+port);
})

app.get('/',function(req,res){
    res.json('Connected to heroku');
})

app.use('/user', userRouter);
app.use('/tests', testsRouter);
app.use('/dialogflow', dialogFlowRouter);
