var diefstalArray = [];
var totalLength;
var rotterdamLength;
var incidentenRotterdam = [];
var incidentenStraat = [];
var straatNaam;

function getDetailsPerTime(){
	var statDays = [];
	var statDayPart = [];
	var statTime = [];
	var statMonth = [];

	$.each(diefstalArray,function(i,j){
		var posStatDays = statDays.map(function(e) { return e.dag; }).indexOf(j["Begin dagsoort"]);

		if(posStatDays == -1){
			statDays.push({dag: j["Begin dagsoort"], aantal: 1 });
		}else{
			statDays[posStatDays].aantal = statDays[posStatDays].aantal + 1;
		}

		

	});
	console.log(statDays);
}

function getDetailsPerStreet(incidentenStraat){
	var lijstmetBuurten = [];
	var lijstmetTijden = [];	
	$('.buurtLijst').html("");

	$.each(incidentenStraat, function(i,j){
		var huidigDagdeel = j['Gemiddelde dagdeel (6 uren)'];
		var posBuurt = lijstmetBuurten.map(function(e) { return e.naam; }).indexOf(j.Buurt);
		var posTijden = lijstmetTijden.map(function(e) { return e.dagdeel; }).indexOf(huidigDagdeel);
		if(posBuurt == -1){
			lijstmetBuurten.push({naam: j.Buurt, aantal:1 });
		}else{
			lijstmetBuurten[posBuurt].aantal = lijstmetBuurten[posBuurt].aantal + 1;
		}

		if(posTijden == -1){
			lijstmetTijden.push({dagdeel: huidigDagdeel, aantal:1 });
		}else{
			lijstmetTijden[posTijden].aantal = lijstmetTijden[posTijden].aantal + 1;
		}
		
	});

	$.each(lijstmetBuurten, function(index, val) {
		$('.buurtLijst').append("<li>" + val.naam + ": " + val.aantal + "</li>");
	});

	$.each(lijstmetTijden, function(index, val) {
		if(val.dagdeel === "06:00-11:59"){
			$('.ochtend .bar .inner').css('height', Math.round((val.aantal/incidentenStraat.length)*100)+"%")
		} else if(val.dagdeel === "12:00-17:59"){
			$('.middag .bar .inner').css('height', Math.round((val.aantal/incidentenStraat.length)*100)+"%")
		} else if(val.dagdeel === "18:00-23:59"){
			$('.avond .bar .inner').css('height', Math.round((val.aantal/incidentenStraat.length)*100)+"%")
		} else if(val.dagdeel === "00:00-05:59"){
			$('.nacht .bar .inner').css('height', Math.round((val.aantal/incidentenStraat.length)*100)+"%")
		}
	});
	
}



$(document).ready(function(){
	$.getJSON( "js/data.json", function( data ) {
		$.each(data, function(i,j){
			if(j.Buurt != ""){
			diefstalArray.push(j);
			if(j.Plaats == "ROTTERDAM"){
				incidentenRotterdam.push(j);
			}
		}
		});
		totalLength = diefstalArray.length;
		rotterdamLength = incidentenRotterdam.length;
		getDetailsPerTime(diefstalArray);
	});
	
});

$('#straatForm').on("submit", function(){
	var incidentenStraat = [];
	event.preventDefault();
	straatNaam = $('.streetField').val();
	console.log(diefstalArray[0])
	$.each(diefstalArray, function(i,a){
		if(a.Straat == straatNaam.toUpperCase()){
			incidentenStraat.push(a);
		}
	});

	$('.wrapper').html('<p>' +totalLength+ ' diefstallen in totaal</p>');
	$('.wrapper').append('<p>' +rotterdamLength+ ' diefstallen in Rotterdam</p>');
	$('.wrapper').append('<p>' +incidentenStraat.length+ ' diefstallen in ' +straatNaam+ '</p>');
	getDetailsPerStreet(incidentenStraat);
});
