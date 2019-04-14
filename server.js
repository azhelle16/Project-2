var express = require('express');
var app = express();
var path = require("path");
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var md5 = require("md5")
var cparser = require("cookie-parser");
var session = require("express-session");

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365 }}));

app.use(cparser());

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
    else res.json({id : results.insertId.toString()});
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

app.post('/login', function(req, res) {
  var pass = md5(req.body.password)
  connection.query('SELECT * FROM users WHERE username=? AND password=?', [req.body.name, pass],  function(error, results, fields) {
    if (error) res.send({error : error})
    // else res.json({id : results.insertId});
    else if (results.length == 0) {
        res.json({message: "Username and Password doesn't match!"})
    } else {
        req.session.uname = req.body.name
        req.session.uid = results[0].id
        req.session.tid = results[0].team_id
        res.json(results);
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

//gets all users and their ranks with same rank for tied scores
app.get('/all-user-ranks', function(req, res) {

  const allRanks = `SELECT users.id, users.username, scores.score,
                    DENSE_RANK() OVER (
                      ORDER BY score DESC
                    ) user_rank
                    FROM scores
                    LEFT JOIN users
                    ON scores.user_id = users.id`

  connection.query(allRanks,function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

//gets current user's rank
app.get('/user-rank/:user_id',function(req, res) {

  const userRank = `SELECT id,name,score,user_rank 
                    FROM (
                    SELECT users.id id, users.username name , scores.score score,
                    DENSE_RANK() OVER (
                    ORDER BY score DESC
                    ) user_rank
                    FROM scores
                    LEFT JOIN users
                    ON scores.user_id = users.id
                    ) rankingTable 
                    WHERE id = ?`

  connection.query(userRank,[req.params.user_id],function(error, results, fields) {
    if (error) res.send(error)
    else res.send(results[0]);
  });
});

//displays teams rankwise
app.get('/team-ranks', function(req, res) {

  const teamRanks =`SELECT DENSE_RANK() OVER (
                    ORDER BY SUM(scores.score) DESC
                    ) Team_Rank,
                    teams.team_name AS Team_Name, 
                    teams.id AS Team_ID, 
                    SUM(scores.score) AS Team_Score
                    FROM scores
                    LEFT JOIN users
                    ON scores.user_id = users.id
                    LEFT JOIN teams
                    ON users.team_id = teams.id
                    GROUP BY users.team_id
                    ORDER BY SUM(scores.score) DESC`

  connection.query(teamRanks,function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

//gets all teams' scores
app.get('/team-score', function(req, res) {

  const q =`SELECT users.team_id AS Team_Id, 
            teams.team_name AS Team_Name, 
            SUM(scores.score) AS Team_Score
            FROM scores
            LEFT JOIN users
            ON scores.user_id = users.id
            LEFT JOIN teams
            ON users.team_id = teams.id
            GROUP BY users.team_id
            ORDER BY SUM(scores.score) DESC`;

  connection.query(q,function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.get('/redirect-login', function(req, res) {
  res.send("levels.html")
});

app.get('/get-session', function(req, res) {
  res.send([req.session.uname,req.session.uid,req.session.tid])
});

app.listen(3001, function() {
  console.log('listening on 3001');
});
