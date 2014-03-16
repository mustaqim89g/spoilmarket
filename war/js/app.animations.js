/**
 * 
 */
function AnimationStage(stageDivName, prefix, frameTemplateName) {
	
	this.displayIndex = -1;
	this.actualIndex = -1;
	
	this.stageDivName = stageDivName;
	this.stageDiv = $('#' + stageDivName);
	this.elementWidth = null;
	this.elementHeight = null;
	this.prefix = prefix;
	this.elementFrame = '';
	this.frameTemplateName = frameTemplateName;
	this.animationSpeed = 500;
	this.isResponsive = true;
	this.isOn = true;
	
	this.mapElement = function(element, frame) { return ''; }
	this.search = function(element) { return true; } 
	
	this.elements = [];
	this.map = {};
	
	this.init = function() {
		var that = this;
		$(document).ready(function() {
			that.prepare();
		});
		
		$(window).resize(function() {
			try {
				if (that.isOn && that.isResponsive) {
					that.animateFilter(that.animationSpeed);
				}
			}
			catch (ex) {
				
			}
		});
	};
	
	this.prepare = function() {
		this.stageDiv = $('#' + this.stageDivName);
		this.stageDiv.css('position', 'relative');
		this.configureFrameTemplate();
	}
	
	this.configureFrameTemplate = function() {
		var selector = $('#' + this.frameTemplateName);
		if (selector[0] != null && typeof selector[0] != 'undefined') {
			this.elementFrame = selector[0].innerHTML;
		}
	}
	
	this.addElement = function(element) {
		
		element.displayIndex = element.displayIndex || ++this.displayIndex;
		element.actualIndex = element.actualIndex || ++this.actualIndex;
		element.elementIsVisible = element.elementIsVisible || true;
		element.stageX = element.stageX || 0;
		element.stageY = element.stageY || 0;
		this.elements.push(element);
		
		var elementName = this.getElementName(element);
		var html = this.drawElement(element, elementName);
		this.map[elementName] = element;
		
		this.stageDiv.html(this.stageDiv.html() + html);
		var animationStage = this;
		$(document).on('mouseup', '#' + elementName, function() { animationStage.internalOnElementClick(animationStage); });
		
	}
	
	this.discoverElementSize = function() {
		try {
			this.elementWidth = this.elementWidth || $('.' + this.prefix).width();
			this.elementHeight = this.elementHeight || $('.' + this.prefix).height();
		}
		catch (ex) {}
	}
	
	this.drawElement = function(element, elementName) {
		
		var wrapper = '<div id="' + elementName + '" class="' + this.prefix + 
			'" style="display: none; position: absolute;">$$$STRUCTUREDELEMENT$$$</div>';
		var framedElement = this.mapElement(element, this.elementFrame);
		wrapper = wrapper.replace('$$$STRUCTUREDELEMENT$$$', framedElement);
		
		return wrapper;
		
	}
	
	this.getElementName = function(element) {
		var elementName = 'stage-' + this.prefix + '-' + element.actualIndex;
		return elementName;
	}
	
	this.calculatePreliminaryPosition = function() {
		
		this.discoverElementSize();
		
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
		
		if (this.isOn) {
			this.calculatePreliminaryPosition();
			for (var i = 0; i < this.elements.length; i++) {
				var element = this.elements[i];
				var elementName = this.getElementName(element);
				
				$('#' + elementName).css('top', element.stageY + 'px');
				$('#' + elementName).css('left', element.stageX + 'px');
				$('#' + elementName).show();
			}
		}
	}
	
	this.animateEntrance = function(speed, onComplete) {
		
		if (this.isOn) {
			speed = speed || this.animationSpeed;
			onComplete = onComplete || function() {};
			
			this.centerAllElements(true);
			this.calculatePreliminaryPosition();
			
			setTimeout(onComplete, speed / 4);
			
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
			if (this.isOn) {
				speed = speed || this.animationSpeed;
				this.filter();
				this.calculatePreliminaryPosition();
				
				for (var i = 0; i < this.elements.length; i++) {
					var element = this.elements[i];
					var elementName = this.getElementName(element);
		
					if (element.elementIsVisible) {
						$('#' + elementName).show();
						$('#' + elementName).stop(true, true);
						$('#' + elementName).animate({
							top: element.stageY + 'px',
							left: element.stageX + 'px',
							opacity: 1.0
						}, speed, function() {});
					}
					else {
						$('#' + elementName).stop(true, true);
						$('#' + elementName).animate({
							opacity: 0.0
						}, speed, function() { 
							//$('#' + elementName).hide(); 
						});
					}
					
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
		
		if (this.isOn) {
			speed = speed || this.animationSpeed;
			onComplete = onComplete || function() {};
			
			this.calculateDisplacement();
			setTimeout(onComplete, speed / 4);
			
			for (var i = 0; i < this.elements.length; i++) {
				var element = this.elements[i];
				var elementName = this.getElementName(element);
				var index = element.actualIndex;
				
				$('#' + elementName).animate({
					top: element.stageY + 'px',
					left: element.stageX + 'px',
					opacity: 0.0
				}, speed, function() {			
					$(this).hide();
				});
			}
		}
	}
	
	this.internalOnElementClick = function(animationStage) {
		animationStage.onElementClick(animationStage);
	}
	
	this.isOnElementClick = function(animationStage) {
		
	}
	
	this.off = function() { this.isOn = false; }
	this.on = function() { this.isOn = true; }
	
	
	this.init();
}