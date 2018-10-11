  window.onload = function(element) {
  	getBusTimeLeft('fairfax','gold1','gmu');
  	getBusTimeLeft('fairfax','gold2','jercav');  	
  };

  var getBusTimeLeft = function(area,bus,stop){
  	var req = new XMLHttpRequest();
  	req.open('GET', 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a='+area+'&r='+bus+'&s='+stop);
  	req.send();
  	req.onload = function() {
  		var result = JSON.parse(req.responseText);
  		var prediction = result.predictions.direction.prediction;
  		var doc = document.getElementById(bus);
  		if(Array.isArray(prediction))
  			doc.append(prediction[0].minutes + ',' + prediction[1].minutes);
  		else
  			doc.append(prediction.minutes);
  	};
  }