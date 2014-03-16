/* Muhammad Mustaqim */
/* For IDP Team G2T2 */
/* Requires jQuery */

try
{
var current_display = 1;

var heading_grid = null;
var category_grid = null;
var current_product = null;

$(document).ready(function() {

	try 
	{
		category_grid = new Grid('cat_grid', 'stage', 'category-template', true, true);
		category_grid.map('$$$URL$$$', 'url');
		category_grid.addElement({ url: 'assets/laptop.jpg' });
		category_grid.addElement({ url: 'assets/desktop.jpg' });
		category_grid.addElement({ url: 'assets/tablet.jpg' });
		category_grid.addElement({ url: 'assets/phone.jpg' });
		category_grid.addElement({ url: 'assets/tv.jpg' });
		category_grid.addElement({ url: 'assets/fridge.jpg' });
		
		category_grid.click = category_item_click;
		
		heading_grid = new Grid('heading_grid', 'stage-heading', 'heading-template', false, false);
		heading_grid.map('$$$TITLE$$$', 'title');
		heading_grid.map('$$$INSTRUCTION$$$', 'instruction');
		heading_grid.map('$$$CONTROLS$$$', 'controls');
		heading_grid.elementClickable = false;
		
		heading_grid.addElement({ title: 'Categories', instruction: 'Select the category of products that you would like to browse.', display: 1, controls: '&nbsp;' });
		heading_grid.addElement({ title: 'Laptops', instruction: 'Click on any laptops below to find out more about them.', display: 2,

			controls: '<div class="heading-controls"><div class="sort-control-float"><span>&nbsp;&nbsp;</span>Sort By: <button id="btnSortByPrice">Price</button><button id="btnSortByRating">Rating</button><button id="btnSortByBrand">Brand</button></div>' +
			'<div class="sort-control-float"><span>&nbsp;&nbsp;</span><!--Maximum Budget: <button id="btnPriceRange">$2500</button>-->' +
			'</div></div>'

		});
		
		heading_grid.addElement({ title: 'Bookmark', instruction: 'You have bookmarked the following products previously.', display: 3, controls: '&nbsp;' });

		
		heading_grid.attach('btnSortByPrice', btnSortByPrice_click);
		heading_grid.attach('btnSortByRating', btnSortByRating_click);
		heading_grid.attach('btnSortByBrand', btnSortByBrand_click);
		heading_grid.attach('btnPriceRange', btnPriceRange_click);
		
		heading_grid.animate = function(dom, element, opacity, speed, completeFunction)
		{
			var rand = Math.floor(Math.random() * 100) + 100;
			//alert(rand);
			var y = element.visible ? element.y : 0 - dom.height();
			var x = element.visible ? element.x : 0 - dom.width();
			var theOpacity = element.visible ? opacity : 0.0;
		
			if (theOpacity != 0.0) dom.show();
			
			dom.stop();
			dom.animate
			({
				top:	element.y,
				left: 	element.x,
				right:	element.x,
				opacity:	theOpacity
			}, speed, completeFunction);
		}
		heading_grid.search = function(e)
		{
			return e.display == current_display;
		};
		
		heading_grid.enter();
		setTimeout(function() { category_grid.enter(); }, 500);
		
		/* Subscribe all events here */
		$('#nav-logo').click(logo_click);

		hideComparator();
		
	}
	catch (e)
	{
		alert(e);
		alert(e.stack);
	}
});

}
catch (eeee)
{
	alert(eeee);
	alert(eeee.stack);
}

/* Event when the logo gets clicked */
function logo_click()
{
	product_grid.clearAlternateAnimation();
	current_display = 1;
	heading_grid.move();
	category_grid.enter();
	product_grid.exit();
	reduceSearchBar();
	
	hideComparator(true);
}

/* Event when a category item gets clicked */
function category_item_click(e1)
{
	try
	{
		current_display = 2;
		heading_grid.move();
		category_grid.exit();
		product_grid.enter();
		//setTimeout(function() { product_grid.enter() }, 500);
		
		lengthenSearchBar();
		peekComparator(true);
	}
	catch (e)
	{
		alert(e);
		alert(e.stack);
	}
}

/* Hides the category dropdown and lengthens the search bar */
function lengthenSearchBar()
{
	$('#span-search-instruction').html('Search for a Laptop');
	$('#inp-search-in').hide();
	$("#inp-search").animate(
	{
		width: '99%'
	}, 500);
}

/* Shorten the search bar and display the drop down list */
function reduceSearchBar()
{
	$('#span-search-instruction').html('Search for a Product');
	$("#inp-search").animate(
	{
		width: '48%'
	}, 500, 
	function() 
	{
		$('#inp-search-in').show();
	});
}

function btnSortByPrice_click()
{
	product_grid.sort = product_sortby_price;
	product_grid.move();
}

function btnSortByBrand_click()
{
	product_grid.sort = product_sortby_brand;
	product_grid.move();
}

function btnSortByRating_click()
{
	product_grid.sort = product_sortby_rating;
	product_grid.move();
}


function product_sortby_price(a, b)
{
	return a.min_price - b.min_price;
}

function product_sortby_brand(a, b)
{
	var c = a.brand.toLowerCase();
	var d = b.brand.toLowerCase();
	return c < d ? -1 : c > d ? 1 : 0;
}

function product_sortby_rating(a, b)
{
	return b.rating - a.rating;
}

function btnPriceRange_click()
{
	$('#budgetSelector').show();
}

function product_info_background_click()
{
	//product_grid.clearAlternateAnimation();
	//product_grid.move();
	//$('#product-info-background').hide();
}

function hideProductInfo()
{
	$('#product-info-background').hide();
}

function product_click(element)
{
	
	try
	{
		current_product = element.id;
		var product_dom = element.dom();
		$('#product-info-images').html(element.imagesHtml);
		$('#product-info-rating').html(element.ratingHtml);
		$('#product-info-brand').html(element.brand);
		$('#product-info-price').html('$' + element.min_price);
		$('#product-info-price-at').html('at ' + element.min_price_store);
		$('#product-info-model').html(element.model);
		$('#product-info-image').html(element.imagesHtml);
		
		var spec_table = new Table('product-info-specifications', 'product_spec_style', 'table_row', 'table_alternate_row', 'table_heading');
		spec_table.addColumn('Specification', false, 0.4);
		spec_table.addColumn('Description', false, 0.6);
		
		spec_table.addRow([ 'RAM', element.ram ]);
		spec_table.addRow([ 'HDD', element.hdd ]);
		spec_table.addRow([ 'Processor', element.cpu ]);
		spec_table.addRow([ 'Processing Speed', element.cpu_speed ]);
		spec_table.addRow([ 'GPU', element.gpu ]);
		spec_table.addRow([ 'Screen', element.screen ]);
		spec_table.addRow([ 'Screen Size', element.screen_size ]);
		spec_table.addRow([ 'Operating System', element.os ]);
		spec_table.addRow([ 'Offers', element.ram ]);
		
		spec_table.drawTable();
		
		var store_table = new Table('product-info-stores', 'product_store_style', 'table_row', 'table_alternate_row', 'table_heading');
		store_table.addColumn('Store', false, 0.6);
		store_table.addColumn('Price', false, 0.4);
		
		for (var x = 0; x < element.stores.length; x++)
		{
			var s = element.stores[x];
			store_table.addRow([s.store, '$' + s.price]);
		}
		
		store_table.drawTable();
		
		if (!element.review_table)
		{
			var review_table = new Table('product-info-reviews', 'product_reviews_style', 'table_row', 'table_alternate_row', 'table_heading');
			review_table.addColumn('Name', false, 0.2);
			review_table.addColumn('Reviews', false, 0.8);
			
			var theName = takeRandom(fake_names, 1)[0];
			review_table.addRow([theName, theName + ' was here, this is awesome product. Buy it!!']);
			
			review_table.drawTable();
			element.review_table = review_table;
		}
		else
		{
			element.review_table.drawTable();
		}
		
		if (in_comparator.length >= 3)
		{
			$('#product-info-add-notebook').hide();
		}
		else
		{
			if (in_comparator.indexOf(element) == -1)
			{
				$('#product-info-add-notebook').show();
			}
			else
			{
				$('#product-info-add-notebook').hide();
			}
		}
		
		if (logged_in)
		{
			$('#product-info-add-bookmark').show();
		}
		else
		{
			$('#product-info-add-bookmark').hide();
		}
		
		$('#product-info-background').show();
		
	}
	catch (e)
	{
		alert(e);
		alert(e.stack);
	}
}

function hideComparator(animate)
{
	if (animate)
	{
		$('#comparator').animate(
		{
			left: $(window).width() + 50
		}, 500);
	}
	else
	{
		$('#comparator').css('left', $(window).width() + 50);
	}
	
	$('#comparator-notebook-icon').data('open', '0');
}

function peekComparator(animate)
{	
	if (in_comparator.length == 0)
	{
		//alert('not peeking');
		$('#comparator-background').hide();
	}
	else
	{
	//alert('peeking');
		$('#comparator-background').show();
		
	}
}

function showComparator(animate)
{
	if (animate)
	{
		$('#comparator').animate(
		{
			left: 0
		}, 500);
	}
	else
	{
		$('#comparator').css('left', 0);
	}
	
	$('#comparator-notebook-icon').data('open', '1');
}

function addToComparator(productId)
{
	var product = product_grid.elements[productId];
	if (product)
	{
		if (in_comparator.length < 3)
		{
			in_comparator.push(product);
			//$('#compare-products').prop('disabled', false);
		}
		
		return true;
	}
	
	return false;
}

function drawOnComparator()
{
	var content = $('#comparator-temporary');
	var html = '';
	html += '<div style="text-align: center; vertical-align: middle; height: 45px"> You have ' + in_comparator.length + ' item(s) in the comparator.</div>';
	/*for (var i = 0; i < in_comparator.length; i++)
	{
		var product = in_comparator[i];
		html += '<div class="comparator-item" style="height: 100%; width: 30%; margin-right: 10px;">';
		html += '<div style="width: 100%; height: 75%; background-image: url(' + product.mainImage + '); background-size: contain; background-position: center; background-color: #fff; background-repeat: no-repeat;"></div>';
		html += '<div style="padding: 10px"><div class="product_detail_brand" style="margin-top: 10px;">' + product.brand + '</div>';
		html += '<div>' + product.model + '</div></div>';
		html += '</div>';
	}*/
	
	content.html(html);
}

function btn_addtonotebook_clicked()
{
	var productId = current_product;
	addToComparator(productId);
	drawOnComparator();
	//product_info_background_click();
	hideProductInfo();
	peekComparator();
	//showComparator(true);
}

function showLoginButton()
{
	$('#login-background').show();
}

function login_cancel()
{
	$('#login-background').hide();
}

function login_do()
{
	$('#login-background').hide();
	logged_in = true;
	current_user = $('#txtusername').val();
	current_user = current_user == '' ? 'Anonymous' : current_user;
	
	$('#login').hide();
	$('#login-info').show();
	$('#login-info').html(current_user);
}


