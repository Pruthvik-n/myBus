getDropDownForRoute('gold1');
getDropDownForRoute('gold2');
getDropDownForRoute('green1');
getDropDownForRoute('green2');

let submitButton = document.getElementById('selectRoutes');
let resetButton = document.getElementById('clearRoutes');

submitButton.onclick = function(){
	var selects = document.getElementsByTagName('select');
	var setOptions = {};
	for(let selectTag of selects){
		var selected = document.getElementById(selectTag.id+'-selected');
		if(selectTag.value !== ''){
			setOptions[selectTag.id] = selectTag.value;
			selected.innerHTML = selectTag.value;
		}
	}
	chrome.storage.sync.set({'options' : setOptions}, function(){
		console.log(setOptions);
	});
}

resetButton.onclick = function(){
	var selects = document.getElementsByTagName('select');

	for(let selectTag of selects){
		var selected = document.getElementById(selectTag.id+'-selected');
		selectTag.value = '';
		selected.innerHTML = '';
	}
}

function getDropDownForRoute(route){
	var req = new XMLHttpRequest();
	req.open('GET','http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=fairfax&r='+route);
	req.onload = function(){
		var routeConfig = {};
		var result = JSON.parse(req.responseText);
		var routeDiv = document.getElementById(route);
		for(let stops of result.route.stop){
			routeConfig[stops.tag] = stops.title;
		}
		for(let dir of result.route.direction){
			var para = document.createElement('p').appendChild(document.createTextNode(dir.title));
			routeDiv.appendChild(para);
			routeDiv.appendChild(document.createElement('br'));
			var select = document.createElement('select');
			select.id = route+'-to'+dir.tag;
			var option = document.createElement('option');
			option.value = '';
			option.innerHTML = 'Select';
			select.appendChild(option);
			for(let stopName of dir.stop){
				var option = document.createElement('option');
				option.value = stopName.tag;
				option.innerHTML = routeConfig[stopName.tag];
				select.appendChild(option);
			}
			routeDiv.appendChild(select);
			routeDiv.appendChild(document.createElement('br'));
		}
	};
	req.send();
}