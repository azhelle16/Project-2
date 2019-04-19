/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

/* GLOBAL VARIABLES */

//will be used for team_id in users table

var userTeamId;

//checked category's level
var selectedLevel;

//checked category value
var selectedCatValue;

//checked category element
var selectedCat;

//made levelNum for creating unique id
var levelNum;

//para for level names
var levelPara;

//label for category name
var catLabel;

//radio button for category
var catRadio;

//userId
var globalUserId;

//username
var globalName;

//game score of a user
var gameScore = 0;

//question ids array
var qArr = []

//indexes for the question array
var ind = 0

//seconds to be displayed
var secs = "10"

var rt

//number of questions showed
var qshowed = 0

var num

//team name
var teamName 

//user score
var globalScore

$(document).ready(function() {

  $(".fa-sign-out-alt, .logoutDropdown").on("click", function() {
      logout();
  })

  $("#teamSelect").on("click",function(e) {

    //will be used for team_id in users table
    userTeamId = $("input[name='teamName']:checked").val();

    console.log(userTeamId);

  });

  //button for clicking submit for answers
  $('#update_score').on("click",function(e) {
    console.log("hello")
    updateUserScore(globalUserId);

  });

});

$(document).on("click", 'button', function(e) {

  e.preventDefault()

  switch ($(this).text().toLowerCase()) {

    case "sign-up":
      var isOK = validateData();
      if (isOK) {
        var avail = checkAvailability() 

        if (avail) {
          getTeamId()
        } else {
            alertMsg("Username already taken")
            return
          }

      } else {
          return
        }
    break;
    case "login":
      userLogin()
    break;
    case "confirm":
      loginSignUp(0)
    break;
    case "yes":
      gameScore = 0;
      qArr = []
      ind = 0
      secs = "10"
      qshowed = 0
      $(".timer").addClass("dispHide")
      loadLevelsAndCategories();
    break;
    case "submit":
      e.preventDefault();

      //checked category value
      selectedCatValue = $("input[name='category']:checked").val();

      //checked category element
      selectedCat = $("input[name='category']:checked");

      //checked category's level
      selectedLevel = selectedCat[0].parentElement.id;

      //console.log(selectedLevel.split("level")[0]);
      // console.log(selectedCatValue);
      //console.log("here")
      getQuestions(selectedLevel.split("level")[0],selectedCatValue)
    break;
    case "no":
      $(".timer").addClass("dispHide")
      $("#levelContainer").empty().load("quizResults.html",function() {
        showResults(0)
      })
    break;
    default:
      return
    break;
  }

})

$(document).on("keypress",function(event){

  if (event.keyCode == 13)
    userLogin()
 
})

/*
 #######################################################################
 #
 #  FUNCTION NAME : getTeams
 #  AUTHOR        : Juthika Shetye
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : retrieves team information from the database
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function getTeams() {

  $.ajax({
    url: "/teams",
    method: 'GET'
  }).then(function(t) {

    for (var teamIndex in t) {

      //made var radioNum for creating unique id for input type radio
      var radioNum = "radio" + teamIndex;

      var teamLabel = $("<label>");
      var teamRadio = $("<input>");

      teamLabel.attr("for", t[teamIndex].id + radioNum)
        .attr("class", "tLabel")
        .html(t[teamIndex].team_name);

      teamRadio.attr("type", "radio")
        .attr("name", "teamName")
        .attr("id", t[teamIndex].id + radioNum) //unique id for radio
        .attr("class", "tRadio")
        .attr("value", t[teamIndex].id);

      $("#teamsDiv").append(teamRadio);
      $("#teamsDiv").append(teamLabel);

    }

  });

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getLevels
 #  AUTHOR        : Juthika Shetye
 #  DATE          : 
 #  MODIFIED BY   : Juthika Shetye
 #  REVISION DATE : April 11, 2019 PDT
 #  REVISION #    : 2
 #  DESCRIPTION   : retrieves level information from the database
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function getLevels() {

  $.ajax({
    url: "/levels",
    method: 'GET'
  }).then(function(l) {

    for (var levelIndex in l) {

      //made var levelNum for creating unique id
      levelNum = l[levelIndex].id + "level" + levelIndex

      levelPara = $("<p>");

      levelPara.html(`<strong>${l[levelIndex].level_name}</strong> <br>`)
        .attr("class", "levels")
        .attr("id", levelNum);

      $("#topicsDiv").append(levelPara);
      getCategories(levelNum);
    }
  
  });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getCategories
 #  AUTHOR        : Juthika Shetye
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 15, 2019 PDT
 #  REVISION #    : 4
 #  DESCRIPTION   : retrieves category information from the database
 #  PARAMETERS    : level id
 #
 #######################################################################
*/

function getCategories(lid) {

  $.ajax({
    url: "/categories",
    method: 'GET'
  }).then(function(c) {

    for (var i = 0; i < c.length; i++) {

      var catNum = lid+"cat-"+c[i].id

      catLabel = $("<label>");
      catRadio = $("<input>");

      catLabel.attr("for", catNum)
        .attr("class", "catLabel")
        .html(c[i].category_name);

      catRadio.attr("type", "radio")
        .attr("name", "category")
        .attr("id", catNum)
        .attr("class", "cat")
        .attr("value", c[i].id);

      $("#"+lid).append(catRadio);
      $("#"+lid).append(catLabel);
    
    }

  });

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : alertMsg
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 11, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : alerts error message
 #  PARAMETERS    : message
 #
 #######################################################################
*/

function alertMsg(msg) {

  $("#alertModal .modal-body").empty().append(msg)
  $("#alertModal").modal("show")

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateData
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 11, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : validates form
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function validateData() {

  var name = $("#username").val()
  var pass = $("#password").val()

  if (pass == "" || name == "") {
    alertMsg("Please fill required (*) fields.")
    return 0
  }

  return 1

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loginSignUp
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 11, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 17, 2019 PDT
 #  REVISION #    : 4
 #  DESCRIPTION   : logs or signs up the user based on the flag
 #  PARAMETERS    : flag for sign up or login
 #
 #######################################################################
*/

function loginSignUp(flag) {

  var user = $("#username").val()
  var pass = $("#password").val()

  switch (flag) {
    case 0:
      var url = "/sign-up"
      var team = $("input[name='teamName']:checked").val();
    break;
    case 1:
      var url = "/login"
      var team = ""
    break;
  }

  $.ajax({
    url: url,
    method: 'POST',
    data: {name : user, password : pass, team : team}
  }).then(function(c) {

      switch (flag) {
        case 0:
          if ('error' in c) {
            alertMsg("ERROR: "+c.error.code+" ("+c.error.sqlMessage+")")
          } else {
              alertMsg("Account Successfully Created!!!");
              globalUserId = c.id
              $("#username").val("")
              $("#password").val("")
              //functions to be executed after signUp/logIn 
              //are called inside testingFunctions
              testingFunctions();
            }
        break;
        case 1:
          if ('error' in c) {
            alertMsg("ERROR: "+c.error.code+" ("+c.error.sqlMessage+")")
          } else if ('message' in c) {
              alertMsg(c.message)
            } else {
                userTeamId = c.team_id
                globalName = c.username
                globalUserId = c.id
                globalScore = c.user_score
                teamName = c.team_name
                login()
              }
        break;
      }

  });

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : teamScore
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 12, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : displays all teams and their total scores
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function teamScore(){

  $.ajax({
    url: '/team-score',
    method: 'GET'
    
  }).then(function(sum){

    for (var i = 0; i < sum.length; i++) {
      console.log("Total score of " + sum[i].Team_Name +
                   " with ID " + sum[i].Team_Id + 
                   " is : " + sum[i].Team_Score);
    }
    
  });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : userRanks
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 13, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : returns all users' ranks
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function userRanks(){

  var userTable = $('<table>').addClass('table table-striped table-bordered');      
  var userThead = $('<thead>').addClass('thead-dark');  
  var userTr = $('<tr>');        
  var userThTeam = $('<th>').text('Player Name');  
  var userThScore = $('<th>').text('Score');
  var userThRank = $('<th>').text('Rank');

  userTr.append(userThTeam, userThScore, userThRank);
  userThead.append(userTr);             
  userTable.append(userThead);

  var userTbody = $('<tbody>');

  $.ajax({
    url: '/all-user-ranks',
    method: 'GET'
    
  }).then(function(ranks){

    for (var i = 0; i < ranks.length; i++) {
      console.log("Rank of " + ranks[i].username + " with ID " + 
              ranks[i].id + " and score " + ranks[i].user_score + 
                   " is : " + ranks[i].user_rank);

      var userTr = $('<tr>');
      var userTdTeam = $('<td>').text(ranks[i].username);
      var userTdScore = $('<td>').text(ranks[i].user_score);
      var userTdRank = $('<td>').text(ranks[i].user_rank);

      userTr.append(userTdTeam, userTdScore, userTdRank);
      userTbody.append(userTr);
      userTable.append(userTbody);
      $('#playerRanksDiv').append(userTable);
    }
    
  });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getCurrUserRank
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 13, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 18, 2019 PDT
 #  REVISION #    : 1
 #  DESCRIPTION   : returns rank of logged-in user
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getCurrUserRank(id){

  var rank

  $.ajax({
    url: '/user-rank/' + id,
    method: 'GET',
    async: false,
  }).done(function(r){

    //show this info in html after answering questions
    //console.log("Current User Rank " , r);
    // console.log("Current user " + r.name + " with ID " +
    //      r.id + " and score of " + r.user_score + " has rank " + r.user_rank);

      rank = r

  });

  return rank
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : currUserTeamRank
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 17, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : returns user's id and team's rank
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function currUserTeamRank(id){

  var trank;

  $.ajax({
    url: '/team-rank/' + id,
    method: 'GET',
    async: false,
  }).done(function(tr){

    //returns user's id and team's rank
    console.log(tr);
    
    trank = tr;

  });

  return trank;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : updateUserScore
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 16, 2019 PDT
 #  REVISION #    : 1
 #  DESCRIPTION   : Updates score of a user after answering questions
 #  PARAMETERS    : user id, callback
 #
 #######################################################################
*/

function updateUserScore(id,callback){

  //gameScore = 5; // temp no. 5, add logic to increase score

  //console.log(id+">><<<"+gameScore)

  $.ajax({
      url: '/score-update/' + id + '?_method=PUT',
      method: 'POST',
      data: {
        user_score : gameScore //variable for total score after answering questions
      },
      async: false
    }).done(function(message){
        if (callback != undefined)
          callback()
    });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : teamRanks
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 13, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : April 17, 2019 PDT
 #  REVISION #    : 1
 #  DESCRIPTION   : returns all teams' ranks and no. of players per team
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function teamRanks(){

  var table = $('<table>').addClass('table table-striped table-bordered');      
  var thead = $('<thead>').addClass('thead-dark');  
  var tr = $('<tr>');        
  var thTeam = $('<th>').text('Team Name');
  var thPlayers = $('<th>').text('Players');
  var thScore = $('<th>').text('Score');
  var thRank = $('<th>').text('Rank');

  tr.append(thTeam, thPlayers, thScore, thRank);
  thead.append(tr);             
  table.append(thead);

  var tbody = $('<tbody>');

  $.ajax({
    url: '/team-ranks',
    method: 'GET'
    
  }).then(function(t){

    for (var i = 0; i < t.length; i++) {
      console.log("Team Ranks " , t[i]);

      var tr = $('<tr>');
      var tdTeam = $('<td>').text(t[i].Team_Name);
      var tdPlayers = $('<td>').text(t[i].No_Of_Players);
      var tdScore = $('<td>').text(t[i].Team_Score);
      var tdRank = $('<td>').text(t[i].Team_Rank);

      tr.append(tdTeam, tdPlayers, tdScore, tdRank);
      tbody.append(tr);
      table.append(tbody);
      $('#teamRanksDiv').append(table);
    }
    
  });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : testingFunctions
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 13, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : call all functions to be executed 
          after signUp / logIn ajax call or after
          answering all questions
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function testingFunctions() {

  //fetching results.insertId / last inserted user_id
    console.log("User ID: " + globalUserId);

    //displays all teams and their total scores
    teamScore();

    //displays all users and their ranks 
    userRanks();

    // getCurrUserRank(globalUserId);

    teamRanks();

    currUserTeamRank(globalUserId);
}


/*
 #######################################################################
 #
 #  FUNCTION NAME : getTeamId
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 11, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 15, 2019 PDT
 #  REVISION #    : 1
 #  DESCRIPTION   : asks user to select a team
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function getTeamId() {

  getTeams();
  $("#teamModal").modal("show") 

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkAvailability
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 11, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : checks username availability 
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function checkAvailability() {

  var user = $("#username").val()
  var ret

  $.ajax({
    url: "/availability",
    method: 'POST',
    data: {name : user},
    async: false
  }).done(function(c) {
      
        if ('error' in c) {
          alertMsg("ERROR: "+c.error.code+" ("+c.error.sqlMessage+")")
        } else {
            ret =  c.availability
          }

  });

  return ret

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : login
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 14, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : redirects the user to the levels page
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function login() {

  $.ajax({
    url: "/redirect-login",
    method: 'GET',
  }).then(function(c) {
      window.location.href = c
  });

}


/*
 #######################################################################
 #
 #  FUNCTION NAME : getSessionInfo
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 14, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 18, 2019 PDT
 #  REVISION #    : 5
 #  DESCRIPTION   : retrieves user information
 #  PARAMETERS    : flag, callback
 #
 #######################################################################
*/

function getSessionInfo(flag,callback) {

  $.ajax({
    url: "/get-session",
    method: 'GET',
    async: false
  }).done(function(c) {
      //console.log(c)
      globalUserId = c[1]
      globalName = c[0]
      userTeamId = c[2]
      teamName = c[3]
      globalScore = c[4]

      switch (flag) {
        case 1: 
          if (globalUserId == null) {
            window.location.href="index.html"
          } else {
              //$("#currUser").empty().append(globalName);
              $(".usernameDropdown").text(globalName)
              var x = getCurrUserRank(globalUserId)
              $(".rankDropdown").text(x.user_rank)
              var y = currUserTeamRank(globalUserId)
              $(".teamRankDropdown").text(y.Team_Rank)
              $(".teamDropdown").text(teamName)
              if (callback != undefined)
                callback()
            }
        break;
        case 2:
          if (globalUserId == null) {
            //window.location.href="index.html"
          } else {
              //$("#currUser").empty().append(globalName);
              window.location.href="main.html"
              if (callback != undefined)
                callback()
            }
        break;
      }

  });

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadLevelsAndCategories
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 15, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : loads levels and category page
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function loadLevelsAndCategories() {

  $("#levelContainer").empty().load("levels.html", function() {
    getLevels();
  })

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : logout
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 15, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : logouts user and destroy session
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function logout() {

  globalName = ""
  globalUserId = ""
  userTeamId = ""

  $.ajax({
    url: "/logout",
    method: 'GET',
  }).then(function(c) {
      window.location.href = c
  });

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getQuestions
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 15, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 17, 2019 PDT
 #  REVISION #    : 2
 #  DESCRIPTION   : gets the questions and answers from the database
 #  PARAMETERS    : level id, category id
 #
 #######################################################################
*/

function getQuestions(lid, cid) {

  $.ajax({
    url: "/questions",
    method: 'POST',
    data: {cat_id : cid, level_id : lid},
  }).then(function(c) {
      $(".timer").css("visibility","visible").removeClass("dispHide")
      createQuestions(c, function() {
          showQuestions(startTimer, function() {
            initializeRadioButtons()
          })
      });
  });
  
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : createQuestions
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : creates the questions elements
 #  PARAMETERS    : json data, callback function
 #
 #######################################################################
*/

function createQuestions(data,callback) {

  $("#levelContainer").load("questions.html", function() {

    $("#qContainer").empty();

    for (var x = 0; x < data.length; x++) {
      // console.log(data[x].aid)
      // console.log(data[x].options)
      // console.log(data[x].qid)
      // console.log(data[x].question)
      // console.log(data[x].sid)
      qArr.push(data[x].qid)
      var div1 = $("<div>")
      div1.attr("id","q"+data[x].qid)
      div1.attr("class","dispHide divqs")
      var h1 = $("<h1>")
      h1.attr("class","qText")
      h1.text("Question "+(x+1))
      var p = $("<p>")
      p.attr("class","questionText")
      p.text(data[x].question)
      var div2 = $("<div>")
      div2.attr("data-answer",data[x].sid)
      for (var y = 0; y < data[x].options.length; y++) {
        var oid = "option-"+data[x].aid[y]
        var optLabel = $("<label>");
        var optRadio = $("<input>");
        var optDiv = $("<div>");

        optLabel.attr("for", oid)
          .attr("class", "optLabel")
          .html(data[x].options[y]);

        optRadio.attr("type", "radio")
          .attr("name", "options-"+(x+1))
          .attr("id", oid)
          .attr("value", data[x].aid[y])

        if (data[x].aid[y] == data[x].sid) {
          optRadio.attr("class","opt correct cbut")
        } else {
            optRadio.attr("class","opt cbut")
          }
        optDiv.append(optRadio)
        optDiv.append(optLabel)
        div2.append(optDiv)
        // div2.append(optRadio)
        // div2.append(optLabel)
      }
      div1.append(h1)
      div1.append(p)
      div1.append(div2)
      $("#qContainer").append(div1)
      // console.log(x)
    }
  
    callback();

  })

  
  

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : showQuestions
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : shows the questions
 #  PARAMETERS    : json data
 #
 #######################################################################
*/

function showQuestions(callback,cb) {

  //console.log("CURR SCORE: "+gameScore)
  num = qArr[ind]
  qshowed++
  ind++

  // console.log("NUM: "+num)
  // console.log("INDEX: "+ind)
  // console.log("qArr: "+qArr)

  $(".divqs").each(function() {
    if ($(this).attr("id") == "q"+num) {
      $(this).removeClass("dispHide")
    } else {
        $(this).addClass("dispHide")
      }
  })

  if (callback != undefined) { 
    callback()
  }

  if (cb != undefined) {
    cb()
  }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : startTimer
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : triggers to run the timer
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function startTimer() {

  runTimer()
  rt = setInterval(runTimer,1000)

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : runTimer
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : timer countdown
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function runTimer() {

  $("#countdown").empty();

  var s = parseInt(secs) - 1
  var secArr = secs.split("")

  for (var j = 0; j < secArr.length; j++) {
    var im = ""
    if (secArr.length > 1) {
      im = secArr[j]
    } else {
      im = "0"+secArr[j]
      }
    $("#countdown").append(im)  
  }

  if (s < 0) {
    $("#wrongAudio").trigger("play");
    checkAnswers("")
  } else {
     if (s < 5){
       $("#timerAudio").trigger("play");
     }
     secs = ""+s 
    }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkAnswers
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 18, 2019 PDT
 #  REVISION #    : 2
 #  DESCRIPTION   : check if the selected answer is correct or wrong
 #  PARAMETERS    : radio button
 #
 #######################################################################
*/

function checkAnswers(obj) {

  var levObj = selectedLevel.split("level")[0]
  clearInterval(rt)
  if (obj != "") {
    if ($(obj).hasClass("correct")) {
      $(obj).next().addClass("correct_answer")
      
      switch (levObj) {
        case "1": var rand = Math.ceil(Math.random() * (5 - 1) + 1); break;
        case "2": var rand = Math.ceil(Math.random() * (10 - 5) + 5); break;
      }
      //console.log(rand+">>><<<"+levObj)
      $("#correctAudio").trigger("play");
      gameScore += rand
      // console.log(gameScore)
    } else {
        $(obj).next().addClass("wrong_answer")
        var a = $(obj)[0].parentElement.dataset.answer
        // console.log(a)
        $("#option-"+a).next().addClass("correct_answer")
        $("#wrongAudio").trigger("play");
      }
  } else {
      var b = $("#q"+num)[0].children[2].dataset.answer
      $("#option-"+b).next().addClass("correct_answer")
    }

  if (qshowed == qArr.length) {
    clearInterval(rt)
    updateUserScore(globalUserId,function(){
      showResults(1);
    })
  } else {
      secs = "10"
      setTimeout(function() {
        startTimer()
        showQuestions()
        //$("#countdown").empty().append(secs)
      },1000)
      
    }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : initializeRadioButtons
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : initialize onclick functionality of the radiobuttons
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function initializeRadioButtons() {

  $(".cbut").on("click",function() {
    checkAnswers($(this))
  })

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : showResults
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 16, 2019 PDT
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 18, 2019 PDT
 #  REVISION #    : 1
 #  DESCRIPTION   : initialize onclick functionality of the radiobuttons
 #  PARAMETERS    : flag
 #
 #######################################################################
*/

function showResults(flag) {

  $(".uscore").text(gameScore)
  //console.log(getCurrUserRank(globalUserId))
  var b = getCurrUserRank(globalUserId)
  $(".urank").text(b.user_rank)
  var y = currUserTeamRank(globalUserId)
  $(".teamRankDropdown").text(y.Team_Rank)
  $(".trank").text(y.Team_Rank)
  if (flag == 1)
    $("#resultsModal").modal("show")
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : userLogin
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 17, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : checks data and allows the user to login
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function userLogin() {

  var isOK = validateData();
  if (isOK) {
    var avail = checkAvailability() 

    if (avail == 0) {
      loginSignUp(1)
    } else {
        alertMsg("Username does not exist")
        return
      }
  } else {
      return
    }

}
