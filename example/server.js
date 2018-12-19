// Config
var PORT = 8081;
var express = require('express');
var app = express();
var path = require("path");

/* Application */

// Static files
app.use('/', express.static(__dirname + '/'));

// Start
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);