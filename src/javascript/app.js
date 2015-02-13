console.log('app -- begin');

var lat = "41.385064";
var lng = "2.173403";
var latlng = lat+","+lng;

var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng+"&sensor=true_or_false";
var xhr = new XMLHttpRequest();

Tinder.ajax = function(url, callback){
	xhr.open("POST", url);  
	xhr.send(); 
	xhr.onload = function() {
	  var response = JSON.parse(this.responseText);
	  console.log(response);
	}
}




// function spotifySearch(name,type,reply){

//   var options = {
//       hostname: 'api.spotify.com',
//       path: '/v1/search?q='+name+'&type='+type,
//       method: 'GET'
//   }

//   var result = "";

//   var req = http.request(options, function(response) {
//       response.setEncoding('utf8');
//       response.on("data", function(chunk) {
//           result += chunk;
//       });
//       response.on("end", function() {
//           reply(JSON.parse(result));
//       });
//   });

//   req.on('error', function(e) {
//     console.log('problem with request: ' + e.message);
//   });

//   req.end();
// }
