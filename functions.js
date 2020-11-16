const MONTHS = {
	'01':	'Gennaio',
	'02':	'Febbraio',
	'03':	'Marzo',
	'04':	'Aprile',
	'05':	'Maggio',
	'06':	'Giugno',
	'07':	'Luglio',
	'08':	'Agosto',
	'09':	'Settembre',
	'10':	'Ottobre',
	'11':	'Novembre',
	'12':	'Dicembre',
}

var movieList = {
	"Anna": {
		"name": "Coco",
		"ID": "tt2380307"
	},
	"Pietro": {
		"name": "Ribelle: The Brave",
		"ID": "tt1217209"
	},
	"Paolo": {
		"name": "La carica dei 101",
		"ID": "tt0055254"
	},
	"Maddalena": {
		"name": "Pinocchio",
		"ID": "tt0032910"
	},
	"Rosa": {
		"name": "Frozen II",
		"ID": "tt4520988"
	},
	"Maria Elena": {
		"name": "Robin Hood",
		"ID": "tt0070608"
	},
	"Sara": {
		"name": "Alla ricerca di Dory",
		"ID": "tt2277860"
	},
	"Elena": {
		"name": "Gli Aristogatti",
		"ID": "tt0065421"
	},
}

function getRandomElement (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

function getNextSundayDate() {
	var ret = new Date();
	ret.setDate(ret.getDate() + (0 - 1 - ret.getDay() + 7) % 7 + 1);
	return ret;
}

function getFormattedDate(date){
	return "Prossima Movie Night: " + date.getDate() + " " + MONTHS[date.getMonth()];
}

function setMovieInfo(movieID){

	var fullURL = "http://www.omdbapi.com/?apikey=2f63eec3&i=" + movieID;

	$.ajax({
		async: false,
		type: 'GET',
		url: fullURL,
		success: function(ret) {
			console.log("Got info for "+ret["Title"]);
			$("#title_"+movieID).append("Anno: "+ret["Year"]+", Durata: "+ret["Runtime"]+"<br>Regista: "+ret["Director"]+"<br>Attori: "+ret["Actors"]);
			$("#poster_"+movieID).attr("src", ret["Poster"]);
		}
	});
}

$( document ).ready(function() {

	$("#next_date").html(getFormattedDate(getNextSundayDate()));

	$("#random_btn").on("click", function(){
		var random = getRandomElement(movieList);

		console.log(random);

		$("#"+random["ID"]).addClass("blink");
		$("#random_btn").prop("disabled", true);

		var elem = document.getElementById(random["ID"]);
  		elem.scrollIntoView();
	});

	for(var movie in movieList){
		var strToAppend = 
						"<li style='visibility:hidden;' class='media' id='"+movieList[movie]["ID"]+"'>"+
							"<img id='poster_"+movieList[movie]["ID"]+"' src='' class='mr-3 poster'>"+
							"<div id='title_"+movieList[movie]["ID"]+"' class='media-body'>"+
								"<h3 class='mt-0 mb-1'>\""+movieList[movie]["name"]+"\"</h3>"+
								"<h6>Proposto da "+movie+"</h6>"
							"</div>"+
						"</li>";

		$("#movie_list_container").append(strToAppend);
		
		setMovieInfo(movieList[movie]["ID"]);
	}
	$("li").css("visibility", "visible");
});