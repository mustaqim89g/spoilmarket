/**
 * 
 */
function Company(id, name) {
	
	this.id = id;
	this.name = name;
	
}

function Store() {
	
	this.id = 0;
	this.storeName = '';
	this.company = null;
	this.address = '';
	this.long = 0;
	this.lat = 0;
	
}

function Category(id, name, imageUrl) {
	
	this.id = id;
	this.name = name;
	this.imageUrl = imageUrl;
	
}

function ProductStore(product, company, price) {
	
	this.product = product;
	this.company = company;
	this.price = price;
	
}

function ProductAttribute(attribute, value) {
	
	this.attribute = attribute;
	this.value = value;
	
}

function Product() {
	
	this.id = 0;
	this.name = '';
	this.category = null;
	this.productStores = {};
	this.imageUrl = '';
	this.description = '';
	this.attributes = {};
	
}