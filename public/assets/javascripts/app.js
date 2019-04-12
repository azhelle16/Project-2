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

var userTeamId;
var levelNum;
var levelPara;
var catLabel;
var catRadio;

$(document).ready(function() {
 
  $("#teamSelect").submit(function(e) {

    e.preventDefault();
    
    //will be used for team_id in users table
    userTeamId = $("input[name='teamName']:checked").val();

  });

});

$(document).on("click", 'button', function() {

  switch ($(this).text().toLowerCase()) {

    case "sign-up":
      var isOK = validateData();
      if (isOK) {
        loginSignUp(0)
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
			  .attr("id", catNum) //not unique id. have to work on this
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
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
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
    break;
  }

  $.ajax({
    url: url,
    method: 'POST',
    data: {name : user, password : pass}
  }).then(function(c) {

      switch (flag) {
        case 0:
          if ('error' in c) {
            alertMsg("ERROR: "+c.error.code+" ("+c.error.sqlMessage+")")
          } else {
              alertMsg("Account Successfully Created!!!")
              clearData
            }
        break;
      }



  });

}