/**
 * Custom tap event for MooTools
 */
Element.Events.tap = {

	onAdd: function() {
		var startEvent = {},
			endEvent = {},
			buffer = 3,
			tapEvents = {
				'touchstart': function(e) { 
					e.preventDefault(); 
					this.store('touchmoved', false);
					this.store('hastouch', true);
					startEvent.x = e.touches[0].pageX; 
					startEvent.y = e.touches[0].pageY;
				},
				'touchmove': function(e) { 
					endEvent.x = e.touches[0].pageX;
					endEvent.y = e.touches[0].pageY;
					if(Math.abs(startEvent.x - endEvent.x) > buffer || Math.abs(startEvent.y - endEvent.y) > buffer)
					{
						this.store('touchmoved', true); 
					}
				},
				// If you want 'tap' events to respond to clicks as well
				// 'click': function(e) { 
				// 	e.stop(); 
				// 	if( ! this.retrieve('touchmoved') && ! this.retrieve('hastouch'))
				// 	{
				// 		this.fireEvent('tap', e);
				// 	}
				// },
				'touchend': function(e) { 
					if( ! this.retrieve('touchmoved'))
					{ 
						this.fireEvent('tap', e); 
					} 
					else
					{ 
						/* It was a drag, not a touch */
					} 
				}
			};
		this.store('tapEvents', tapEvents).addEvents(tapEvents);
	},
	onRemove: function() {
		this.removeEvents(this.retrieve('tapEvents'));
	}
};

// Covert clicks to touch
var isTouch = 'ontouchstart' in window || 'msmaxtouchpoints' in window.navigator;

Element.Events.convertClicksToTaps = {
	base: 'click',
	condition: function(e) {
		if (isTouch === true) return false;
	},
	onAdd: function() {
		if (isTouch === true) 
		{
			this.addEvent('tap', function(e){
				this.fireEvent('click', [e]);
			});
		}
	}
};

