/* Muhammad Mustaqim */
/* For IDP Team G2T2 */
/* Requires jQuery */
(function() {
	$(document).ready(function() {

		setInterval(function() {
			$('.wrapper').each(function() {
				
				var that = $(this)
				var idOfReference = that.data('wrap');
				
				if (idOfReference)
				{
					if (idOfReference.indexOf('$') == -1)
					{
						var ref = $('#' + idOfReference);
						
						that.height(ref.height() + 30);
					}
				}
			});
		
		}, 100);
	});
})();


