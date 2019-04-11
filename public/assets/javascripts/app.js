var userTeamId;

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
	            .attr("id", t[teamIndex].id + radioNum)//unique id for radio
	            .attr("class", "tRadio")
	            .attr("value", t[teamIndex].id);

      $("#teamsDiv").append(teamRadio);
      $("#teamsDiv").append(teamLabel);

    }

  });

}