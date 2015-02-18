/**
 * Custom tap event for MooTools
 */
Element.Events.tap = {
	onAdd: function() 
	{
		var startEvent = {},
			endEvent = {},
			buffer = 3,
			tapEvents = {
				'touchstart': function(e) 
				{ 
					e.preventDefault(); 
					this.store('touchmoved', false);
					this.store('hastouch', true);
					startEvent.x = e.touches[0].pageX; 
					startEvent.y = e.touches[0].pageY;
				},
				'touchmove': function(e) 
				{ 
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
				'touchend': function(e) 
				{ 
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

	onRemove: function() 
	{
		this.removeEvent('tap', this.retrieve('tapEvents'));
	}
};

// Convert clicks to taps
var isTouch = 'ontouchstart' in window || 'msmaxtouchpoints' in window.navigator;
isTouch = true;
if(isTouch && (typeof convertClicksToTaps == "undefined" || convertClicksToTaps !== false))
{
	var addFunc = Element.addEvent,
		removeFunc = Element.removeEvent,
		addFuncs = Element.addEvents,
		removeFuncs = Element.removeEvents,
		replaceClickWithTap = function() 
		{
			if(typeof arguments[0] === 'string' && arguments[0].slice(0, 5) === 'click')
			{
				arguments[0] = arguments[0].replace('click', 'tap');
			}
			return arguments;
		};
	Element.implement({
		addEvent: function() 
		{
			return addFunc.apply(this, replaceClickWithTap.apply(this, arguments));
		},
		removeEvent: function() 
		{
			return removeFunc.apply(this, replaceClickWithTap.apply(this, arguments));
		},
		addEvents: function() 
		{
			return addFuncs.apply(this, replaceClickWithTap.apply(this, arguments));
		},
		removeEvents: function() 
		{
			return removeFuncs.apply(this, replaceClickWithTap.apply(this, arguments));
		}
	});
}