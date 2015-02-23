/**
 * Custom tap event for MooTools
 * https://github.com/mattmccloskey/tap.mootools
 * Released under the MIT license
 */
Element.Events.tap = {
	onAdd: function() 
	{
		console.log("add tap");
		var startEvent = {},
			endEvent = {},
			buffer = 3,	// How far the finger has to move before it's no longer a tap
			touchMoved = false,
			tapEvents = {
				'touchstart': function(e) 
				{ 
					console.log("start");
					touchMoved = false;
					startEvent.x = e.touches[0].pageX; 
					startEvent.y = e.touches[0].pageY;
				},
				'touchmove': function(e) 
				{ 
					endEvent.x = e.touches[0].pageX;
					endEvent.y = e.touches[0].pageY;
					if(Math.abs(startEvent.x - endEvent.x) > buffer || Math.abs(startEvent.y - endEvent.y) > buffer)
					{
						touchMoved = true;
					}
				},
				'touchend': function(e) 
				{ 
					if( ! touchMoved)
					{ 
						$(e.target).fireEvent('tap', e); 
					} 
					else
					{ 
						/* It was a drag or mistake, not a tap */
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
if(isTouch && (typeof convertClicksToTaps == "undefined" || convertClicksToTaps !== false))
{
	var addFunc = Element.prototype.addEvent,
		removeFunc = Element.prototype.removeEvent,
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
			// Since we're replacing click with tap, click will still fire by default, causing href="#" to modify the URL bar.
			// To prevent this, add preventDefault on click event.
			if(typeof arguments[0] === 'string' && arguments[0].slice(0, 5) === 'click')
			{
				this.addEventListener('click', function(e) 
				{
					e.preventDefault();
				});
			}
			return addFunc.attempt(replaceClickWithTap.attempt(arguments), this);
		},
		removeEvent: function() 
		{
			return removeFunc.attempt(replaceClickWithTap.attempt(arguments), this);
		}
	});
}