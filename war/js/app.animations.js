/**
 * 
 */

function AnimationStage(stageDivName, prefix, elementWidth, elementHeight) {
	
	this.displayIndex = -1;
	this.stageDivName = stageDivName;
	this.stageDiv = $('#' + stageDivName);
	this.elementWidth = elementWidth;
	this.elementHeight = elementHeight;
	this.prefix = prefix;
	this.elementFrame = '';
	
	this.mapElement = function(element, frame) { return ''; }
	this.search = function(element) { return true; } 
	
	this.elements = [];
	this.map = {};
	
	this.prepare = function() {
		this.stageDiv = $('#' + this.stageDivName);
		this.stageDiv.css('position', 'relative');
	}
	
	this.addElement = function(element) {
		
		element.displayIndex = element.displayIndex || ++this.displayIndex;
		element.elementIsVisible = element.elementIsVisible || true;
		element.stageX = element.stageX || 0;
		element.stageY = element.stageY || 0;
		this.elements.push(element);
		
		var elementName = this.getElementName(element);
		var html = this.drawElement(element, elementName);
		this.map[elementName] = element;
		
		this.stageDiv.html(this.stageDiv.html() + html);
		//alert(this.stageDiv.html());
		var animationStage = this;
		//alert(JSON.stringify($('#' + elementName)[0], null, 4));
		//$('#' + elementName).click(function() { animationStage.internalOnElementClick(animationStage); });
		
		$(document).on('mouseup', '#' + elementName, function() { animationStage.internalOnElementClick(animationStage); });
		
	}
	
	this.drawElement = function(element, elementName) {
		
		var wrapper = '<div id="' + elementName + '" class="' + this.prefix + 
			'" style="display: none; position: absolute;">$$$STRUCTUREDELEMENT$$$</div>';
		var framedElement = this.mapElement(element, this.elementFrame);
		wrapper = wrapper.replace('$$$STRUCTUREDELEMENT$$$', framedElement);
		
		return wrapper;
		
	}
	
	this.getElementName = function(element) {
		var elementName = 'stage-' + this.prefix + '-' + element.displayIndex;
		return elementName;
	}
	
	this.calculatePreliminaryPosition = function() {
		
		var containerWidth = this.stageDiv.width() - 20;
		var containerHeight = this.stageDiv.height();
		
		var hiddenPositionX = 0 - containerWidth;
		var hiddenPositionY = 0 - containerHeight;
		
		var numberOfElementsPerRow = Math.floor(containerWidth / (this.elementWidth + 10));
		var sideSpaces = containerWidth - ((numberOfElementsPerRow * this.elementWidth) + ((numberOfElementsPerRow - 1) * 10));
		var leftSpace = Math.floor(sideSpaces / 2)
		
		var visibleIndex = -1;
		for (var i = 0; i < this.elements.length; i++) {
			
			var element = this.elements[i];
			if (element.elementIsVisible) {
				visibleIndex++;
				var rowNumber = Math.floor(visibleIndex / numberOfElementsPerRow);
				var columnNumber = Math.floor(visibleIndex % numberOfElementsPerRow);
				var y = ((rowNumber + 1) * 20) + (rowNumber * this.elementHeight);
				var x = leftSpace + (columnNumber * (this.elementWidth + 10));
				
				element.stageX = x;
				element.stageY = y;
				element.displayIndex = visibleIndex;
				
			}
			else {
				element.stageX = hiddenPositionX;
				element.stageY = hiddenPositionY;
				element.displayIndex = -1;
			}
			
		}
		
	}
	
	this.centerAllElements = function(isHidden) {
		
		var containerWidth = this.stageDiv.width() - 20;
		var containerHeight = Math.floor(this.stageDiv.height() == 0 ? 
				$(window).height() - this.stageDiv.offset().top : this.stageDiv.height());
		
		var centerHeight = (containerHeight / 2) - (this.elementHeight / 2);
		var centerWidth = (containerWidth / 2) - (this.elementWidth / 2);
		
		for (var i = 0; i < this.elements.length; i++) {
			
			var element = this.elements[i];
			element.stageX = centerWidth;
			element.stageY = centerHeight;
			
			var elementName = this.getElementName(element);
			
			$('#' + elementName).css('top', element.stageY + 'px');
			$('#' + elementName).css('left', element.stageX + 'px');
			
			if (isHidden) {
				$('#' + elementName).hide();
			} 
			else {
				$('#' + elementName).show();
			}
		}
		
	}
	
	this.appear = function() {
		
		this.calculatePreliminaryPosition();
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			var elementName = this.getElementName(element);
			
			$('#' + elementName).css('top', element.stageY + 'px');
			$('#' + elementName).css('left', element.stageX + 'px');
			$('#' + elementName).show();
		}
		
	}
	
	this.animateEntrance = function(speed, onComplete) {
		
		onComplete = onComplete || function() {};
		
		this.centerAllElements(true);
		this.calculatePreliminaryPosition();
		
		setTimeout(onComplete, speed);
		
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			var elementName = this.getElementName(element);
			var opacityValue = element.elementIsVisible ? 1.0 : 0.0;
			
			$('#' + elementName).css('opacity', 0.0);
			$('#' + elementName).show();
			
			$('#' + elementName).animate({
				top: element.stageY + 'px',
				left: element.stageX + 'px',
				opacity: opacityValue
			}, speed, function() {});
			
		}
		
	}
	
	this.filter = function() {
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			element.elementIsVisible = this.search(element);
		}
	}
	
	this.animateFilter = function(speed) {
		try
		{
		this.filter();
		this.calculatePreliminaryPosition();
		
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			var elementName = this.getElementName(element);
			
			var dom = $('#' + elementName);
			if (element.elementIsVisible) {
				$('#' + elementName).show();
				$('#' + elementName).animate({
					top: element.stageY + 'px',
					left: element.stageX + 'px',
					opacity: 1.0
				}, speed, function() {});
			}
			else {
				$('#' + elementName).animate({
					opacity: 0.0
				}, speed, function() {this.hide()});
			}
			
		}
		}
		catch (eee) {alert(eee);}
		
	}
	
	this.calculateDisplacement = function() {
		var containerWidth = this.stageDiv.width() - 20;
		var containerHeight = Math.floor(this.stageDiv.height() == 0 ? 
				$(window).height() - this.stageDiv.offset().top : this.stageDiv.height());
		
		var hiddenPositionX = 0 - containerWidth;
		var hiddenPositionY = 0 - containerHeight;
		
		var containerWidthCenter = Math.floor(containerWidth / 2);
		var containerHeightCenter = Math.floor(containerHeight / 2);
		
		for (var i = 0; i < this.elements.length; i++) {
			
			var element = this.elements[i];
			if (element.elementIsVisible) {

				var xDisplacement = 0;
				var xRightPoint = element.stageX + this.elementWidth;
				var xLeftBoundary = containerWidthCenter - this.elementWidth;
				var xRightBoundary = containerWidthCenter + this.elementWidth;
				
				if (!(element.stageX >= xLeftBoundary && xRightPoint <= xRightBoundary)) {
					xDisplacement = Math.floor((element.stageX - containerWidthCenter) / 2);
				}
				
				element.stageX = element.stageX + xDisplacement;
				element.stageY = element.stageY + Math.floor((element.stageY - containerHeightCenter) / 2);
				
			}
			else {
				element.stageX = hiddenPositionX;
				element.stageY = hiddenPositionY;
				element.displayIndex = -1;
			}
			
		}
		
	}
	
	this.animateExit = function(speed, onComplete) {
		
		onComplete = onComplete || function() {};
		this.calculateDisplacement();
		setTimeout(onComplete, speed);
		
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			var elementName = this.getElementName(element);
			
			$('#' + elementName).animate({
				top: element.stageY + 'px',
				left: element.stageX + 'px',
				opacity: 0.0
			}, speed, function() {
				this.hide();
			});
			
		}
	}
	
	this.internalOnElementClick = function(animationStage) {
		animationStage.onElementClick(animationStage);
	}
	
	this.onElementClick = function(animationStage) {
		
	}
	
}