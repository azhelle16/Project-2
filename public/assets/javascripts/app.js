var userTeamId;
var levelNum;
var levelPara;
var catLabel;
var catRadio;

$("#teamSelect").submit(function(e) {

  e.preventDefault();

  //will be used for team_id in users table
  userTeamId = $("input[name='teamName']:checked").val();

});

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

function getCategories(lid) {

  $.ajax({
    url: "/categories",
    method: 'GET'
  }).then(function(c) {

    for (var i = 0; i < c.length; i++) {

			var catNum = "cat-"+c[i].id

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