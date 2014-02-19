var categoryStage = null;
try
{
	categoryStage = new AnimationStage('category_block_wrapper', 'cat_stage', 400, 200);
	categoryStage.elementFrame = '<div class="category_block">$$$TheData$$$</div>';
	categoryStage.mapElement = function(element, frame) { return frame.replace('$$$TheData$$$', element.name); }
		
	$(document).ready(function() {
		try
		{
			categoryStage.prepare();
			categoryStage.addElement(new Category(0, 'Laptops'));
			categoryStage.addElement(new Category(1, 'Desktops'));
			categoryStage.addElement(new Category(2, 'Television'));
			categoryStage.addElement(new Category(3, 'Washing Machine'));
			categoryStage.addElement(new Category(4, 'Refigerator'));
			categoryStage.addElement(new Category(5, 'Phone'));

			//alert(JSON.stringify(categoryStage, null, 4));
			categoryStage.appear();
		}
		catch (ee)
		{
			alert(ee);
			alert(ee.stack);
		}
	});

}
catch (e)
{
	alert(e);
	alert(e.stack);
}