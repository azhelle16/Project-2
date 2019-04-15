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
var globalUserId

//username
var globalName

$(document).ready(function() {

<<<<<<< HEAD
  $(".fa-sign-out-alt").on("click", function() {
      logout();
  })

	$("#teamSelect").on("click",function(e) {
=======
  $("#teamSelect").on("click",function(e) {
>>>>>>> 438e91591246124b097b8c225800f4aa4428eb16

    //will be used for team_id in users table
    userTeamId = $("input[name='teamName']:checked").val();

    console.log(userTeamId);

  });


  $("#topicSelect").on("click",function(e) {

    e.preventDefault();

    //checked category value
    selectedCatValue = $("input[name='category']:checked").val();

    //checked category element
    selectedCat = $("input[name='category']:checked");

    //checked category's level
    selectedLevel = selectedCat[0].parentElement.id;

	  //console.log(selectedLevel.split("level")[0]);
	  // console.log(selectedCatValue);
    getQuestions(selectedLevel.split("level")[0],selectedCatValue)

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
    break;
    case "confirm":
      loginSignUp(0)
    break;
    default:
      return
    break;
  }

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
 #  REVISION DATE : April 14, 2019 PDT
 #  REVISION #    : 2
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
  var userThead = $('<thead>');  
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
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : returns rank of logged-in user
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getCurrUserRank(id){

  $.ajax({
    url: '/user-rank/' + id,
    method: 'GET'
  }).then(function(r){

    console.log("Current User Rank " , r);
    // console.log("Current user " + r.name + " with ID " +
    //      r.id + " and score of " + r.user_score + " has rank " + r.user_rank);

  });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : teamRanks
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 13, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : returns all teams' ranks
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function teamRanks(){

  var table = $('<table>').addClass('table table-striped table-bordered');      
  var thead = $('<thead>');  
  var tr = $('<tr>');        
  var thTeam = $('<th>').text('Team Name');  
  var thScore = $('<th>').text('Score');
  var thRank = $('<th>').text('Rank');

  tr.append(thTeam, thScore, thRank);
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
      var tdScore = $('<td>').text(t[i].Team_Score);
      var tdRank = $('<td>').text(t[i].Team_Rank);

      tr.append(tdTeam, tdScore, tdRank);
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

    getCurrUserRank(globalUserId);

    teamRanks();
}


/*
 #######################################################################
 #
 #  FUNCTION NAME : getTeamId
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : April 11, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : asks user to select a team
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function getTeamId() {

  $("#teamModal .modal-body").load("/teams.html",function() {
    $("#teamModal").modal("show")
  })

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
 #  REVISION DATE : April 15, 2019 PDT
 #  REVISION #    : 1
 #  DESCRIPTION   : retrieves user information
 #  PARAMETERS    : flag
 #
 #######################################################################
*/

function getSessionInfo(flag) {

  $.ajax({
    url: "/get-session",
    method: 'GET',
  }).then(function(c) {
      globalUserId = c[1]
      globalName = c[0]
      userTeamId = c[2]

      switch (flag) {
        case 1: $("#currUser").empty().append(globalName); break;
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

  $("#levelContainer").load("levels.html", function() {
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
      console.log(c)
      window.location.href = c
  });

}