/**
 * 
 */
var map = null;
var locations = {};
locations['harvey norman'] = [];
locations['harvey norman'].push({long:1.292796, lat:103.859905, name: 'harvey norman Superstore @ Millenia Walk (Electrical. Computer. Furniture. Bedding)'});
locations['harvey norman'].push({long:1.380003, lat:103.764532, name: 'Bukit Panjang Plaza (Electrical. Computer)'});
locations['harvey norman'].push({long:1.301694, lat:103.839803, name: 'The Centrepoint (Electrical. Computer. Furniture. Bedding)'});
locations['harvey norman'].push({long:1.372801, lat:103.847705, name: 'Djitsun Mall (Electrical. Computer)'});
locations['harvey norman'].push({long:1.291329, lat:103.850248, name: 'Funan DigitaLife Mall (Electrical. Computer)'});
locations['harvey norman'].push({long:1.372527, lat:103.893835, name: 'Hougang Mall (Electrical. Computer)'});
locations['harvey norman'].push({long:1.340089, lat:103.706647, name: 'Jurong Point (Electrical. Computer. Bedding)'});
locations['harvey norman'].push({long:1.429244, lat:103.836224, name: 'North Point Shopping Centre (Electrical. Computer)'});
locations['harvey norman'].push({long:1.301297, lat:103.905129, name: 'Parkway Parade (Electrical. Computer)'});
locations['harvey norman'].push({long:1.294001, lat:103.853301, name: 'Raffles City (Electrical. Computer)'});
locations['harvey norman'].push({long:1.320685, lat:103.844058, name: 'Square 2 (Electrical. Computer)'});
locations['harvey norman'].push({long:1.354419, lat:103.960144, name: 'Tampines Mart (Electrical. Computer)'});
locations['harvey norman'].push({long:1.350062, lat:103.749295, name: 'Westmall (Electrical. Computer)'});

locations['courts'] = [];
locations['courts'].push({long:1.340078, lat:103.706647, name: 'JURONG POINT'});
locations['courts'].push({long:1.385383, lat:103.744799, name: 'LOT ONE'});
locations['courts'].push({long:1.333353, lat:103.743319, name: 'JEM'});
locations['courts'].push({long:1.436142, lat:103.786172, name: 'CAUSEWAY POINT'});
locations['courts'].push({long:1.330533, lat:103.788938, name: 'BUKIT TIMAH'});
locations['courts'].push({long:1.312687, lat:103.765663, name: 'CLEMENTI '});
locations['courts'].push({long:1.307172, lat:103.788124, name: 'STAR VISTA'});
locations['courts'].push({long:1.301768, lat:103.838479, name: 'ORCHARD '});
locations['courts'].push({long:1.291474, lat:103.849974, name: 'FUNAN DIGITALIFE MALL'});
locations['courts'].push({long:1.332074, lat:103.849899, name: 'TOA PAYOH'});
locations['courts'].push({long:1.373614, lat:103.845819, name: 'ANG MO KIO'});
locations['courts'].push({long:1.350741, lat:103.872782, name: 'SERANGOON'});
locations['courts'].push({long:1.352511, lat:103.94468, name: 'TAMPINES MALL'});
locations['courts'].push({long:1.373243, lat:103.933874, name: 'MEGASTORE '});

locations['best denki'] = [];
locations['best denki'].push({long:1.311566, lat:103.856345, name: 'CITY SQUARE MALL'});
locations['best denki'].push({long:1.352299, lat:103.943742, name: 'CENTURY SQUARE'});
locations['best denki'].push({long:1.315163, lat:103.764505, name: 'THE CLEMENTI MALL'});
locations['best denki'].push({long:1.39201, lat:103.895135, name: 'COMPASS POINT'});
locations['best denki'].push({long:1.293539, lat:103.832002, name: 'GREAT WORLD CITY'});
locations['best denki'].push({long:1.335093, lat:103.746582, name: 'IMM'});
locations['best denki'].push({long:1.350535, lat:103.848783, name: 'JUNCTION 8'});
locations['best denki'].push({long:1.302671, lat:103.834701, name: 'NGEE ANN CITY'});
locations['best denki'].push({long:1.301324, lat:103.905124, name: 'PARKWAY PARADE'});
locations['best denki'].push({long:1.263969, lat:103.822013, name: 'VIVO CITY'});
locations['best denki'].push({long:1.324317, lat:103.928489, name: 'BEDOK MALL'});


function setMap() {
	if (!map)
	{
		map = L.map('map').setView([1.355312, 103.827068], 12);
		var layer = L.tileLayer(	
			'http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png',
			{
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
				key: '083ffc0920af489ea567776456cf13b5'
			}).addTo(map);
	}
	else
	{
		map.setView([1.355312, 103.827068], 12)
	}
		

}

var markers = [];

function addMarker(lat, long, name)
{
	var marker = L.marker([long, lat]).addTo(map);
	marker.bindPopup('<b>' + name + '</b>');
	markers.push(marker);
}

function clearMarkers()
{
	for (var i = 0; i < markers.length; i++)
	{
		var marker = markers[i];
		map.removeLayer(marker);
	}
}

function displayMarkersFrom(storeName)
{
	var arr = locations[storeName.toLowerCase()];
	if (arr)
	{
		for (var i = 0; i < arr.length; i++)
		{
			var loc = arr[i];
			addMarker(loc.lat, loc.long, loc.name);
		}
	}
	else
	{
		addMarker(103.859905, 1.292796, storeName);
	}
}