var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(80, function () {
	console.log('Server started at http://localhost:80/');
});

module.exports = app;