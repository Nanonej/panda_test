"use strict"
var search = "";
var filters = {
	Assassin: true,
	Fighter: true,
	Mage: true,
	Support: true,
	Tank: true,
	Marksman: true,
}

function getData(file) {
	var filteredTags = [];
	for (var tag in filters) {
		if (filters[tag])
			filteredTags.push(tag);
	}
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4)
			if (rawFile.status === 200 || rawFile.status == 0) {
				var grid = document.getElementById('grid');
				grid.innerHTML = "";
				var lolData = JSON.parse(rawFile.responseText);

				lolData.champions.sort(function(a, b) {
					if(a.name < b.name) return -1;
				    if(a.name > b.name) return 1;
				    return 0;
				});

				for (var i = 0; i < lolData.champions.length; i++) {
					var show = false;
					for (var j = 0; j < lolData.champions[i].tags.length; j++)
						if (filteredTags.includes(lolData.champions[i].tags[j])) {
							show = true;
							break;
						}
					if (show && lolData.champions[i].name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
						var newDiv = document.createElement('div');
						newDiv.id = lolData.champions[i].id;
						newDiv.className = 'champCell';
						newDiv.innerHTML = '<img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + lolData.champions[i].key + '.png"></img>'
						newDiv.innerHTML += '<p>' + lolData.champions[i].name + '</p>';
						grid.appendChild(newDiv);
					}
				}
			}
	}
	rawFile.send(null);
}

var getDataFromJson = function() {
	getData('db/data.json');
}

window.onload = function() {
	getDataFromJson();
}
