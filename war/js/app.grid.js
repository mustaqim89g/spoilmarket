/* Muhammad Mustaqim */
/* For IDP Team G2T2 */
/* Requires jQuery */

function Grid(name, containerId, templateId, hCentralize, vCentralize)
{
	this.name = name || 'no-name';
	this.containerId = containerId || this.name + '-container';
	this.templateId = templateId || '';
	this.emptyMessage = 'This is nothing to display right now.';
	this.hCentralize = hCentralize || false;
	this.vCentralize = vCentralize || false;
	this.hSpacing = 20;
	this.vSpacing = 20;
	this.minimumMargin = 50;
	this.otherClasses = '';
	this.maxColumn = 0;
	
	this.noResultTemplate = '';
	
	this.debug = true;
	
	this.template = '';
	this.elementWidth = 0;
	this.elementHeight = 0;
	this.entered = false;
	this.elementClickable = true;
	
	this.bindList = [];
	this.elements = {};
	this.____id = -1;

	
	
	/* Initialise all variables and functions that is required for this grid */
	this.init = function()
	{
		this.templateId = '#' + this.templateId; //(this.templateId.subString(0, 1) == '#' ? '' : '#') + this.templateId;
		this.containerId = '#' + this.containerId; //(this.containerId.subString(0, 1) == '#' ? '' : '#') + this.containerId;
		//alert(this.templateId);
		
		this.container().css('position', 'relative');
		
		this.clear();
		this.discover();
		//try
		//{
		//alert("in");
		this.subscribeEvent(this);
		//alert("out");
		//}
		//catch (e)
		//{
		
		//}
	}
	
	/* Subscribe to Window Events to make changes */
	this.subscribeEvent = function(current)
	{	
		//alert("registered");
		$(window).resize(function() {
			if (current.entered)
			{
				//alert("resize");
				current.move();
			}
		});
	}
	
	/* Discover the nature of the template if it exists. */
	this.discover = function()
	{
		if (this.templateId != null && this.templateId != '')
		{
			var templateDom = $(this.templateId);

			if (templateDom[0])
			{
				//alert('template -yes');
				this.template = templateDom.html() + '';
				
				if (this.maxColumn <= 0)
				{
					this.elementWidth = templateDom.width();
				}
				else
				{
					var sizePerColumn = Math.floor((this.container().width() - ((this.maxColumn + 1) * this.hSpacing)) / this.maxColumn);
					this.elementWidth = sizePerColumn;
				}
				
				this.elementHeight = templateDom.height();
				//$('body').remove(this.templateId);
			}
			else 
			{
			//alert('template -no');
				this.out('template cannot be defined because the template id could not be found.');
			}
		}
		else
		{
			this.out('template cannot be defined because the template id is null');
		}
	}
	
	this.setNoResultTemplate = function(templateId)
	{
		if (templateId)
		{
			var templateDom = $('#' + templateId);
			
			if (templateDom[0])
			{
				var dom = $('#' + this.name + '_empty');

				if (dom[0])
				{
					dom.html(templateDom.html());
				}
				else
				{
					var html = '<div id="' + this.name + '_empty" style="opacity: 0.0; display: none;">' + templateDom.html() + '</div>';
					var c = this.container();
					c.html(c.html() + html);
				}
			}
		}
	}
	
	/* Clear all elements */
	this.clear = function()
	{
		this.elements = {};
		this.elements.list = [];
		var theElements = this.elements;
		
		this.elements.visible = function()
		{
			var visibleList = [];
			for (var i = 0; i < theElements.list.length; i++)
			{
				var element = theElements.list[i];
				if (element.visible)
				{
					visibleList.push(element);
				}
			}
			
			return visibleList;
		}
		
		this.bindList = [];
	}
	
	/* Add an element into this grid */
	this.addElement = function(element)
	{
		if (element)
		{
			element.id = this.name + (this.____id++);
			element.x = element.x || 0;
			element.y = element.y || 0;
			element.visible = true;
			
			if (this.elementClickable)
			{
				element.enableClick = element.enableClick || function() 
				{
					if (this.id)
					{
						$('#' + this.id + '_clickable').show();
					}
				}
				
				element.disableClick = element.disableClick || function() 
				{
					if (this.id)
					{
						$('#' + this.id + '_clickable').hide();
					}
				}
			}
			
			element.dom = element.dom || function()
			{
				return $('#' + element.id);
			};
						
			this.elements[element.id] = element;
			this.elements.list.push(element);
			this.drawElement(element);
			
			element.originalWidth = element.dom().width();
			element.originalHeight = element.dom().height();
		}
	}
	
	/* Maps a binder name with the element property */
	this.map = function(bindName, elementProperty)
	{
		if (!this.bindList)
		{
			this.bindList = [];
		}
	
		if (bindName && elementProperty)
		{
			var bindMap = 
			{
				bindName: bindName,
				elementProperty: elementProperty
			}
			
			this.bindList.push(bindMap);
		}
	}
	
	/* Add each element's DOM into the container  */
	this.drawElements = function()
	{
	
		if (this.template != null && this.bindList != null && this.elements != null && this.elements.list != null)
		{
			for (var i = 0; i < this.elements.list.length; i++)
			{
				var element = this.elements.list[i];
				this.drawElement(element);
			}
		}
		else
		{
			this.out('Elements could not be drawn because either template, bindList or elements is null');
		}
	}
	
	this.drawElement = function(element)
	{
		var html = this.bind(element);
		
		if (this.elementClickable)
		{
			html += '<div id="' + element.id + '_clickable" class="clickable" data-click="' + element.id + '">&nbsp;</div>';
		}
		
		html = '<div id="' + element.id + '" class="' + this.name + ' ' + this.otherClasses + '" style="display: none; position: absolute; opacity: 0.0;">' + html + '</div>';
			
		var c = this.container();
		c.html(c.html() + html);
		
		var currentGrid = this;
		$(document).on('mouseup', '#' + element.id + '_clickable', function() { currentGrid.____click(currentGrid, this); });
		//alert(c.html());
	}
	
	/* Erase all elements DOM from the container */
	this.eraseElements = function()
	{
		if (this.elements && this.elements.list)
		{
			for (var i = 0; i < this.elements.list.length; i++)
			{
				var element = this.elements.list[i];
				this.container().remove('#' + element.id);
			}
		}
		else
		{
			this.out('Elements is null. Nothing was removed.');
		}
	}
	
	/* Bind an element into the template and produce the HTML representation */
	this.bind = function(element)
	{
		var templateCopy = this.template + '';
		if (element)
		{
			for (var j = 0; j < this.bindList.length; j++)
			{
				var bindMap = this.bindList[j];
				if (element[bindMap.elementProperty])
				{
					templateCopy = templateCopy.split(bindMap.bindName).join(element[bindMap.elementProperty]);
				}
				else
				{
					this.out('Element does not contain the propertyName[' + j + ']: ' + bindMap.elementProperty + '. Binding for this will not occur.');
				}
			}
			
			return templateCopy;
		}
		else
		{
			this.out('Element is null. Will not be drawn.');
			return templateCopy;
		}
	}
	
	/* Returns the container that is to be used as a canvas for the grid */
	this.container = function()
	{
		var dom = $(this.containerId);
		//alert(this.containerId);
		if (dom[0])
		{
		//alert("dom");
			return dom;
		}
		else
		{
		//alert("body");
			this.out('container could not be found. body was returned instead.');
			return $('body');
		}
	}
	
	/* Returns the height of the container */
	this.height = function()
	{
		var dom = $(this.containerId);
		if (dom[0])
		{
			return dom.height();
		}
		else
		{
			this.out('container could not be found. width of window was returned instead.');
			return $(window).height();
		}
	}
	
	/* Returns the width of the container */
	this.width = function()
	{
		var dom = $(this.containerId);
		if (dom[0])
		{
			return dom.width();
		}
		else
		{
			this.out('container could not be found. width of window was returned instead.');
			return $(window).width();
		}
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
	
	/* Aligns the elements on the container, logically. */
	this.alignElements = function()
	{
		this.hSpacing = this.hSpacing || 20;
		this.vSpacing = this.vSpacing || 20;
		this.minimumMargin = this.minimumMargin || 20;
	
		var cWidth = this.width(); var cHeight = this.height();
		var hCenter = Math.floor(cWidth / 2); var vCenter = Math.floor(cHeight / 2);
		
		var actualElementWidth = $('.' + this.name).width() + this.hSpacing; var actualElementHeight = $('.' + this.name).height() + this.vSpacing;
		//alert('elementWidth: ' + this.elementWidth);
		//alert('actualElementWidth: ' + actualElementWidth);
		
		var supposedWidth = cWidth + this.hSpacing;
		//alert('cWidth: ' + cWidth);
		//alert('supposedWidth: ' + supposedWidth);
		if (supposedWidth < actualElementWidth) supposedWidth = actualElementWidth;
		
		
		var numberOfColumns = Math.floor(supposedWidth / actualElementWidth);
		
		var supposedHeight = cHeight + this.vSpacing;
		var numberOfRows = Math.floor(supposedHeight / actualElementHeight);
		
		var visibleElements = this.elements.visible();
		var numberOfVisibleElements = visibleElements.length;
		
		var topOffset = 0;
		
		if (this.hCentralize)
		{
			if (numberOfVisibleElements < numberOfColumns)
			{
				numberOfColumns = numberOfVisibleElements;
			}
		}
		
		var totalElementWidth = numberOfColumns * actualElementWidth;
		var leftOffset = Math.floor((supposedWidth - totalElementWidth) / 2);
		var topOffset = this.vSpacing;
		
		if (leftOffset < this.minimumMargin) leftOffset = this.minimumMargin;
		if (topOffset < this.minimumMargin) topOffset = this.minimumMargin;
		
		if (this.vCentralize)
		{
			var numberOfVisibleRows = Math.floor(numberOfVisibleElements / numberOfColumns);
			var totalElementHeight = numberOfVisibleRows * actualElementHeight;
			
			if (numberOfVisibleRows <= numberOfRows)
			{
				topOffset = Math.floor((supposedHeight - totalElementHeight) / 2);
			}
		}
		
		for (var i = 0; i < visibleElements.length; i++)
		{
			var element = visibleElements[i];
			var eColumn = Math.floor(i % numberOfColumns);
			var eRow = Math.floor(i / numberOfColumns);
			
			element.x = leftOffset + (eColumn * actualElementWidth) - this.hSpacing;
			element.y = topOffset + (eRow * actualElementHeight) - this.vSpacing;
			
			//alert(element.x + ", " + element.y);
		}
	}
	
	/* The sort function for the elements. Should be overridden given the circumstances. */
	this.sort = null;
	
	/* The search function for the elements. Should be overridden, returning true to display element, false if not */
	this.search = null;
	
	/* The click function when an element is being clicked. Should be overridden */
	this.click = null;
	
	/* Invokes the click function if defined */
	this.____click = function(currentGrid, dom)
	{
		if (currentGrid.click)
		{
			var elementID = $(dom).data('click');
			var element = currentGrid.elements[elementID];
			
			if (element)
			{
				currentGrid.click(element);
			}
		}
	}	
	
	/* Invokes the defined search function for each of the elements */
	this.____search = function()
	{
		if (this.search)
		{
			for (var i = 0; i < this.elements.list.length; i++)
			{
				var element = this.elements.list[i];
				element.visible = this.search(element);
				//alert(element.visible);
			}
		}
		else
		{
			this.out('search function not defined.');
		}
	}
	
	/* For use to determine if the position is more, less or touching the middle line and return the correct displacement */
	this.displace = function(x1, width, center)
	{
		var difference = 0;
		var x2 = x1 + width;
		if (x2 <= center)
		{
			difference = Math.floor((x1 - center) / 2);
			return x1 + difference;
		}
		
		if (x1 >= center)
		{
			difference = Math.floor((x2 - center) / 2);
			return x1 + difference;
		}
		
		return x1;
	}
	
	this.defineEntryPosition = function()
	{
		this.alignElements();
		var hCenter = Math.floor(this.width() / 2);
		var vCenter = Math.floor(this.height() / 2);

		for (var i = 0; i < this.elements.list.length; i++)
		{
			var element = this.elements.list[i];
			var dom = $('#' + element.id);
			
			//if (this.name == "product_info")
			//{
			//	alert(JSON.stringify(element));
			//	this.where();
			//}
			
			if (dom[0])
			{
				dom.css('left', this.displace(element.x, $('.' + this.name).width(), hCenter));
				dom.css('top', this.displace(element.y, $('.' + this.name).height(), vCenter));
			}
			else
			{
				this.out('element[' + i + '] in '  + this.name + ' could not be found.');
			}
		}
	}
	
	this.defineExitPosition = function()
	{
		var hCenter = Math.floor(this.width() / 2);
		var vCenter = Math.floor(this.height() / 2);

		for (var i = 0; i < this.elements.list.length; i++)
		{
			var element = this.elements.list[i];
			
			element.x = this.displace(element.x, $('.' + this.name).width(), hCenter);
			element.y = this.displace(element.y, $('.' + this.name).height(), vCenter);
		
		}
	}
	
	this.refresh = function()
	{
		this.____search();
		
		if (this.sort)
		{
			this.elements.list.sort(this.sort);
		}
	}
	
	this.animate = function(dom, element, opacity, speed, completeFunction)
	{
		var rand = Math.floor(Math.random() * 100) + 100;
		//alert(rand);
		var y = element.visible ? element.y : 0 - dom.height();
		var x = element.visible ? element.x : 0 - dom.width();
		var theOpacity = element.visible ? opacity : 0.0;
			
		if (theOpacity != 0.0) dom.show();
		
		var width = this.elementWidth;
		var height = this.elementHeight;
		
		
		dom.stop();
		dom.animate
		({
			top:	element.y,
			left: 	element.x,
			width:	element.originalWidth,
			height: element.originalHeight,
			opacity:	theOpacity
		}, speed, completeFunction);
		
		if (element.supplementaryAnimation)
		{
			element.supplementaryAnimation();
			element.supplementaryAnimation = null;
		}
		
	}
	
	this.callAnimate = function(opacity, speed, completeFunction, display)
	{
		completeFunction = completeFunction || function() {};
		//display = display || true;
		speed = speed || 500;
		
		for (var i = 0; i < this.elements.list.length; i++)
		{
			var element = this.elements.list[i];
			
			if (element.alternateAnimation)
			{
				element.alternateAnimation();
			}
			else
			{
				var dom = $('#' + element.id);
				if (this.name == 'product_spec')
				{
					alert(JSON.stringify(dom));
				}
				
				if (dom[0])
				{
					this.animate(dom, element, opacity, speed, completeFunction);
				}
				else
				{
					this.out('element[' + i + '] in '  + this.name + ' could not be found.');
				}
			}
		}
		
	}
	
	this.enter = function(speed, completeFunction)
	{
		if (!this.entered)
		{
			speed = speed || 500;	
			
			//this.drawElements();
			this.refresh();
			this.defineEntryPosition();
			this.callAnimate(1.0, speed, completeFunction);
			
			this.entered = true;
			this.showOrHideEmptyResult();
		}
		else
		{
			this.move(speed, completeFunction);
		}
	}
	
	this.exit = function(speed, completeFunction)
	{
		speed = speed || 500;
		completeFunction = completeFunction || function() {}
		
		this.defineExitPosition();
		this.callAnimate(0.0, speed, function() {
			$(this).hide();
			completeFunction();
		});
		
		this.hideEmptyResult();
		this.entered = false;
	}
	
	this.move = function(speed, completeFunction)
	{
		speed = speed || 500;
	
		this.refresh();
		this.alignElements();
		this.callAnimate(1.0, speed, completeFunction);
		this.showOrHideEmptyResult();
	}
	
	this.where = function()
	{
		try
		{
			throw new UserException('Where?');
		}
		catch (ee)
		{
			alert(ee.stack);
		}
	}
	
	this.showOrHideEmptyResult = function()
	{
		var dom = $('#' + this.name + '_empty');
		
		if (dom[0])
		{
			if (this.elements.visible().length == 0)
			{
				dom.show();
				dom.animate({
					opacity: 1.0
				}, 500);
			}
			else
			{
				dom.animate({
					opacity: 0.0
				}, 500);
				setTimeout(function() { dom.hide(); }, 500); 
				
			}
		}
	}
	
	this.hideEmptyResult = function()
	{
		var dom = $('#' + this.name + '_empty');
		
		if (dom[0])
		{
			dom.animate({
				opacity: 0.0
			}, 500);
			setTimeout(function() { dom.hide(); }, 500); 
		}
	}
	
	this.attach = function(selector, func, event)
	{
		event = event || 'click';
		$(document).on(event, '#' + selector, func);
		//$('#' + selector).click(func);
	}
	
	this.clearAlternateAnimation = function()
	{
		for (var i = 0; i < this.elements.list.length; i++)
		{
			var element = this.elements.list[i];
			if (element) element.alternateAnimation = null;
		}	
	}
	
	this.init();

}