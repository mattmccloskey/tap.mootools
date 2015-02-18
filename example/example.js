window.addEvent('domready', function(){
	var tapsOn = function() {
		$('pad').addEvent('tap', function(e){ 
			e.stop();
			$$('.alert').fade('show').fade('out');
		});
	};
	var tapsOff = function() {
		$('pad').removeEvents('tap');
	};

	var tapsAreOn = true;

	$$('.taps-toggle').addEvent('click', function(e) {
		e.stop();
		if(!tapsAreOn)
		{
			tapsOn();
			$$('.state').set('text', 'On');
		}
		else
		{
			tapsOff();
			$$('.state').set('text', 'Off');
		}
		tapsAreOn = !tapsAreOn;
	});

	// Taps start on
	tapsOn();
});