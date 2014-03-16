/* Muhammad Mustaqim */
/* For IDP Team G2T2 */
/* Requires jQuery */
var productInfo_currentId = '';
var searchCriteria = '';
var current_user = '';
var logged_in = false;

var in_comparator = [];
var in_bookmark = [];

function takeRandom(arr, count)
{
	var newArr = [];
	var takeArr = [];
	
	for (var i = 0; i < arr.length; i++)
	{
		newArr.push(arr[i]);
	}
	
	var numberToTake = (count < newArr.length ? count : newArr.length);
	for (var i = 0; i < numberToTake; i++)
	{
		var takeIndex = Math.floor(Math.random() * newArr.length);
		takeArr.push(newArr[takeIndex]);
		redim(newArr, takeIndex);
	}
	
	return takeArr;
}

function redim(arr, ignoreIndex)
{
	var newArr = [];
	for (var i = 0; i < newArr.length; i++)
	{
		if (i != ignoreIndex)
		{
			newArr.push(arr[i]);
		}
	}
	
	return newArr;
}

try
{

var fake_names = ['Mustaqim', 'Max', 'Yiling', 'Yvonne', 'Fransisca', 'Albert', 'James', 'John', 'Hilmi', 'Jessica'];
var products_grid = null;
var product_info_grid = null;
var stores = [ 'Courts', 'Harvey Norman', 'Best Denki', 'Sim Lim Square', 'Gain City' ];
var ram = [ '4GB', '6GB', '8GB' ];
var hdd = [ '250GB HDD', '500GB HDD', '750GB HDD', '1TB HDD', '2TB HDD', '500GB HDD + 100GB SDD', '250GB HDD + 100GB SDD' ];
var cpu = [ 'AMD Athlon', 'Intel i5', 'Intel i7', 'Intel Core 2' ];
var cpu_speed = [ '2.0Ghz', '2.3Ghz', '2.17Ghz', '2.56Ghz' ];
var cpu_core = [ 2, 4, 8 ];
var gpu = [ 'NVIDIA', 'AMD', 'Intel Integrated' ];
var screen = [ 'LCD', 'Retina', 'AMOLED' ];
var screen_size = [ '13"', '15"', '17"' ];
var os = [ 'Windows XP', 'Windows 7', 'Windows 8' ];
var freebies = [ 'Mouse', 'External Harddisk', 'Thumbdrives', 'Travel Case', 'Laptop Cleaning Tool', 'Stand a chance to Win XBOX One', 'Stand a chance to win Nokia Lumia 928',
 'Stand a chance to Win Apple MacBook Pro' ];

var products = [];
products.push({
	brand: 'Acer',
	model: 'e1',
	decription: '',
	images: 
	[
		'assets/ACER/1.jpg',
		'assets/ACER/2.jpg'
	]
});

products.push({
	brand: 'ASUS',
	model: 'G750JX-T4064H',
	decription: '',
	images: 
	[
		'assets/ASUS/G750JX-T4064H/1.jpg',
		'assets/ASUS/G750JX-T4064H/2.jpg',
		'assets/ASUS/G750JX-T4064H/3.jpg',
		'assets/ASUS/G750JX-T4064H/4.jpg'
	]
});

products.push({
	brand: 'ASUS',
	model: 'N750JV-T4014H',
	decription: '',
	images: 
	[
		'assets/ASUS/N750JV-T4014H/1.jpg',
		'assets/ASUS/N750JV-T4014H/2.jpg',
		'assets/ASUS/N750JV-T4014H/3.jpg'
	]
});

products.push({
	brand: 'ASUS',
	model: 'X450CC-WX064H',
	decription: '',
	images: 
	[
		'assets/ASUS/X450CC-WX064H/1.jpg',
		'assets/ASUS/X450CC-WX064H/2.jpg',
		'assets/ASUS/X450CC-WX064H/3.jpg',
		'assets/ASUS/X450CC-WX064H/3.jpg'
	]
});

products.push({
	brand: 'HP',
	model: 'DV6-7309TX',
	decription: '',
	images: 
	[
		'assets/HP/DV6-7309TX/1.jpg',
		'assets/HP/DV6-7309TX/2.jpg'
	]
});

products.push({
	brand: 'HP',
	model: 'ENVY TouchSmart 15-j005TX',
	decription: '',
	images: 
	[
		'assets/HP/ENVY-TouchSmart-15-j005TX/1.jpg',
		'assets/HP/ENVY-TouchSmart-15-j005TX/2.jpg',
		'assets/HP/ENVY-TouchSmart-15-j005TX/3.jpg'
	]
});

products.push({
	brand: 'Lenovo',
	model: 'Flex14-59392141',
	decription: '',
	images: 
	[
		'assets/LENOVO/Flex14-59392141/1.jpg',
		'assets/LENOVO/Flex14-59392141/2.jpg',
		'assets/LENOVO/Flex14-59392141/3.jpg'
	]
});

products.push({
	brand: 'Lenovo',
	model: 'Y510p-59389485',
	decription: '',
	images: 
	[
		'assets/LENOVO/Y510p-59389485/1.jpg',
		'assets/LENOVO/Y510p-59389485/2.jpg',
		'assets/LENOVO/Y510p-59389485/3.jpg',
		'assets/LENOVO/Y510p-59389485/4.jpg'
	]
});

products.push({
	brand: 'SONY',
	model: 'VAIO Fit 15e',
	decription: '',
	images: 
	[
		'assets/SONY/1.jpg',
		'assets/SONY/2.jpg'
	]
});

products.push({
	brand: 'TOSHIBA',
	model: 'VAIO Fit 15e',
	decription: '',
	images: 
	[
		'assets/TOSHIBA/1.jpg',
		'assets/TOSHIBA/2.jpg',
		'assets/TOSHIBA/3.jpg',
		'assets/TOSHIBA/4.jpg',
		'assets/TOSHIBA/5.jpg',
	]
});


$(document).ready(function()
{
	product_grid = new Grid('product', 'stage', 'product-template', false, false);
	product_grid.map('$$$ID$$$', 'id');
	product_grid.map('$$$BRAND$$$', 'brand');
	product_grid.map('$$$MODEL$$$', 'model');
	product_grid.map('###PRICE###', 'min_price');
	product_grid.map('$$$MINPRICESTORE$$$', 'min_price_store');
	product_grid.map('$$$URL$$$', 'mainImage');
	product_grid.map('$$$RATING$$$', 'ratingHtml');
	product_grid.map('$$$IMAGES$$$', 'imagesHtml');
	product_grid.click = product_click;
	product_grid.search = search_product;
	product_grid.setNoResultTemplate('product-no-result-template');
	product_grid.sort = product_sortby_price;
	
	for (var i = 0; i < products.length; i++)
	{
		var product = products[i];
		product.mainImage = product.images[0];
		product.ram = takeRandom(ram, 1)[0];
		product.hdd = takeRandom(hdd, 1)[0];
		product.cpu = takeRandom(cpu, 1)[0];
		product.cpu_speed = takeRandom(cpu_speed, 1)[0];
		product.cpu_core = takeRandom(cpu_core, 1)[0];
		product.gpu = takeRandom(gpu, 1)[0];
		product.screen = takeRandom(screen, 1)[0];
		product.screen_size = takeRandom(screen_size, 1)[0];
		product.os = takeRandom(os, 1)[0];
		product.freebies = takeRandom(freebies, 3);
		product.stores = [];
	
		
		var store = takeRandom(stores, 3);
		var price = Math.floor(Math.random() * 2000) + 500;
		var minPrice = 3000;
		var maxPrice = 500;
		var minPriceStore = '';
		var maxPriceStore = '';
		
		for (var j = 0; j < store.length; j++)
		{
			var s = store[j];
			var difference = Math.floor(Math.random() * 100) - 50;
			var newPrice = price + difference;
			
			if (newPrice < minPrice)
			{
				minPrice = newPrice;
				minPriceStore = s;
			}
			
			if (newPrice > maxPrice)
			{
				maxPrice = newPrice;
				maxPriceStore = s;
			}
			
			product.stores.push(
			{
				store: s,
				price: newPrice
			});
		}
		
		product.min_price = minPrice;
		product.max_price = maxPrice;
		product.min_price_store = minPriceStore;
		product.max_price_store = maxPriceStore;
		product.rating = Math.floor(Math.random() * 5, 1);
		
		var nRating = Math.floor(product.rating);
		var nNoRating = 5 - Math.ceil(product.rating);
		var nHalfRating = 5 - nRating - nNoRating;
		
		var ratingHtml = '';
		
		for (var k = 0; k < nRating; k++) ratingHtml += '<img src="assets/rating.png" style="width: 25px; height 25px" />';
		for (var k = 0; k < nHalfRating; k++) ratingHtml += '<img src="assets/halfrating.png" style="width: 25px; height 25px" />';
		for (var k = 0; k < nNoRating; k++) ratingHtml += '<img src="assets/norating.png" style="width: 25px; height 25px" />';
		
		product.ratingHtml = ratingHtml;
		
		var imageHtml = '';
		for (var k = 0; k < product.images.length; k++)
		{
			imageHtml += '<div class="image product-image" data-replace="product_block_image_' + product_grid.name + (product_grid.____id) + '" style="background-image: url(' + product.images[k] + ')"></div>'
		}
		
		product.imagesHtml = imageHtml;
		product_grid.addElement(product);
		
		/*var spec_table = new Table('product_spec_' + product.id, 'product_spec_style', 'table_row', 'table_alternate_row', 'table_heading');
		spec_table.addColumn('Specification', false, 0.4);
		spec_table.addColumn('Description', false, 0.6);
		
		spec_table.addRow([ 'RAM', product.ram ]);
		spec_table.addRow([ 'HDD', product.hdd ]);
		spec_table.addRow([ 'Processor', product.cpu ]);
		spec_table.addRow([ 'Processing Speed', product.cpu_speed ]);
		spec_table.addRow([ 'GPU', product.gpu ]);
		spec_table.addRow([ 'Screen', product.screen ]);
		spec_table.addRow([ 'Screen Size', product.screen_size ]);
		spec_table.addRow([ 'Operating System', product.os ]);
		spec_table.addRow([ 'Offers', product.ram ]);
		
		spec_table.drawTable();*/
		//spec_table.move();
		
		/*product.spec_table = spec_table;
		
		var store_table = new Table('product_stores_' + product.id, 'product_store_style', 'table_row', 'table_alternate_row', 'table_heading');
		store_table.addColumn('Store', false, 0.6);
		store_table.addColumn('Price', false, 0.4);
		
		for (var x = 0; x < product.stores.length; x++)
		{
			var s = product.stores[x];
			store_table.addRow([s.store, '$' + s.price]);
		}
		
		store_table.drawTable();
		product.store_table = store_table;*/
		//alert('drawn');
		//store_table.move();		
	}
	
	
		$('#inp-search-submit').click(search_button_clicked);
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
		
		});
		
	//	product_info_grid.out(JSON.stringify(product_info_grid.elements));
});

}
catch (eeee)
{
	alert(eeee);
	alert(eeee.stack);
}

function clone(obj)
{
	return JSON.parse(JSON.stringify(obj));
}

function search_product(product)
{
	try
	{
		if (searchCriteria == '') return true;
		//alert(JSON.stringify(product));

		var terms = searchCriteria.split(' ');
		for (var i = 0; i < terms.length; i++)
		{
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
	category_item_click();
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
					
					var review_table = element.review_table;
					review_table.addRow([current_user, txt.val()]);
					review_table.drawTable();
					//alert('written');
					txt.val('');
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

function product_image_clicked()
{
//alert('in');
	var that = $(this);
	var url = that.css('background-image');
	//ale000rt(url);
	var replace = that.data('replace');
	var block = $('#' + replace);
	//alert(JSON.stringify(block));
	
	block.css('background-image', url);
}

function comparator_notebook_icon_clicked()
{
	var on = $(this).data('open');
	if (on == '0')
	{
		showComparator(true);
	}
	else
	{
		peekComparator(true);
	}
}

function btn_compare_clicked()
{

	if (in_comparator.length == 0)
	{
		$('#comparator-stage-background').hide();
		return;
	}

	/*hideComparator(true);*/
	var spec_table = new Table('comparer', 'product_spec_style', 'table_row', 'table_alternate_row', 'table_heading');
	spec_table.addColumn('Specification', false, 0.25);
	
	for (var i = 0; i < in_comparator.length; i++)
	{
		var product = in_comparator[i];
		spec_table.addColumn('<div class="comparatorImg" data-remove="'+ product.id +'" style="background-image:url(' + product.mainImage + '); background-size: contain; background-repeat: no-repeat; width: 100%; height: 200px;" ></div><br/>' +  product.brand + ' ' + product.model, false, 0.25);
	}
	
	var specs = ['Rating', 'Minimum Price', 'Best Store',  'RAM', 'HDD', 'Processor', 'Processing Speed', 'Number of Cores', 'GPU', 'Screen Type', 'Screen Size', 'Operating System'];
	var coll = ['ratingHtml', 'min_price', 'min_price_store', 'ram', 'hdd', 'cpu', 'cpu_speed', 'cpu_core', 'gpu', 'screen', 'screen_size', 'os'];
	
	$(document).on("click", ".comparatorImg", function() 
	{
		var toRemove = $(this).data('remove');
		for (var m = 0; m < in_comparator.length; m++)
		{
			var p = in_comparator[m];
			if (p.id == toRemove)
			{
				in_comparator.splice(m, 1);
				break;
			}
		}
		
		btn_compare_clicked();
		drawOnComparator();
		peekComparator();
	});
	
	
	for (var i = 0; i < 9; i++)
	{
		
		var attribute = coll[i];
		var specName = specs[i];
			
		var row = [];
		row.push(specName);
	
		for (var j = 0; j < in_comparator.length; j++)
		{
			var product = in_comparator[j];
			row.push(product[attribute]);
		}
		
		spec_table.addRow(row);
	}
	
	spec_table.drawTable();
	//$('#comparator-background').css('top', '0px').css('bottom', '0px');
	$('#comparator-stage-background').show();

	/*$('#stage-wrapper').animate({
		height: 0
	}, 500, function() 
	{
		$(this).hide();
	});
	
	$('#comparator-stage').show();
	$('#comparator-stage').animate({
		height: $(window).height()
	}, 500);*/
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