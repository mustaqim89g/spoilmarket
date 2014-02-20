var categoryStage = null;
var productStage = null;

var products = [];
var harveyNorman = new Company(0, 'Harvey Norman');
var courts = new Company(1, 'Courts');
var bestDenki = new Company(2, 'Best Denski');

var highestBudget = 2200;


function addProduct(imageUrl, id, brand, model, description, hnPrice, cPrice, dbPrice, os, ram, proc, procSpeed, hdd, gpu, gpuSpeed, screen, screenType) {
	var product = new Product();
	product.attributes['brand'] = new ProductAttribute('Brand', brand);
	product.attributes['model'] = new ProductAttribute('Model', model);
	product.attributes['description'] = new ProductAttribute('Description', description);
	product.attributes['os'] = new ProductAttribute('Operating System', os);
	product.attributes['ram'] = new ProductAttribute('RAM', ram);
	product.attributes['proc'] = new ProductAttribute('Processor', proc);
	product.attributes['procSpeed'] = new ProductAttribute('Processor Speed', procSpeed);
	product.attributes['hdd'] = new ProductAttribute('HDD', hdd);
	product.attributes['gpu'] = new ProductAttribute('GPU', gpu);
	product.attributes['gpuSpeed'] = new ProductAttribute('GPU Speed', gpuSpeed);
	product.attributes['screen'] = new ProductAttribute('Screen', screen);
	product.attributes['screenType'] = new ProductAttribute('Screen Type', screenType);
	
	product.productStores[harveyNorman.id] = new ProductStore(product, harveyNorman, Number(hnPrice));
	product.productStores[courts.id] = new ProductStore(product, courts, Number(cPrice));
	product.productStores[bestDenki.id] = new ProductStore(product, bestDenki, Number(dbPrice));
	
	product.id = id;
	product.imageUrl = '/assets/' + imageUrl;
	
	products.push(product);
	productStage.addElement(product);
}




try
{
	categoryStage = new AnimationStage('category_block_wrapper', 'cat_stage', 400, 200);
	categoryStage.elementFrame = '<div class="category_block" style="background-image: url($$$URL$$$); background-size: cover;"></div>';
	categoryStage.mapElement = function(element, frame) { 
		return frame.replace('$$$TheData$$$', element.name).replace('$$$URL$$$', element.imageUrl); 
	}
	
	categoryStage.onElementClick = function(animationStage) {
		animationStage.animateExit(750, function() {
			try {
					$('#search').show();
					productStage.animateEntrance(750, function() {
						$('#category').hide();
						$('#toolbanner_heading').hide();
						$('#price_range_heading').show();
					}); 
			}
			catch (eeee)
			{
				alert(eeee);
				alert(eeee.stack);
			}
		});
	}
	
	productStage = new AnimationStage('product_block_wrapper', 'prod_stage', 225, 300);
	productStage.elementFrame = 
		'<div class="product_block"><div class="product_block_image" style="background-image: url($$$URL$$$); background-size: contain; background-repeat: no-repeat;"></div>' +
		'<div class="product_detail"><div class="product_detail_brand">$$$BRAND$$$</div><div>$$$MODEL$$$</div><div style="height: 10px"></div><div>' +
		'<table><tr><td>Harvey Norman</td><td>$$$$HNPRICE$$$</td></tr><tr><td>Courts</td><td>$$$$CPRICE$$$</td></tr><tr><td>Best Denki</td><td>$$$$BDPRICE$$$</td></tr></table></div></div></div>';
	productStage.mapElement = function(element, frame) {
		return frame
			.replace('$$$URL$$$', element.imageUrl)
			.replace('$$$BRAND$$$', element.attributes['brand'].value)
			.replace('$$$MODEL$$$', element.attributes['model'].value)
			.replace('$$$HNPRICE$$$', element.productStores[harveyNorman.id].price)
			.replace('$$$CPRICE$$$', element.productStores[courts.id].price)
			.replace('$$$BDPRICE$$$', element.productStores[bestDenki.id].price);
	}
		
	$(document).ready(function() {
		try
		{
			categoryStage.prepare();
			categoryStage.addElement(new Category(0, 'Laptops', '/assets/laptop.jpg'));
			categoryStage.addElement(new Category(1, 'Desktops', '/assets/desktop.jpg'));
			categoryStage.addElement(new Category(2, 'Tablet Computers', '/assets/tablet.jpg'));
			categoryStage.addElement(new Category(3, 'Television', '/assets/tv.jpg'));
			categoryStage.addElement(new Category(4, 'Refigerator', '/assets/fridge.jpg'));
			categoryStage.addElement(new Category(5, 'Phone', '/assets/phone.jpg'));
			
			productStage.prepare();
			addProduct('asus_n550jv.1.jpg', '1', 'Asus', 'N750JV-T4014H', 'SonicMaster Premium co-developed with Bang & Olufsen ICEpower® delivers the first-ever quad-speaker array on notebook, providing cinematic surround realism', '1798', '1798', '1798','Windows 8 64 bit', '8 GB', 'Intel® Core™ i7-4700HQ Processor ', '6M Cache, up to 3.40 GHz', '1TB (5400rpm)', 'NVIDIA® GeForce GT750M', '4GB DDR3','LCD', '17.3"');
			addProduct('asus_g750jx.1.jpg', '2', 'Asus', 'G750JX-T4064H', 'Responsive backlit keyboard allows you to hit hard and fast anywhere', '2198', '2198', '2198','Windows 8 64 bit', '8 GB', 'Intel® Core™ i7-4700HQ Processor ', '6M Cache, up to 3.40 GHz', '750GB', 'NVIDIA® GeForce  GTX770MX', '3 GB GDDR5','LCD', '17.3"');
			addProduct('asus_x450cc.1.jpg', '3', 'Asus', 'X450CC-WX064H', 'True instant on 2-sec resume from sleep mode', '899', '899', '899','Windows 8 64 bit', '8 GB', 'Intel® Core™ i5-3337U Processor', ' 3M Cache, 1.8GHz up to 2.7GHz', '500GB (5400rpm)', 'NVIDIA® GeForce GT 720M ', ' 2GB DDR3','LCD', '14.0"');
			addProduct('lenovo_y510p.1.jpg', '4', 'Lenovo', 'Y510p-59389485', 'Includes Veriface (facial reconigition)', '2099', '', '','Windows 8  ', '8 GB', 'Intel® Core™ I7-4700MQ Processor', '3.4GHz', '1TB   ', 'Nvidia® GeForce® GT750M ', ' 2GB VRAM (SLI)','LCD', '15.6"');
			addProduct('lenovo_flex_14.1_1.jpg', '5', 'Lenovo', 'Flex14-59392141', 'If you think a convertible notebook is out of your price range, think again. The Lenovo Flex 14 is a unique, thin and light, dual-mode laptop that flips 300 degrees from laptop to stand mode. Its a perfect way to enjoy movies on the go or make the most of touchscreen applications.', '', '', '1199','Windows 8  ', '4 GB', 'Intel® Core™ i7-4500U Processor', '2.6GHz', '500GB  ', 'Nvidia® GeForce® GT720M ', '2GB VRAM','LCD', '14.0"');
			addProduct('acer_e1.jpg', '6', 'Acer', 'Model: E1-421-21804G50Mn', 'With the Aspire E Series, everyday activities like web browsing, communicating and playing videos are effortless with Intel® or AMD processing. NVIDIA® or AMD graphics deliver fine visual detail. Plenty of memory means you can launch applications quickly, and a large hard drive provides more space for your media.', '699', '', '','Windows 8  ', '4 GB', 'AMD Dual Core E2-1800M APU ', ' 1.70GHz', '500GB HDD', 'AMD Radeon™ HD6320 (Integrated)', '','LCD', '14.0"');
			addProduct('sony_vaio_fit_15e.1_1.jpg', '7', 'Sony', 'VAIO® Fit 15 SVF-15A15CGB', 'VAIO® Fit 15 is great to use for business and home entertainment. The 15" Full HD screen with touch operation displays vivid, clear images. A hairline finished aluminium body and simple design produce a high-class look. The Hybrid HDD combines high speed performance with a large capacity HDD.', '', '', '1999','Windows 8 64 bit ', '8 GB', 'Intel® Core™ i7-3537U Processor', '2 GHz with Turbo Boost up to 3.10 GHz', '750 GB + NAND FLASH Memory 8 GB', 'NVIDIA® GeForce® GT 735M with NVIDIA® Optimus™ technology', ' 2GB DDR3 VRAM','Touch', '15.5"');
			addProduct('hp_envy_15.1_1.jpg', '8', 'HP', 'ENVY TouchSmart 15-j005TX', 'Standout performance. Inside and out.', '', '', '1599','Windows 8', '8 GB', '4th generation Intel® Core™ i7-4700MQ Processor', '2.4GHz', '750GB', 'NVIDIA® GeForce® GT 740M switchable Graphics ', '2G DDR3 VRAM','Touch', '15.6 "');
			addProduct('hp_dv6.2.jpg', '9', 'HP', 'DV6-7309TX', 'With full HD Screen', '', '', '1699','Windows 8', '8 GB', 'Intel® Core™ i7-3630QM Processor', '2.4GHz', '1TB HDD', 'Nvidia® Geforce® GT650M ', '2GB DDR5','Full HD', '15.6"');
			addProduct('toshiba_p50.1.jpg', '10', 'Toshiba', 'Satellite® P50-A100X', 'Powerful yet portable, the entertainment-optimized Satellite® P50 series laptop provides an elegant touchscreen1 PC experience with Windows® 8. With a 15.6” diagonal, Full HD, TruBrite® display, Harman Kardon® speakers, modernized design, an exquisite, frameless, LED-backlit keyboard and many other premium features, this laptop is ideal for work or play.', '', '', '1699','Windows 8 Premium with Chinese OS', '8 GB', 'Intel® Core™ I7-4700QM', '2.4GHz', '1TB', 'Nvidia® Geforce® GT740M', '4GB VRam','Touch', '15.6"');

			productStage.search = function(element) {
				var hnPrice = element.productStores[harveyNorman.id].price;
				var cPrice = element.productStores[courts.id].price;
				var bDPrice = element.productStores[bestDenki.id].price;
				
				var minPrice = hnPrice;
				minPrice = minPrice > cPrice ? cPrice : minPrice;
				minPrice = minPrice > bDPrice ? bDPrice : minPrice;
				
				return minPrice <= highestBudget;
				
			};
			
			$("#slider-value").bind("slider:changed", function (event, data) {
				try {
				  // The currently selected value of the slider
				  $('#slider-value-display').html('$' + Math.round(data.value, 2));
				  highestBudget = Math.round(data.value, 2);
				  productStage.animateFilter(750);
				}
				catch (mm) {
					alert(mm);
				}
				});

			//alert(JSON.stringify(categoryStage, null, 4));
			categoryStage.animateEntrance(750);
			
			
			
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