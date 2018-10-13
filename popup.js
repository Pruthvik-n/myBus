  var busNames = {"green1" : "Green 1", "green2" : "Green 2", "gold1" : "Gold 1", "gold2" : "Gold 2"};

  window.onload = function(element) {
    chrome.storage.sync.get('options', function(data) {
      for(let route of Object.keys(data.options)){
        var routeParams = route.split('-');
        console.log(routeParams[0] + '  ' + routeParams[1] + '  ' + data.options[route]);
        getBusTimeLeft('fairfax',routeParams[0],data.options[route],routeParams[1]);
      }
    });	
  };

  var getBusTimeLeft = function(agency,bus,stop,direction){
  	var req = new XMLHttpRequest();
    console.log('http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a='+agency+'&r='+bus+'&s='+stop);
    req.open('GET', 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a='+agency+'&r='+bus+'&s='+stop);
    req.send();
    req.onload = function() {
      var result = JSON.parse(req.responseText);
        var p = document.createElement('p');
        p.append(document.createTextNode(busNames[bus] + ' ' + expandDirectionTag(direction) + ' : ' ));
      if(result.predictions.dirTitleBecauseNoPredictions == null){
        var prediction = result.predictions.direction.prediction;
        if(Array.isArray(prediction))
         p.append(prediction[0].minutes + ',' + prediction[1].minutes);
       else
         p.append(prediction.minutes);        
     }
     else{
        p.append('No bus at the moment');
     }
     document.getElementById('predictions').append(p);
   };
 }

 function expandDirectionTag(direction){
  return (direction === 'togm') ? 'to GMU' : 'to Metro';
}