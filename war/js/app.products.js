/**
 * 
 */


var fake_names = ['Mustaqim', 'Max', 'Yiling', 'Yvonne', 'Fransisca', 'Albert', 'James', 'John', 'Hilmi', 'Jessica'];
var product_grid = null;
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

var spec_def = 
{ 
	"RAM" : 
	{
		definition: "Computer memory.",
		tip: "If you are running applications like Photoshop and games, the more RAM your computer has, the faster the program runs."
	},
	
	"HDD" : 
	{
		definition: "Hard Disk Drive. Saved data is stored in here.",
		tip: "If you need to save large amounts of data, a larger hard disk drive will be better. "
	},
	
	"Processor" : 
	{
		definition: "A chip inside the computer that receive and execute instructions.",
		tip: "A more powerful CPU helps with more demanding tasks in a faster speed."
	},
	
	"Processor Speed" : 
	{
		definition: "Number of cycles per second at which the processor of a computer operates and is able to process information.",
		tip: "The higher the processor speed, the faster the information is outputted"
	},
	
	"Screen Type" : 
	{
		definition: "Used to display the output of a computer to the user",
		tip: ""
	},
	
	"Screen Size" : 
	{
		definition: "Dimensions of the screen.",
		tip: ""
	},
	
	"Operating System" : 
	{
		definition: "Manages all other programs in a computer. Communicates with the hardware and allows programs to run.",
		tip: ""
	}
}


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
	product_grid.map('$$$COMPARATORACTION$$$', 'comparatorAction')
	product_grid.map('$$$URL$$$', 'mainImage');
	product_grid.map('$$$RATING$$$', 'ratingHtml');
	product_grid.map('$$$IMAGES$$$', 'imagesHtml');
	product_grid.click = product_click;
	product_grid.search = search_product;
	product_grid.setNoResultTemplate('product-no-result-template');
	product_grid.sort = product_sortby_rating;
	product_grid.elementClickable = true;
	
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
		
		product.comparatorAction = 'Compare';
		product.otherClasses = '';
	
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
				price: newPrice,
				freebies: takeRandom(freebies, 3)
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
	}
});
