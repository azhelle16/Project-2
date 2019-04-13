var express = require('express');
var app = express();
var path = require("path");
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var md5 = require("md5")

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended: false
}));

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

app.post('/sign-up', function(req, res) {
  var pass = md5(req.body.password)
  connection.query('INSERT INTO users (username, password, role, team_id) VALUES (?,?,?,?)', [req.body.name, pass, 0, req.body.team],  function(error, results, fields) {
    if (error) res.send({error : error})
    // else res.json({id : results.insertId});
    else res.send(results.insertId.toString());
  });
});

app.post('/availability', function(req, res) {
  //console.log("SELECT * FROM users WHERE username="+req.body.name)
  connection.query("SELECT * FROM users WHERE username=?", req.body.name, function(error, results, fields) {
    if (error) res.send(error)
    else {
      var av = 1
      //console.log(results)
      if (results.length > 0) {
        av = 0
      }
      res.json({ availability : av })
    }
  });
});

app.post('/scores-insert/:user_id', function(req, res){
  connection.query('INSERT INTO scores (user_id, score) VALUES (?,?)', 
  [req.params.user_id, req.body.score],function (error, results, fields) {
    if (error) res.send(error)
    else res.json({message: 'data added in scores table'});
  });
});

//this query might not be needed as there will be only one row per user
//total user score will be calculated in app.js
app.get('/scores-total/:user_id', function(req, res) {
  connection.query('SELECT SUM(score) AS Total_Score FROM scores WHERE user_id = ?',[req.params.user_id],function(error, results, fields) {
    if (error) res.send(error)
    else res.send(results[0]);
  });
});

app.get('/team-score', function(req, res) {

  const q =`SELECT users.team_id AS Team_Id, teams.team_name AS Team_Name, SUM(scores.score) AS Team_Score
            FROM scores
            LEFT JOIN users
            ON scores.user_id = users.id
            LEFT JOIN teams
            ON users.team_id = teams.id
            GROUP BY users.team_id
            ORDER BY SUM(scores.score) DESC;`;

  connection.query(q,function(error, results, fields) {
    if (error) res.send(error)
    else res.send(results);
  });
});

app.listen(3001, function() {
  console.log('listening on 3001');
});
