/**
 * Parallax.js
 * Built for Inspirar 2014 Org Team
 */


function Parallax(containerName)
{
	this.container = null;
	this.containerName = containerName;
	this.register = function()
	{
		this.container = $(this.containerName);
		var current = this;
		$(window).scroll(function() {
			current.scrollCallBack(current);
		});
	}
	
	
	this.scrollCallBack = function(parallax)
	{
		parallax.container.each(function()
		{
			try
			{
				var that = $(this);
				var win = $(window);

				var speed = that.data("speed");
				
				if (win.scrollTop() >= that.offset().top - win.height())
				{
					var newPosition = -(that.offset().top - $(window).scrollTop()) * speed;
					that.css("background-position-y", newPosition + "px");
				}
			}
			catch (ex)
			{
				alert(ex);
			}
		});
	}

	
	
}