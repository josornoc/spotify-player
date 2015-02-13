console.log('app -- begin');

var req = new XMLHttpRequest();
var playBtn = document.getElementsByClassName("btn-play")[0];
var audio = document.getElementById("audio");
var audioIsPlaying = false;

function spotifySongSearch(track, callback) {
  var url = "https://api.spotify.com/v1/search/?type=track&q=" + track;
  req.open("GET", url);  
  req.send(); 
  req.onload = function(event) {
    var response = JSON.parse(event.target.response);
    callback(response);
  };
}

function getSongById(id, callback){
	var url = "https://api.spotify.com/v1/tracks/" + id;
  req.open("GET", url);  
  req.send(); 
  req.onload = function(event) {
    var response = JSON.parse(event.target.response);
    callback(response);
  };
}

function getSongId(response){
	getSongById(response.tracks.items[0].id, songReceivedHandler);
}

function songReceivedHandler(songAnswered){
	playAudio(songAnswered);
}

function playAudio(song){
	document.getElementsByClassName("title")[0].innerHTML = song.name;
	document.getElementsByClassName("author")[0].innerHTML = song.artists[0].name;

	var img = document.getElementsByClassName('cover')[0].firstElementChild;
			img.src = song.album.images[0].url 

	audio.addEventListener("playing", playingHandler);
	audio.addEventListener("pause", pauseHandler);
	audio.addEventListener("timeupdate", timeUpdateHandler);
	
	audio.src = song.preview_url;
	playBtn.addEventListener("click", playClickHandler);
}

function timeUpdateHandler(event){

	//console.log( event.target.currentTime + '/' + event.target.duration );
	var per = (parseFloat(event.target.currentTime)/parseFloat(event.target.duration))*100;
	var fin = (per*30)/100;
	var seekBar = document.getElementsByClassName("seekbar")[0].firstElementChild;
			seekBar.value = parseInt(fin);
}

function pauseHandler(){
	audioIsPlaying = false;
}

function playingHandler(){
	audioIsPlaying = true;
}

function playClickHandler(){
	playBtn.removeEventListener("click");
	audio.play();
	playBtn.classList.toggle("disabled");
	playBtn.classList.toggle("playing");
	if(audioIsPlaying){
		audio.pause();
	}else{
		audio.play();
	}
}

spotifySongSearch( "run like hell", getSongId );


