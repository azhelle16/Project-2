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

$(document).ready(function() {

	$("#teamSelect").submit(function(e) {

		e.preventDefault();

		//will be used for team_id in users table
		userTeamId = $("input[name='teamName']:checked").val();

	});

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
			$("#teamsDiv").append("&nbsp;&nbsp;");
			$("#teamsDiv").append(teamLabel);
			$("#teamsDiv").append("&nbsp;&nbsp;");

		}

	});

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getLevels
 #  AUTHOR        : Juthika Shetye
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : April 11, 2019 PDT
 #  REVISION #    : 1
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
			levelNum = "level-" + l[levelIndex].id;

			levelPara = $("<p>");

			levelPara.html(`<strong>${l[levelIndex].id}. ${l[levelIndex].level_name}</strong> <br>`)
			.attr("class", "levels")
			.attr("id", levelNum);

			// getCategories();

			$("#topicsDiv").append(levelPara);
			getCategories(l[levelIndex].id)

		}
		//getCategories();
	});
}

function getCategories2() {

	$.ajax({
		url: "/categories",
		method: 'GET'
	}).then(function(c) {

		console.log("categories: "+JSON.stringify(c))
		for (var i = 0; i < c.length; i++) {

			var catNum = "cat" + i;

			var catLabel = $("<label>");
			var catRadio = $("<input>");

			catLabel.attr("for", catNum)
			.attr("class", "catLabel")
			.html(c[i].category_name);

			catRadio.attr("type", "radio")
			.attr("name", "category")
			.attr("id", catNum) //not unique id. have to work on this
			.attr("class", "cat")
			.attr("value", c[i].id);

			$("p").eq(0).append(catRadio[0]);
			$("p").eq(0).append(catLabel[0]);
			$("p").eq(0).append(catRadio[1]);
			$("p").eq(0).append(catLabel[1]);

			// levelPara.append(catRadio);
			// levelPara.append(catLabel);


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

			$("p").eq(1).append(catRadio[0]);
			$("p").eq(1).append(catLabel[0]);
			$("p").eq(1).append(catRadio[1]);
			$("p").eq(1).append(catLabel[1]);

			// levelPara.append(catRadio);
			// levelPara.append(catLabel);
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
 #  REVISION DATE : April 11, 2019 PDT
 #  REVISION #    : 1
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

			var catNum = "cat-"+c[i].id

			var catLabel = $("<label>");
			var catRadio = $("<input>");

			catLabel.attr("for", catNum)
			  .attr("class", "catLabel")
			  .html(c[i].category_name);

			catRadio.attr("type", "radio")
			  .attr("name", "category")
			  .attr("id", catNum) //not unique id. have to work on this
			  .attr("class", "cat")
			  .attr("value", c[i].id);

			$("#level-"+lid).append(catRadio)
			$("#teamsDiv").append("&nbsp;&nbsp;");
			$("#level-"+lid).append(catLabel)
			$("#teamsDiv").append("&nbsp;&nbsp;");

		}

	});

}