var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  console.log(req.originalUrl);
  fs.readFile(__dirname + '/public/data.json', 'utf8', function(err, data) {
    console.log(data);
    res.render('index', { jsonContent: JSON.parse(data) });
  });
});

module.exports = app;
