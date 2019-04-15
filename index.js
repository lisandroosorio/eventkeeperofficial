var app = require('./server/server.js');
var mongoose = require('mongoose');

// set mongoURI
var mongoURI = process.env.MONGODB_URI || 'mongodb://heroku_tpw7f9x4:frrcd0rp8ke2ncsd7mtls7p42m@ds131676.mlab.com:31676/heroku_tpw7f9x4';

// connect db
mongoose.connect(mongoURI);

// set port
var port = process.env.PORT || 1337;

// listen on port
app.listen(port);

console.log("Server is listening on port " + port);