var userTeam;

$("#teamSelect").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.
    userTeam = $("#teamsDiv button").val();

});

function getTeams() {

	$.ajax({
		url: "/teams",
		method: 'GET'
	}).then(function(t){

		for (var teamIndex in t){
			
			var teamButton = $("<button>");
			
			teamButton.html(`${t[teamIndex].team_name}`)
			.attr("value", t[teamIndex].id);

			$("#teamsDiv").append(teamButton);

		}

	});

}
