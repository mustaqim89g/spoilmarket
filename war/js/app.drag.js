/* Muhammad Mustaqim */
/* For IDP Team G2T2 */
/* Requires jQuery */

function Drag (dragCanvasId, dragObjectClass, dragLimitFunc, mouseDownFunc, moveFunc, mouseUpFunc)
{

	this.dragCanvasId = dragCanvasId || '';
	this.dragObjectClass = dragObjectClass || '';
	this.dragLimitFunc = dragLimitFunc || function() { return true; };
	this.mouseDownFunc = mouseDownFunc || function() { };
	this.mouseUpFunc = mouseUpFunc || function() { };
	
	this.init = function()
	{
		
	}
	
	/* Sends out message to the log or alerts if debugging is enabled */
	this.out = function(message)
	{
		if (this.debug)
		{
			if (window.console && console.log)
			{
				console.log(message);
			}
			else
			{
				alert(message);
			}
		}
	}
	
	
	this.init();

}