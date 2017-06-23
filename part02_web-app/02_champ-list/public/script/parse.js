"use strict"
function getData(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4)
			if (rawFile.status === 200 || rawFile.status == 0) {
				var lolData = JSON.parse(rawFile.responseText);

				lolData.champions.sort(function(a, b) {
					if(a.name < b.name) return -1;
				    if(a.name > b.name) return 1;
				    return 0;
				});

				for (var i = 0; i < lolData.champions.length; i++) {
					var newDiv = document.createElement('div');
					newDiv.id = lolData.champions[i].id;
					newDiv.className = 'champCell';
					newDiv.innerHTML = '<img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + lolData.champions[i].key + '.png"></img>'
					newDiv.innerHTML += '<p>' + lolData.champions[i].name + '</p>';
					document.getElementById('grid').appendChild(newDiv);
				}
			}
	}
	rawFile.send(null);
}
getData('db/data.json');
