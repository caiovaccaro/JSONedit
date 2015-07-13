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
  fs.readFile(__dirname + '/public/data.json', 'utf8', function(err, data) {
    res.render('index', { jsonContent: JSON.parse(data) });
  });
});

app.post('/', function (req, res) {
  fs.writeFile(__dirname + '/public/data.json', JSON.stringify(JSON.parse(req.body.jsonFile), null, 4), function(err) {
    if(err) {
      console.log('Could not save file.', err);
    } else {
      console.log('File saved: /public/data.json');
    }
  });
});

module.exports = app;
