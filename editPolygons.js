// Coordinates of existing polygon in values from hidden inputs
var itemLatLng = $(".itemLatLng input");
// Coordinates of the polygon that will be saved to DB
var coresArray = [];

google.maps.event.addDomListener(window, 'load', function () {
    var myLatlng = new google.maps.LatLng(50.24, 50.48);
    var mapOptions = {
        center: myLatlng,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    // Define the LatLng coordinates for the polygon's path.
    var triangleCoords = [];
    for (var a = 0; a < itemLatLng.length; a += 2) {
        triangleCoords.push(new google.maps.LatLng(itemLatLng.eq(a).val(), itemLatLng.eq(a + 1).val()));
    }
    // If there is no existing polygon on the map then allow user to draw the new one
    if (triangleCoords.length == 0) {
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON
                ]
            },
            polygonOptions: {
                editable: true
            }
        });
        //Event listener from polygon
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
            /*Local Vars to push cores on event*/
            var itemCores = [];
            if (event.type == google.maps.drawing.OverlayType.POLYGON) {
                var polygon = event.overlay.getPath();
                google.maps.event.addListener(polygon, 'set_at', function () {});
                google.maps.event.addListener(polygon, 'insert_at', function () {});
                $.each(polygon.getArray(), function (i, item) {
                    itemCores.push({
                        'lat': item.lat(),
                        'lng': item.lng()
                    });
                });
                coresArray = itemCores;
            }
        });
        drawingManager.setMap(map);
    } else {
        // Construct the polygon.
        var polygon = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            editable: true
        });
        var latlngbounds = new google.maps.LatLngBounds();
        for (var i = 0; i < triangleCoords.length; i++) {
            latlngbounds.extend(triangleCoords[i]);
        }
        map.fitBounds(latlngbounds);
        var itemCores = [];
        var vertices = polygon.getPath();
        //Event listener from polygon (if map was clicked)
        $("#map-canvas").click(function() {
            google.maps.event.addListener(vertices, 'set_at', getPolygonCoords);
            google.maps.event.addListener(vertices, 'insert_at', getPolygonCoords);
        });
        //If polygon was not edited it will save current coords
        getPolygonCoords();

        function getPolygonCoords() {
            itemCores.length = 0;
            for (var i = 0; i < vertices.length; i++) {
                var item = vertices.getAt(i);
                itemCores.push({
                    'lat': item.lat(),
                    'lng': item.lng()
                });
            }
        }

        coresArray = itemCores;
        polygon.setMap(map);
    }
});