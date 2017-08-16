// parse url and choose active tab and switch images in slider - start
var urls = [
	["yubilei-kompanii", "letniy-korporativ", "novogodniy-korporativ", "komandoobrazovatelnie-programmu"],
	["svadba", "organizaciya-dnya-rozhdeniya", "vipusknoy-vecher"],
	["provedenie-presentaciy", "organizaciya-konferenciy", "vistavki", "organizaciya-forumov", "organizaciya-krugluh-stolov", "otkritie-torgovih-tochek"],
	["organizaciya-koncertov", "organizaciya-festivaley", "gorodskie-prazdniki", "reklamnie-akcii", "vechernie-baly", "aukciony"]
];

for (var x = 0; x < urls.length; x++) {
	for (var y = 0; y < urls[x].length; y++) {
		if (window.location.href.indexOf(urls[x][y]) > -1) {
			$(".menu__item--current").removeClass("menu__item--current");
 			$(".menu__item").eq(x).addClass("menu__item--current");

			var imageWidth = parseInt($(".gallery .owl-item").css("width"),10);
			var translate3d = "translate3d(-" + imageWidth * x + "px, 0px, 0px)";
			$(".gallery .owl-wrapper").css("transform", translate3d);
		}
	}
}
// finish

// put objects into array with right keys - start
var gps = null;
$('#fileupload').on('change', function(e) {
	var gpsArray = [];
	var gpsValue = {};
        $.each(e.target.files, function (key, value) {
		    EXIF.getData(value, function () {
			    var gps = {/*...someValue...*/};
                gpsValue[key] = gps;
            });
            gpsArray.push(gpsValue);
        });
        gps = gpsArray[0];
});
// finish

// get city and country from Google autocomplete - start 
var autocomplete = new google.maps.places.Autocomplete(
	(document.getElementById('locationAutocomplete')),
	{types: ['(cities)']});

autocomplete.addListener('place_changed', function() {
	var place = autocomplete.getPlace();
	var city = place.address_components[0].long_name;
	var countryId = place.address_components[place.address_components.length-1].short_name;
	var country = place.address_components[place.address_components.length-1].long_name;

	// put values into inputs
	$("#countries-id").val(countryId);
	$("#countries-name").val(country);
	$("#cities-name").val(city);
});
// finish
