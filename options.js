getDropDownForRoute('gold1');
getDropDownForRoute('gold2');
getDropDownForRoute('green1');
getDropDownForRoute('green2');

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
			select.id = dir.title;
			for(let stopName of dir.stop){
				var option = document.createElement('option');
				option.value = routeConfig[stopName.tag];
				option.innerHTML = routeConfig[stopName.tag];
				select.appendChild(option);
			}
			routeDiv.appendChild(select);
			routeDiv.appendChild(document.createElement('br'));
		}
	};
	req.send();
}