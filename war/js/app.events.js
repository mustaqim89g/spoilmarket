/**
 * 
 */

$(document).ready(function()
{
	$('#nav-logo').click(navlogo_click);
	
	// Subscribe events here
	$('.category').hover(category_hover, category_hover_out);
	$('.category').each(category_apply_image);
	$('.category').click(category_click);
	
	$('#btnSignIn').click(btnSignIn_click);
	$('#btnDoLogin').click(btnDoLogin_click);
	
	$('#sort-by-rating').click(btnSortByRating_click);
	$('#sort-by-price').click(btnSortByPrice_click);
	$('#sort-by-brand').click(btnSortByBrand_click);
	//$('.btnViewProductInfo').click(btnViewProductInfo_click);
	//$('.btnCompareProduct').click(btnProductToComparator_click);
	$('.backToSearch').click(btnBackToSearch_click);
	$('.backToProductInfo').click(backToProductInfo_click);
	
	$('#tab-specs').click(tab_specs_clicked);
	$('#tab-stores').click(tab_stores_clicked);
	$('#tab-reviews').click(tab_reviews_clicked);
	
	$('.product_info_addtonotebook').click(btn_addtonotebook_clicked);
	$('.product-review-textbox').keypress(product_review_keypress);
	$('.comparator-button').click(btn_comparator_click);
	$('#product-info-add-bookmark').click(btn_product_info_addbookmark_click);
	$('.bookmark-button').click(btnBookmark_click);
	$('#inp-search-submit').click(search_button_clicked);
	$('#inp-startover-submit').click(startover_button_clicked);
	
	/*$('#inp-search-submit').click(search_button_clicked);
	$('.product-review-textbox').keypress(product_review_keypress);
	$('.product-image').click(product_image_clicked);
	$('#comparator-notebook-icon').click(comparator_notebook_icon_clicked);
	$('#product-info-background').click(product_info_background_click);
	$('.product_info_addtonotebook').click(btn_addtonotebook_clicked);
	$('#compare-products').click(btn_compare_clicked);
	$('#tab-specs').click(tab_specs_clicked);
	$('#tab-stores').click(tab_stores_clicked);
	$('#tab-reviews').click(tab_reviews_clicked);
	$('.login-btn').click(showLoginButton);
	$('#cancelLogin').click(login_cancel);
	$('#btnlogin').click(login_do);
	$('#comparator-temporary').click(btn_compare_clicked);
	
	$('.close').click(function() {
		
		$('#login-background').hide();
		$('#product-info-background').hide();
		$('#comparator-stage-background').hide();
	
	});
	
	$('#product-info-add-bookmark').click(function() {
	
		in_bookmark.push(product.id);
		$('#login-background').hide();
		$('#product-info-background').hide();
		$('#comparator-stage-background').hide();
	
	});*/
	
});


// Add all other function for events here
function category_hover()
{
	$('#category-the-info').html('Perhaps a ' + $(this).data('label') + '?');
}

function category_hover_out()
{
	$('#category-the-info').html(
			'You can always find and compare products here, from lots of stores and for lots of models. <br /><br />Start by selecting the specific category over on the right. Or enter the keyword on the search box above.');
}

function category_apply_image()
{
	$(this).css('background-image', 'url(assets/' + $(this).data('image') + '.jpg)');
	$(this).html('<div class="category-text">' + $(this).data('label') + '</div>');
}

function category_click()
{
	try
	{
		setStage('product-stage');
		reestablishProductGrid();
		updateBookmarkButton();
		lengthenSearchBar();
	}
	catch (e)
	{
		alert(e);
		alert(e.stack);
	}
}

function btnViewProductInfo_click()
{	
	var id = $(this).data('id');
	var element = product_grid.elements[id];
	if (element)
	{
		product_click(element);
	}
}

function btnProductToComparator_click()
{
	var id = $(this).data('id');
	var action = $(this).data('action');
	var element = product_grid.elements[id];
	
	if (action == 'Compare')
	{
		addToComparator(element);
	}
	else if (action == "Don't Compare")
	{
		removeFromComparator(element);
	}
}

function btnBackToSearch_click()
{
	setStage('product-stage');
}




function search_product(product)
{
	try
	{
		if (searchCriteria == '' && !in_bookmark_mode) return true;
		//alert(JSON.stringify(product));

		
		var terms = searchCriteria.split(' ');
		for (var i = 0; i < terms.length; i++)
		{
			if (in_bookmark_mode)
			{
				var index = in_bookmark.indexOf(product);
				if (index == -1)
				{
					return false;
				}
			}
			
			var term = terms[i];
			if (!search_contains(product.model, term, 1) && 
			!search_contains(product.brand, term, 2) && 
			!search_contains(product.ram, term, 3) && 
			!search_contains(product.hdd, term, 4) && 
			!search_contains(product.cpu, term, 5) && 
			!search_contains(product.cpu_speed, term, 6) && 
			!search_contains(product.gpu, term, 8) && 
			!search_contains(product.screen, term, 9) && 
			!search_contains(product.screen_size, term, 10))
			{
				return false;
			}
		}
	}
	catch (e)
	{
		alert(e);
	}
	
	return true;
}

function search_contains(largeString, smallString, count)
{
	return largeString.toLowerCase().indexOf(smallString.toLowerCase()) != -1;
}

function search_button_clicked()
{
	searchCriteria = $('#inp-search').val();
	category_click();
	
	if (searchCriteria != '')
	{
		$('#inp-startover-submit').show();
	}
	else
	{
		$('#inp-startover-submit').hide();
	}
}


function product_review_keypress(e)
{
	try
	{
		//alert('in');
		code = (e.keyCode ? e.keyCode : e.which);
		//alert(code);
		if (code == 13) 
		{
		//alert('enter');
			if (current_user != '')
			{
				//alert('passuser');
				var txt = $(this);
				
				if (txt.val() != '')
				{
				//alert('passtext');
					var product_id = current_product;
					var element = product_grid.elements[product_id];
					element.reviews.push({
						name: current_user,
						review: txt.val(),
						vote: 0
					});
					
					txt.val('');
					element.reviews.sort(function(a, b) { return b.vote - a.vote; });
					drawReviewTable(element);
				}
			}
			
			e.preventDefault();
		
		}
	}
	catch (ll)
	{
		alert(ll);
		alert(ll.stack);
	}
}

function btn_addtonotebook_clicked()
{
	var id = current_product
	var element = product_grid.elements[id];
	
	if (in_comparator.indexOf(element) == -1)
	{
		addToComparator(element);
		$(this).html("Don't Compare");
	}
	else
	{
		removeFromComparator(element);
		$(this).html('Compare this Product');
	}
}

function displayComparator()
{
	if (in_comparator.length == 0)
	{
		setStage('product-stage');
		return;
	}

	/*hideComparator(true);*/
	var spec_table = new Table('comparing-ground', 'product_spec_style', 'table_row', 'table_alternate_row', 'table_heading');
	spec_table.addColumn('Specification', false, 0.25);
	
	for (var i = 0; i < in_comparator.length; i++)
	{
		var product = in_comparator[i];
		spec_table.addColumn('<div class="comparator-deleter" data-remove="' + product.id + '"></div><div class="comparator-image" data-remove="'+ product.id +'" style="background-image:url(' + product.mainImage + '); background-size: contain; background-repeat: no-repeat; width: 100%; height: 200px;" ></div><br/>' +  product.brand + ' ' + product.model, false, 0.25);
	}
	
	var specs = ['Rating', 'Minimum Price ($)', 'Best Store',  'RAM', 'HDD', 'Processor', 'Processing Speed', 'Number of Cores', 'GPU', 'Screen Type', 'Screen Size', 'Operating System'];
	var coll = ['ratingHtml', 'min_price', 'min_price_store', 'ram', 'hdd', 'cpu', 'cpu_speed', 'cpu_core', 'gpu', 'screen', 'screen_size', 'os'];
	
	for (var i = 0; i < coll.length; i++)
	{
		
		var attribute = coll[i];
		var specName = specs[i];
		
		var theTip = '';
		var tipObj = spec_def[specName];
		if (tipObj)
		{
			specName = '<div class="left">' + specName + '</div>';
			theTip = '<div class="tip"><div class="tip-content"><div>' + tipObj.definition + '</div><div>' + tipObj.tip + '</div></div></div>';
			specName += theTip;
		}
			
		var row = [];
		row.push(specName);
	
		for (var j = 0; j < in_comparator.length; j++)
		{
			var product = in_comparator[j];
			row.push(product[attribute]);
		}
		
		spec_table.addRow(row);
	}
	
	for (var i = 0; i < 3; i++)
	{
		var store_row = [];
		var price_row = [];
		var freebies_row = [];
		
		store_row.push("Store");
		price_row.push("&nbsp;&nbsp;&nbsp;&nbsp;Price ($)");
		freebies_row.push("&nbsp;&nbsp;&nbsp;&nbsp;Freebies");
		
		for (var col = 0; col < in_comparator.length; col++)
		{
			var element = in_comparator[col];
			var store = element.stores[i];
			
			store_row.push('<span style="font-size: 14pt; font-weight: bold">' + store.store + '</span>');
			price_row.push(store.price);
			
			var freebiesList = "<ul>";
			for (var m = 0; m < store.freebies.length; m++)
			{
				freebiesList += "<li>" + store.freebies[m] + "</li>";
			}
			freebiesList += "</ul>";
			
			freebies_row.push(freebiesList);
		}
		
		spec_table.addRow(store_row);
		spec_table.addRow(price_row);
		spec_table.addRow(freebies_row);
		
	}
	
	spec_table.drawTable();
	$(document).off('click', '.comparator-deleter').on('click', '.comparator-deleter', function()
	{
		var id = $(this).data('remove');
		//alert(id);
		var element = product_grid.elements[id];
		
		removeFromComparator(element);
		//displayComparator();
		var percent = 25;
		percent += in_comparator.length * 25;
		
		$('#comparing-ground').width(percent + '%');
		displayComparator();
	});

}

function btnSignIn_click()
{
	setStage('login-stage');
}

function btnDoLogin_click()
{
	var userName = $('#txtUserName').val();
	userName = userName.trim() == '' ? 'Anonymous' : userName;
	
	$('#btnSignOut').html('<span class="user-name">' + userName + '</span>&nbsp;Sign Out');
	current_user = userName;
	logged_in = true;
	
	$('#whenLoggedOut').hide();
	$('#whenLoggedIn').show();
	
	setStage('category-stage');
}

function tab_specs_clicked()
{
	$('#tab-specs').attr('class', 'tab_active');
	$('#tab-stores').attr('class', 'tab');
	$('#tab-reviews').attr('class', 'tab');
	
	$('#product-info-spec-block').show();
	$('#product-info-stores-block').hide();
	$('#product-info-review-block').hide();
}

function tab_stores_clicked()
{
	$('#tab-specs').attr('class', 'tab');
	$('#tab-stores').attr('class', 'tab_active');
	$('#tab-reviews').attr('class', 'tab');
	
	$('#product-info-spec-block').hide();
	$('#product-info-stores-block').show();
	$('#product-info-review-block').hide();
}

function tab_reviews_clicked()
{
	$('#tab-specs').attr('class', 'tab');
	$('#tab-stores').attr('class', 'tab');
	$('#tab-reviews').attr('class', 'tab_active');
	
	$('#product-info-spec-block').hide();
	$('#product-info-stores-block').hide();
	$('#product-info-review-block').show();
}


function btnSortByPrice_click()
{
	product_grid.sort = product_sortby_price;
	reestablishProductGrid();
}

function btnSortByBrand_click()
{
	product_grid.sort = product_sortby_brand;
	reestablishProductGrid();
}

function btnSortByRating_click()
{
	product_grid.sort = product_sortby_rating;
	reestablishProductGrid();
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
		$('#map-product-image').css('background-image', 'url(' + element.mainImage + ')');
		$('#map-product-rating').html(element.ratingHtml);
		$('#map-product-brand').html(element.brand);
		$('#map-product-model').html(element.model);
		
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
		
		spec_table.addRow([ wrapInSpecDef('RAM'), element.ram ]);
		spec_table.addRow([ wrapInSpecDef('HDD'), element.hdd ]);
		spec_table.addRow([ wrapInSpecDef('Processor'), element.cpu ]);
		spec_table.addRow([ wrapInSpecDef('Processing Speed'), element.cpu_speed ]);
		spec_table.addRow([ wrapInSpecDef('GPU'), element.gpu ]);
		spec_table.addRow([ wrapInSpecDef('Screen'), element.screen ]);
		spec_table.addRow([ wrapInSpecDef('Screen Size'), element.screen_size ]);
		spec_table.addRow([ wrapInSpecDef('Operating System'), element.os ]);
		spec_table.addRow([ wrapInSpecDef('Offers'), element.ram ]);
		
		spec_table.drawTable();
		
		if (logged_in)
		{
			$('.product_review_box_cannot').hide();
			$('.product_review_box').show();
		}
		else
		{
			$('.product_review_box_cannot').show();
			$('.product_review_box').hide();
		}
		
		var store_table = new Table('product-info-stores', 'product_store_style', 'table_row', 'table_alternate_row', 'table_heading');
		var map_store_table = new Table('map-product-stores', 'product_store_style', 'table_row', 'table_alternate_row', 'table_heading');
		store_table.addColumn('Store', false, 0.4);
		store_table.addColumn('Price', false, 0.4);
		store_table.addColumn('', false, 0.2);
		map_store_table.addColumn('Store', false, 0.4);
		map_store_table.addColumn('Price', false, 0.2);
		map_store_table.addColumn('', false, 0.4);
		
		for (var x = 0; x < element.stores.length; x++)
		{
			var s = element.stores[x];
			store_table.addRow([s.store, '$' + s.price, '<button class="btnLocateStore" data-index="' + x + '" data-store="'+ s.store +'">Locate Store</button>']);
			map_store_table.addRow([s.store, '$' + s.price, '<button class="btnLocateStore-map" data-index="' + x + '" data-store="'+ s.store +'">Locate Store</button>']);
		}
		
		store_table.drawTable();
		map_store_table.drawTable();
		$(document).off('click', '.btnLocateStore').on('click', '.btnLocateStore', btnLocateStore_click);
		$(document).off('click', '.btnLocateStore-map').on('click', '.btnLocateStore-map', btnLocateStore_map_click);
		
		if (!element.reviews)
		{
			// create fake reviews
			element.reviews = element.reviews || [];
			for (var l = 0; l < 3; l++)
			{
				var theName = takeRandom(fake_names, 1)[0];
				element.reviews.push({
					name : theName,
					review : theName + ' was here, this is awesome product. Buy it!!',
					vote : Math.floor(Math.random() * 5)
				});
			}
			
		}

		element.reviews.sort(function(a, b) { return b.vote - a.vote; });
		drawReviewTable(element);
		

		$('#product-info-add-notebook').prop('disabled', false);
		if (in_comparator.indexOf(element) == -1)
		{
			if (in_comparator.length >= 3)
			{
				$('#product-info-add-notebook').prop('disabled', true);
				$('#product-info-add-notebook').html('Cannot Compare');
			}
			else
			{
				$('#product-info-add-notebook').html('Compare this Product');
			}
		}
		else
		{
			$('#product-info-add-notebook').html("Don't Compare");
		}
		
		setStage('product-infomation-stage');
		
	}
	catch (e)
	{
		alert(e);
		alert(e.stack);
	}
}

function wrapInSpecDef(specName)
{
	var theTip = '';
	var tipObj = spec_def[specName];
	if (tipObj)
	{
		specName = '<div class="left">' + specName + '</div>';
		theTip = '<div class="tip"><div class="tip-content"><div>' + tipObj.definition + '</div><div>' + tipObj.tip + '</div></div></div>';
		specName += theTip;
	}
	
	return specName;
}


function drawReviewTable(element)
{

	var review_table = new Table('product-info-reviews', 'product_reviews_style', 'table_row', 'table_alternate_row', 'table_heading');
	review_table.addColumn('Vote', false, 0.1);
	review_table.addColumn('Reviews', false, 0.9);
	review_table.showHeading = false;
	
	for (var l = 0; l < element.reviews.length; l++)
	{
		var review = element.reviews[l];
		var theVotingHtml = 
			'<div class="up-vote" data-index="' + l + '" data-element="' + element.id + '"></div>' +
			'<div class="vote-number">' + review.vote + '</div>' + 
			'<div class="down-vote" data-index="' + l + '" data-element="' + element.id + '"></div>'
		
		review_table.addRow([theVotingHtml, '<span style="font-weight: bold">' + review.name + '</span><br />' + review.review]);
	}
	
	review_table.drawTable();
	element.review_table = review_table;
	
	$(document).off('click', '.up-vote').on('click', '.up-vote', upvote_click);
	$(document).off('click', '.down-vote').on('click', '.down-vote', downvote_click);
}

function upvote_click()
{
	var index = $(this).data('index');
	var elementId  = $(this).data('element');
	var element = product_grid.elements[elementId];
	element.reviews[index].vote = element.reviews[index].vote + 1;
	
	element.reviews.sort(function(a, b) { return b.vote - a.vote; });
	drawReviewTable(element);
}

function downvote_click()
{
	var index = $(this).data('index');
	var elementId  = $(this).data('element');
	var element = product_grid.elements[elementId];
	element.reviews[index].vote = element.reviews[index].vote - 1;
	
	element.reviews.sort(function(a, b) { return b.vote - a.vote; });
	drawReviewTable(element);
}

function setStage(newStage)
{
	if (newStage.toLowerCase() != current_stage.toLowerCase())
	{
		$('#' + newStage).show();
		$('#' + current_stage).attr('class', '_stage_');
		$('#' + current_stage).css('z-index', '1');
		$('#' + newStage).attr('class', '_stage_ face');
		$('#' + newStage).css('z-index', '2');
		var theStage = current_stage;
		setTimeout(function() { $('#' + theStage).hide()}, 500);
		
		current_stage = newStage;
		updateComparatorButton();
		updateBookmarkButton();
		
		if (searchCriteria != '')
		{
			$('#inp-startover-submit').show();
		}
		else
		{
			$('#inp-startover-submit').hide();
		}
	}
}



function addToComparator(element)
{
	if (element)
	{
		if (in_comparator.indexOf(element) == -1)
		{
			element.comparatorAction = "Don't Compare";
			element.otherClasses = 'selected';
			in_comparator.push(element);
			
			reestablishProductGrid();
			updateComparatorButton();
			updateBookmarkButton();
		}
	}
}

function removeFromComparator(element)
{
	//alert('out');
	if (element)
	{
		//alert('in');
		var elementIndex = in_comparator.indexOf(element);
		if (elementIndex != -1)
		{
			in_comparator.splice(elementIndex, 1);
			element.comparatorAction = 'Compare';
			element.otherClasses = '';
			
			reestablishProductGrid();
			updateComparatorButton();
		}
	}
}

function reestablishProductGrid()
{
	product_grid.move();
	$(document).off('click', '.btnCompareProduct').on('click', '.btnCompareProduct', btnProductToComparator_click);
	$(document).off('click', '.btnViewProductInfo').on('click', '.btnViewProductInfo', btnViewProductInfo_click);
	$(document).off('click', '.btnBookmarkProduct').on('click', '.btnBookmarkProduct', btnBookmarkProduct_click);
}

function updateComparatorButton()
{
	$('.comparator-button').html('<span class="comparator-number">' + in_comparator.length + '</span>&nbsp;Product(s) to Compare');
	$('.comparator-button').prop('disabled', !(in_comparator.length > 1 && in_comparator.length < 4));

	$('.btnCompareProduct').each(function()
	{
		var id = $(this).data('id');
		var element = product_grid.elements[id];
		
		if (in_comparator.length >= 3)
		{
			if (in_comparator.indexOf(element) != -1)
			{
				$(this).prop('disabled', false);
			}
			else
			{
				$(this).prop('disabled', true);
			}
		}
		else
		{
			$(this).prop('disabled', false);
		}
	});

}

function btn_comparator_click()
{
	var percent = 25;
	percent += in_comparator.length * 25;
	
	$('#comparing-ground').width(percent + '%');
	displayComparator();
	setStage('comparing-stage');
}

function btnLocateStore_click()
{
	setStage('stores-stage');
	var store = $(this).data('store');
	setTimeout(function() 
	{ 
		setMap();
		clearMarkers();
		displayMarkersFrom(store);
	}, 1000);
}

function btnLocateStore_map_click()
{
	var store = $(this).data('store');
	setMap();
	clearMarkers();
	displayMarkersFrom(store);
}

function backToProductInfo_click()
{
	setStage('product-infomation-stage');
}

function btn_product_info_addbookmark_click()
{
	var element = product_grid.elements[current_product];
	
	var index = in_bookmark.indexOf(element);
	if (index == -1)
	{
		addElementToBookmark(element);
	}
	else
	{
		removeElementFromBookmark(element);
	}
	
	updateBookmarkButton();
	product_click(element);
}

function btnBookmarkProduct_click()
{
	var id = $(this).data('id');
	var element = product_grid.elements[id];
	
	var index = in_bookmark.indexOf(element);
	if (index == -1)
	{
		addElementToBookmark(element);
	}
	else
	{
		removeElementFromBookmark(element);
	}	
	
	updateBookmarkButton();
}

function addElementToBookmark(element)
{
	if (element)
	{
		if (logged_in)
		{
			if (in_bookmark.indexOf(element) == -1)
			{
				in_bookmark.push(element);
			}
		}
	}
}

function removeElementFromBookmark(element)
{
	if (element)
	{
		var index = in_bookmark.indexOf(element);
		if (index != -1)
		{
			in_bookmark.splice(index, 1);
		}
	}
}

function updateBookmarkButton()
{
	if (in_bookmark_mode)
	{
		$('.bookmark-button').html('Exit Bookmark')
	}
	else
	{
		$('.bookmark-button').html('<span class="comparator-number">'+ in_bookmark.length +'</span>&nbsp;&nbsp;Bookmarked Item(s)')
	}
	
	$('.btnBookmarkProduct').each(function()
		{
			var id = $(this).data('id');
			var element = product_grid.elements[id];
			var index = in_bookmark.indexOf(element);
			
			$(this).html(index == -1 ? 'Bookmark' : 'Unbookmark');
			
		});
	
	$('.product_info_bookmark').each(function()
	{
		var id = current_product;
		var element = product_grid.elements[id];
		var index = in_bookmark.indexOf(element);
		
		$(this).html(index == -1 ? 'Bookmark' : 'Unbookmark');
		
	});
	
	if (logged_in)
	{
		$('.bookmark-button').prop('disabled', false);
		$('.product_info_bookmark').prop('disabled', false);
		$('.btnBookmarkProduct').prop('disabled', false);
	}
	else
	{
		$('.bookmark-button').prop('disabled', true);
		$('.product_info_bookmark').prop('disabled', true);
		$('.btnBookmarkProduct').prop('disabled', true);
	}
}

function btnBookmark_click()
{
	if (in_bookmark_mode)
	{
		in_bookmark_mode = false;
		$(document.body).css('background-color', '#fff');
		$('#product-stage').css('background-color', '#fff');
	}
	else
	{
		in_bookmark_mode = true;
		$(document.body).css('background-color', '#aaa');
		$('#product-stage').css('background-color', '#aaa');
	}
	
	reestablishProductGrid();
	updateBookmarkButton();
}

function navlogo_click()
{
	setStage('category-stage');
	reduceSearchBar();
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

function startover_button_clicked()
{
	$('#inp-search').val('');
	searchCriteria = '';
	category_click();
	$(this).hide();
}
