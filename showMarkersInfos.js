// array pickupPoints was passed from php and contains all tour's pickup points
var markers = pickupPoints;
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {});
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var bounds = new google.maps.LatLngBounds();

    // Loop through array of markers and place each one on the map
    for (i = 0; i < markers.length; i++) {
        var markerPosition = new google.maps.LatLng(markers[i]['lat'], markers[i]['lng']);
        bounds.extend(markerPosition);
        marker = new google.maps.Marker({
            position: markerPosition,
            icon: '/img/map/map_marker.png',
            map: map
        });

        // Allow each marker to have an info window
        marker.addListener('click', (function (marker, i) {
            return function () {
                infowindow.setContent(
                    '<div>' +
                        '<div>' +
                            markers[i]['name'] +
                        '</div>' +
                        '<div>' +
                            'Guide: ' +
                            '<span>' + markers[i]['languageId'] + '</span>' +
                        '</div>' +
                        '<div>' +
                            'Departure at: ' +
                            '<span>' + markers[i]['time'] + '</span>' +
                        '</div>' +
                        '<div>' +
                            markers[i]['addInfo'] +
                        '</div>' +
                    '</div>'
                );
                infowindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
}