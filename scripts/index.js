$(document).ready(function(){
	var total, warning, elapsed, remaining;
	var $toggleCountUpCountDown = $("#toggleCountUpCountDown");
	var $customTimeSubmit		= $("#customTimeSubmit");
	var $buttonContainer		= $("#buttonContainer");
	var $customTime				= $("#customTime");
	var $pause					= $("#pauseButton");
	var $reset					= $("#resetButton");
	var $play					= $("#playButton");
	var $title					= $("title");
	var $time					= $("#time");
	var $body					= $("body");
	var existingTimer			= false;
	var customTimeValue			= 8;
	var customTime				= false;
	var paused					= true;
	var reset					= false;
	var minutes					= Math.floor(elapsed / 60);
	var seconds					= elapsed % 60;

	function start(){
		paused = false;
		if(customTime){
			total = customTimeValue;
			warning = 60;
		}else{
			total = 8 * 60;
			warning = 2 * 60;
		}
		elapsed = 0;
		remaining = total - elapsed;
		minutes = Math.floor(elapsed / 60);
		seconds = elapsed % 60;
		$('#time').text(minutes + ':' + pad(seconds, 2));
		timer();
	}

	function resetTimer(){
		if(!reset){
			elapsed = 0;
			remaining = total;
			minutes = Math.floor(elapsed / 60);
			seconds = elapsed % 60;
			paused = true;
			$time.text(minutes + ':' + pad(seconds, 2));
			$title.text(minutes + ':' + pad(seconds, 2));
			reset = false;
			existingTimer = false;
			$body.removeClass('warning');
		}else{}
	}

	function timer(){
		setTimeout(function(){
			if(paused){return;}
			elapsed++;
			remaining = total - elapsed;
			if($toggleCountUpCountDown.hasClass('btn-warning')){
				minutes = Math.floor(remaining / 60);
				seconds = remaining % 60;
				$time.text(minutes + ':' + pad(seconds, 2));
				$title.text(minutes + ':' + pad(seconds, 2));
			}else{
				minutes = Math.floor(elapsed / 60);
				seconds = elapsed % 60;
				$time.text(minutes + ':' + pad(seconds, 2));
				$title.text(minutes + ':' + pad(seconds, 2));
			}

			if(elapsed == total){
				$body.attr('class', 'stop');
				$time.text('TIME!');
			}else if(remaining<=warning){
				$body.attr('class', 'warning');
				timer();
			}else{
				timer();
			}
		}, 1000);
	}

	function pad(num, size){
		var s = num+"";
		while (s.length < size) s = "0" + s;
		return s;
	}

	$toggleCountUpCountDown.click(function(){
		if($(this).hasClass('btn-default')){
			$(this).removeClass('btn-default');
			$(this).addClass('btn-warning');
			$(this).text('Count down');
			resetTimer();
		}else{
			$(this).removeClass('btn-warning');
			$(this).addClass('btn-default');
			$(this).text('Count up');
			resetTimer();
		}
	});
	$customTimeSubmit.click(function(event){
		event.preventDefault();
		customTime = true;
		customTimeValue = parseInt($customTime.serialize().substring(11), 10) * 60;
	});

	/* As of June 12th 2015: https://craig.is/killing/mice */
	Mousetrap.bind('r', function(){
		console.log("resetTimer();");
		resetTimer();
	});

	Mousetrap.bind('space', function(){
		if(existingTimer&&paused){
			//If there exists a timer that is paused, resume playing.
			paused = false;
			existingTimer = true;
			reset = false;
			timer();
		}else if(!existingTimer&&paused){
			//If no timer exists, start it.
			paused = false;
			existingTimer = true;
			reset = false;
			start();
		}else{
			paused = true;
			existingTimer = true;
			reset = false;
		}
	});
});