var express = require('express');
var app = express();
var path = require("path");
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("public"));

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quiz_app'
});

connection.connect();

app.get('/teams', function(req, res) {
  connection.query('SELECT * FROM teams', function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.get('/levels', function(req, res) {
  connection.query('SELECT * FROM levels', function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.get('/categories', function(req, res) {
  connection.query('SELECT * FROM categories', function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.get('/questions', function(req, res) {
  connection.query('SELECT * FROM questions', function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.get('/answers', function(req, res) {
  connection.query('SELECT * FROM answers', function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.listen(3001, function() {
  console.log('listening on 3001');
});
