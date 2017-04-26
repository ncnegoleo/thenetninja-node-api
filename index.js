const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./routes/api');

// set up express app
const app = express();
app.use(bodyParser.json());
app.use('/api', router);

// error handling middleware
app.use(function (err, req, res, next) {
   res.status(422).send({error: err.message})
});

app.use(express.static('public'));

// connect to the mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// def port
const PORT = process.env.port || 4000;


// listen for requests
app.listen(PORT, function () {
   console.log(`now listen for requests in port: ${PORT}`);
});
