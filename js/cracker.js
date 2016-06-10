/* ----------------------------------------------------------------------

* File name:		cracker.js
* Version:			1.0
* Description:	randomly show christmas cracker jokes
* Website: 			www.rayhyde.nl
* Version:			27-11-2015
* Author:				Ray Hyde - www.rayhyde.nl

---------------------------------------------------------------------- */


(function() {

	// set some initial vars
	var qty, data, rand, $slip = $('#slip');
	
	$(document).ready(function() {

		// create an audio html tag for the cheezy rimshot
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', 'sounds/rimshot.mp3');
	
		// load the file with all the jokes
		$.getJSON('data/jokes.json', function(data) {
			qty = data.length;
			
			// here the joke is randomly selected
			function generateJoke() {
				rand = Math.floor(Math.random() * qty) + 1;
				$slip.find('.q').html( data[rand].q);
				$slip.find('.a').html( data[rand].a);
			}			
			
			generateJoke();

			// this happens when the "Tell me" button is clicked
			$('.huh').click(function() {
				$(this).hide();
				$slip.find('.a').add('.again').fadeIn();
				
				// include the sound effect
				if ( !$('#speaker').hasClass('soundoff') ) {
					audioElement.play();
				}					
			});
			
			// this happens when the new joke button is clicked
			$('.again').click(function(){
				$slip.addClass('spin-out-in');
				$slip.find('.a, .q').add('.again').hide();
				
				generateJoke();

				// let the joke spin back through CSS
				function removeSpin(){
					$slip.removeClass('spin-out-in');
					$slip.find('.huh, .q').show();
				};
				
				window.setTimeout( removeSpin, 2000 ); 
				
			});

		});
		
		// this happens when the sound on/off icon is clicked
		$('#speaker').click(function() {
			$(this).toggleClass('soundoff');
		});
		
	});
	
})();