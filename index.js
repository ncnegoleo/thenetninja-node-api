const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');

// set up express app
const app = express();
app.use(bodyParser.json());
app.use('/api', router);

// def port
const PORT = process.env.port || 4000;


// listen for requests
app.listen(PORT, function () {
   console.log(`now listen for requests in port: ${PORT}`);
});
