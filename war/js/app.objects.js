/**
 * 
 */
function Company() {
	
	this.id = 0;
	this.name = '';
	
}

function Store() {
	
	this.id = 0;
	this.storeName = '';
	this.company = null;
	this.address = '';
	this.long = 0;
	this.lat = 0;
	
}

function Category(id, name) {
	
	this.id = id;
	this.name = name;
	
}

function ProductStore() {
	
	this.product = null;
	this.store = null;
	this.price = 1000.0;
	
}

function ProductAttribute() {
	
	this.attribute = '';
	this.value = '';
	
}

function Product() {
	
	this.id = 0;
	this.name = '';
	this.category = null;
	this.productStores = [];
	this.imageUrl = '';
	this.description = '';
	this.attributes = [];
	
}