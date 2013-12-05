var diefstalArray = [];
var totalLength;
var rotterdamLength;
var incidentenRotterdam = [];
var incidentenStraat = [];
var straatNaam;

function getDetailsPerStreet(incidentenStraat){
	var lijstmetBuurten = [];
	var lijstmetTijden = [];
	console.log(incidentenStraat[0]);
	var x =0;

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

	$.each(lijstmetTijden, function(index, val) {
		 $('.wrapper').append('<p>Er zijn ' + val.aantal + ' diefstallen om ' + val.dagdeel + ' in de ' +straatNaam+ '</p>');
	});
	
	// $('.wrapper').append('<p>' +incidentenStraat.length+ ' diefstallen in ' +straatNaam+ '</p>');
}



$(document).ready(function(){
	$.getJSON( "js/data.json", function( data ) {
		$.each(data, function(i,j){
			diefstalArray.push(j);
			if(j.Plaats == "ROTTERDAM"){
				incidentenRotterdam.push(j);
			}
		});
		totalLength = diefstalArray.length;
		rotterdamLength = incidentenRotterdam.length;
	});
});

$('#straatForm').on("submit", function(){
	var incidentenStraat = [];
	event.preventDefault();
	straatNaam = $('.streetField').val();
	// straatNaam = "Heemraadssingel"
	$.each(diefstalArray, function(i,a){
		//tel incidenten in jouw straat
		if(a.Straat == straatNaam.toUpperCase()){
			incidentenStraat.push(a);
		}
	});

	
	$('.wrapper').html('<p>' +totalLength+ ' diefstallen in totaal</p>');
	$('.wrapper').append('<p>' +rotterdamLength+ ' diefstallen in Rotterdam</p>');
	$('.wrapper').append('<p>' +incidentenStraat.length+ ' diefstallen in ' +straatNaam+ '</p>');
	getDetailsPerStreet(incidentenStraat);
});
