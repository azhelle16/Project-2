require("dotenv").config();
//var keys = require("./keys")
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

app.use(session({
  secret: 'app',
  cookie: {
    maxAge: 1 * 1000 * 60 * 60 * 24 * 365
  }
}));

app.use(cparser());

var mysql = require('mysql');
var connection

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)

} else {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
}

//console.log(process.env.DB_HOST)

// var connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: 'quiz_app'
// });

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

app.get('/level-cats', function(req, res) {

  const lvlCat = `SELECT levels.id AS Level_Id,
                  GROUP_CONCAT(
                    CONCAT_WS(',',categories.id, categories.category_name)SEPARATOR '; '
                      ) AS Categories
                  FROM levels
                  LEFT JOIN category_levels
                  ON levels.id = category_levels.level_id
                  LEFT JOIN categories
                  ON category_levels.category_id = categories.id
                  GROUP BY levels.id`

  connection.query(lvlCat, function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

// app.get('/questions', function(req, res) {
//   connection.query('SELECT * FROM questions', function(error, results, fields) {
//     if (error) res.send(error)
//     else res.json(results);
//   });
// });

app.post('/questions', function(req, res) {
  connection.query('SELECT answers.question_id, questions.question, solutions.correct_ans_id, ' +
    'GROUP_CONCAT(answers.option_name ORDER BY answers.id SEPARATOR ", ") as options,' +
    ' GROUP_CONCAT(answers.id ORDER BY answers.id SEPARATOR ", ") as answer_id FROM answers ' +
    'LEFT JOIN questions on questions.id=answers.question_id LEFT JOIN solutions on solutions.question_id=questions.id' +
    ' WHERE category_levels_id IN (SELECT id FROM category_levels WHERE category_id=? AND level_id=?) GROUP BY answers.question_id,' +
    ' solutions.correct_ans_id;', [req.body.cat_id, req.body.level_id],
    function(error, results, fields) {
      if (error) res.send(error)
      else {
        var resArr = []
        for (var m = 0; m < results.length; m++) {
          var rJSON = {}
          rJSON["qid"] = results[m].question_id
          rJSON["question"] = results[m].question
          rJSON["sid"] = results[m].correct_ans_id
          rJSON["options"] = results[m].options.split(", ")
          rJSON["aid"] = results[m].answer_id.split(", ")
          resArr.push(rJSON)
        }
        res.json(resArr)
      };
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
  connection.query('INSERT INTO users (username, password, role, team_id, user_score) VALUES (?,?,?,?,?)', [req.body.name, pass, 0, req.body.team, 0], function(error, results, fields) {
    if (error) res.send({
      error: error
    })
    // else res.json({id : results.insertId});
    else res.json({
      id: results.insertId.toString()
    });
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
      res.json({
        availability: av
      })
    }
  });
});

app.put('/score-update/:id', function(req, res) {
  connection.query('UPDATE users SET user_score = user_score + ? WHERE id = ?', [req.body.user_score, req.params.id], function(error, results, fields) {

    if (error) res.send(error)
    else res.json(results);

  });
});

app.post('/login', function(req, res) {
  var pass = md5(req.body.password)
  connection.query('SELECT u.id, u.username, u.password, u.role, u.team_id, u.user_score, t.team_name FROM ' +
    'users u LEFT JOIN teams t ON u.team_id=t.id WHERE username=? AND password=?',
    [req.body.name, pass],
    function(error, results, fields) {
      if (error) res.send({
        error: error
      })
      // else res.json({id : results.insertId});
      else if (results.length == 0) {
        res.json({
          message: "Username and Password doesn't match!"
        })
      } else {
        req.session.uname = results[0].username
        req.session.uid = results[0].id
        req.session.tid = results[0].team_id
        req.session.tname = results[0].team_name
        req.session.uscore = results[0].user_score
        //console.log(results)
        res.json(results);
      }
    });
});

//gets all users and their ranks with same rank for tied scores
app.get('/all-user-ranks', function(req, res) {

  const allRanks = `SELECT id, username, user_score,
                    DENSE_RANK() OVER (
                      ORDER BY user_score DESC
                    ) user_rank
                    FROM users`

  connection.query(allRanks, function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

//gets current user's rank
app.get('/user-rank/:user_id', function(req, res) {

  const userRank = `SELECT id,name,score,user_rank 
                    FROM (
                    SELECT id, username name , user_score score,
                    DENSE_RANK() OVER (
                    ORDER BY user_score DESC
                    ) user_rank
                    FROM users
                    ) rankingTable 
                    WHERE id = ?`

  connection.query(userRank, [req.params.user_id], function(error, results, fields) {
    if (error) res.send(error)
    else res.send(results[0]);
  });
});

//displays teams rankwise and no. of players per team
app.get('/team-ranks', function(req, res) {

  const teamRanks = `SELECT DENSE_RANK() OVER (
                    ORDER BY SUM(user_score) DESC
                    ) Team_Rank,
                    teams.team_name AS Team_Name, 
                    teams.id AS Team_ID, 
                    SUM(user_score) AS Team_Score,
                    COUNT(users.team_id) AS No_Of_Players
                    FROM users
                    LEFT JOIN teams
                    ON users.team_id = teams.id
                    GROUP BY users.team_id
                    ORDER BY SUM(user_score) DESC`

  connection.query(teamRanks, function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

//gets current user's team's rank
app.get('/team-rank/:user_id', function(req, res) {

  const userTeamRank = `SELECT users.id , teamRanks.Team_Rank FROM users LEFT JOIN(
                        SELECT DENSE_RANK() OVER (
                          ORDER BY SUM(user_score) DESC
                          ) Team_Rank,
                        teams.team_name AS Team_Name, 
                        teams.id AS Team_ID
                        FROM users
                        LEFT JOIN teams
                        ON users.team_id = teams.id
                        GROUP BY users.team_id
                        ORDER BY SUM(user_score) DESC)teamRanks
                        ON users.team_id = teamRanks.Team_ID
                        WHERE users.id = ?`

  connection.query(userTeamRank, [req.params.user_id], function(error, results, fields) {
    if (error) res.send(error)
    else res.send(results[0]);
  });
});

//gets all teams' scores
app.get('/team-score', function(req, res) {

  const q = `SELECT users.team_id AS Team_Id, 
            teams.team_name AS Team_Name, 
            SUM(user_score) AS Team_Score
            FROM users
            LEFT JOIN teams
            ON users.team_id = teams.id
            GROUP BY users.team_id
            ORDER BY SUM(user_score) DESC`;

  connection.query(q, function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.get('/redirect-login', function(req, res) {
  res.send("main.html")
});

app.get('/get-session', function(req, res) {
  console.log(req.session.uname)
  res.send([req.session.uname, req.session.uid, req.session.tid, req.session.tname, req.session.uscore])
});

app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.send('index.html')
  })
})

app.listen(process.env.PORT || 3001, function() {
  console.log('listening on 3001');
});