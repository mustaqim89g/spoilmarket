/* Muhammad Mustaqim */
/* For IDP Team G2T2 */
/* Requires jQuery */

function Table (canvasId, className, style, alternateStyle, headingStyle)
{

	this.canvasId = canvasId || '';
	this.className = className || '';
	this.style = style;
	this.alternateStyle = alternateStyle || '';
	this.headingStyle = headingStyle || '';
	this.minimumWidth = 500;
	
	this.columnId = 0;
	
	this.columns = [];
	this.addColumn = function(name, isSortable, widthPercentage)
	{
		this.columns.push({
			id: this.columnId++,
			name: name || '',
			isSortable: isSortable || false,
			sortingState: 0,
			widthPercentage: widthPercentage || 0.2,
			x: 0,
			y: 0
		});
	}
	
	this.rows = [];
	this.addRow = function(dataArr)
	{
		this.rows.push(dataArr);
	}
	
	this._____sort = function(columnIndex)
	{
		var func = this.____sortFunction(columnIndex);
		this.rows.sort(func);
	}
	
	this._____sortFunction = function(columnIndex)
	{
		var column = this.columns[columnIndex];
		if (column)
		{
			if (column.isSortable)
			{
				column.sortingState = column.sortingState || 0;
				if (column.sortingState == 0 || column.sortingState == 2)
				{
					var ascendingFunction = function(a, b)
					{
						return a[columnIndex] < b[columnIndex] ? -1 : a[columnIndex] > b[columnIndex] ? 1 : 0;
					}
					
					column.sortingState = 1;
					return ascendingFunction;
				}
				else 
				{
					var ascendingFunction = function(a, b)
					{
						return a[columnIndex] < b[columnIndex] ? 1 : a[columnIndex] > b[columnIndex] ? -1 : 0;
					}
					
					column.sortingState = 2;
					return ascendingFunction;
				}
			}
		}
		
		var genericFunction = function() { return 0; };
		return genericFunction;
	}
	
	
	this.container = function()
	{
		if (this.canvasId)
		{
			return $('#' + this.canvasId);
		}
		else
		{
			return $(document);
		}
	}
	
	this.prepare = function()
	{
		//this.container().css('position', 'relative');
	}
	
	this.resize = function()
	{
		var width = this.container().width();
		width = width < this.minimumWidth ? this.minimumWidth : width;

		for (var i = 0; i < this.columns.length; i++)
		{
			var c = this.columns[i];
			var columnWidth = c.widthPercentage * width;
			
			var sName = '.' + this.className + '_column_' + i
			$(sName).stop()
			$(sName).animate({
				width: columnWidth
			}, 500);
		}
		
	}
	
	this.calculatePositions = function()
	{
		var sHeadingRow = '#' + this.className + '_headingRow';
	
		var nextY = $(sHeadingRow).height();
		for (var i = 0; i < this.rows.length; i++)
		{
			var sTable = '#' + this.className + '_row_table_' + i;
			var sRow = '#' + this.className + '_row_' + i;
			
			var r = this.rows[i];
			r.y = nextY;
			
			nextY += $(sRow).height();
		}
	}
	
	this.move = function()
	{
		this.resize();
		var that = this;
		setTimeout(function() {
			
			that.calculatePositions();
			for (var i = 0; i < that.rows.length; i++)
			{
				var row = that.rows[i];
				var sRow = '#' + that.className + '_row_' + i;
				
				$(sRow).stop();
				$(sRow).animate(
				{
					top: row.y
				}, 500);
			}
			
		}, 500);
	}
	
	this.drawTable = function()
	{
		if (this.container())
		{
			this.prepare();
			var c = this.container();
			//alert(JSON.stringify(c));
			c.html('');
			
			var html = '<table style="width: 100%"><tr>';
			var cWidth = c.width();
			
			for (var i = 0; i < this.columns.length; i++)
			{
				var column = this.columns[i];
				html += '<td class="' + this.headingStyle + ' ' + this.className + '_column_' + i + ' ' + this.className + '_column" data-column="' + i + '">' + 
					this.columns[i].name + '</td>';
			}
			
			html += '</tr>'
			
			for (var i = 0; i < this.rows.length; i++)
			{
				var row = this.rows[i];
				var rowStyle = (i % 2) == 0 ? this.style : this.alternateStyle;
				html += '<tr>';
				
				for (var j = 0; j < this.columns.length; j++)
				{
					var rowColumn = row[j];
					rowColumn = rowColumn || '';
					
					html += '<td class="' +  rowStyle + ' ' + this.className + '_column_' + i + '" style="width: ' + (this.columns[j].widthPercentage * 100) + '%">' + 
					row[j] + '</td>';	
				}
				
				html += '</tr>';
			}
			
			html += '</table>';
			c.html(html);
			//alert(html);
			
		}
	}

}