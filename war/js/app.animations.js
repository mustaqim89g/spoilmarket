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
		var animationStage = this;
		$('#' + elementName).click(animationStage.internalOnElementClick(animationStage));
		
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
		
		for (var i = 0; i < this.elements.length; i++) {
			
			var element = this.elements[i];
			if (element.elementIsVisible) {
				
				var rowNumber = Math.floor(i / numberOfElementsPerRow);
				var columnNumber = Math.floor(i % numberOfElementsPerRow);
				var y = ((rowNumber + 1) * 20) + (rowNumber * this.elementHeight);
				var x = ((columnNumber + 1) * 10) + (columnNumber * this.elementWidth);
				
				element.stageX = x;
				element.stageY = y;
				
			}
			else {
				element.stageX = hiddenPositionX;
				element.stageY = hiddenPositionY;
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
	
	this.animateEntrance = function() {
		
	}
	
	this.animateFilter = function() {
		
	}
	
	this.animateExit = function() {
		
	}
	
	this.internalOnElementClick = function(animationStage) {
		
	}
	
	
}