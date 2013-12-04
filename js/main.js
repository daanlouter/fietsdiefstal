$(document).ready(function(){


$('#straatForm').on("submit", function(){
	event.preventDefault();
	console.log('hoi');
	var straatNaam = $('.streetField').val();
	var incidentenRotterdam = [];
	var incidentenStraat = [];
	console.log(straatNaam);
	console.log()
	$.getJSON( "js/data.json", function( data ) {
		var totalLength = data.length;
		

		$.each(data, function(i,a){
			if(a.Plaats == "ROTTERDAM"){
				incidentenRotterdam.push(a);
			}
			
			if(a.Straat == straatNaam.toUpperCase()){

				incidentenStraat.push(a);
			}
		});
		var rotterdamLength = incidentenRotterdam.length;

		var percentage = Math.round((rotterdamLength/totalLength)*100);

		$('.wrapper').html('<p>' +totalLength+ ' diefstallen in totaal</p>');
		$('.wrapper').append('<p>' +rotterdamLength+ ' diefstallen in Rotterdam</p>');
		$('.wrapper').append('<p>' +percentage+ ' % in Rotterdam</p>');
		$('.wrapper').append('<p>' +incidentenStraat.length+ ' diefstallen in ' +straatNaam+ '</p>');
		console.log(data[0], totalLength,rotterdamLength)
	});
});
});