var markers = [];
var uniqueId = 1;
var infos = [];
var pickupPoints = [];

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(-25.363, 131.044)
    });

    map.addListener('click', function(event) {
        var location = event.latLng;

        var marker = new google.maps.Marker({
            position: location,
            icon: '/img/map/map_marker.png',
            map: map
        });

        //Set unique id
        marker.id = uniqueId;
        uniqueId++;

        var infowindow = new google.maps.InfoWindow({
            content:
                '<div>'+
                '<div>Point</div>'+
                '<div>'+
                '<input type="hidden" id="pointLat" value='+marker.getPosition().lat()+'>'+
                '<input type="hidden" id="pointLng" value='+marker.getPosition().lng()+'>'+
                '<div>Name the point</div>'+
                '<input id="pointName" placeholder="-Point name-">'+
                '<div>Tour guide</div>'+
                '<select id="pointLanguage">'+
                '<option></option>'+
                '<option value="1">English</option>'+
                '<option value="2">Spanish</option>'+
                '<option value="3">Russian</option>'+
                '</select>'+
                '<div>Departure time</div>'+
                '<input id="pointTime" placeholder="-Departure time-">'+
                '<div>Additional information</div>'+
                '<textarea id="pointAddInfo" placeholder="Additional information"></textarea>'+
                '<div>'+
                '<button onclick="deleteMarker('+marker.id+')">Delete</button>'+
                '<button onclick="saveData()">Save the point</button>'+
                '</div>'+
                '</div>'+
                '</div>'
        });

        marker.addListener('click', function() {
            //close the previous infowindow
            closeInfos();
            infowindow.open(map, marker);
            //keep the handle, in order to close it on next click event
            infos[0] = infowindow;
        });

        //Add marker to the array.
        markers.push(marker);
    });
}

function saveData() {
    var point = {};
    point.name = document.getElementById('pointName').value;
    point.languageId = document.getElementById('pointLanguage').value;
    point.time = document.getElementById('pointTime').value;
    point.lat = document.getElementById('pointLat').value;
    point.lng = document.getElementById('pointLng').value;
    point.addInfo = document.getElementById('pointAddInfo').value;

    //Remove similar pickupPoint's data from array
    for (var i = 0; i < pickupPoints.length; i++) {
        if (pickupPoints[i].lat == point.lat && pickupPoints[i].lng == point.lng) {
            pickupPoints.splice(i, 1);
        }
    }

    pickupPoints.push(point);

    //Insert all PickupPoints into input on the page
    $("#pickuppoints-allpoints").val(JSON.stringify(pickupPoints));

    closeInfos();
}

function deleteMarker(id) {
    //Find and remove the marker from the Array
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].id == id) {
            //Remove the marker from Map
            markers[i].setMap(null);
            //Remove the marker and data from arrays
            markers.splice(i, 1);
            pickupPoints.splice(i, 1);
        }
    }
}

function closeInfos(){
    if(infos.length > 0){
        //detach the infowindow from the marker
        infos[0].set("marker", null);
        //and close it
        infos[0].close();
        //blank the array
        infos.length = 0;
    }
}

$(document).ready(function() {
    $('#removePoints').click(function() {
        //Remove all markers from the map
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        //Clear array of markers
        markers = [];
        //Clear all pickupPoints data and array of it
        $("#pickuppoints-allpoints").val('');
        pickupPoints = [];
    });
});

