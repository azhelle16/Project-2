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

$(document).ready(function() {

	$("#teamSelect").on("click",function(e) {

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

	  console.log(selectedLevel);
	  console.log(selectedCatValue);

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
        loginSignUp(1)
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
 #  MODIFIED BY   : Juthika Shetye
 #  REVISION DATE : April 11, 2019 PDT
 #  REVISION #    : 2
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
 #  REVISION DATE : April 12, 2019 PDT
 #  REVISION #    : 1
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

              //fetching results.insertId from the response 'c'
              console.log("User ID: " + c.id);

              //passing results.insertId in insertScore Function
              insertScore(c.id);

              teamScore(); //calling this function for testing
                            //to be moved after questions are answered
            }
        break;
        case 1:
          if ('error' in c) {
            alertMsg("ERROR: "+c.error.code+" ("+c.error.sqlMessage+")")
          } else {
              login()
            }
        break;
      }

  });

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : insertScore
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 12, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : inserts total score in database & fetches user_id from parameter
 #  PARAMETERS    : user_id
 #
 #######################################################################
*/

function insertScore(id){

	$.ajax({
		url: '/scores-insert/' + id,
		method: 'POST',
		data: {	
				score : 0 //add logic for updating score
				}
	}).then(function(message){

		console.log("User Id " + id + " added in scores table");

	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : totalScore
 #  AUTHOR        : Juthika Shetye
 #  DATE          : April 12, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : calculates sum of scores for a particular team
 #  PARAMETERS    : team_id
 #
 #######################################################################
*/

function teamScore(){

  $.ajax({
    url: '/team-score',
    method: 'GET',
    
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