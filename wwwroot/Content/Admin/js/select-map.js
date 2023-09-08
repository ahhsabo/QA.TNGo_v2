var map;
var marker;
var markers = [];

function initMap() {
    var firsLatLng = new google.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng);
    var nopoi = [
        {
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: 'transit.station',
            stylers: [
                { visibility: "off" }
            ]
        }
    ];
    map = new google.maps.Map(document.getElementById('mapStation'), {
        center: firsLatLng,
        zoom: 15,
        mapTypeControl: false,
        styles: nopoi
    });
    google.maps.event.addListener(map, 'click', function (event) {
        mapZoom = map.getZoom();
        placeMarker(event.latLng, true, false);
    });
    initSearchMap();
}

function initSearchMap() {
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        if (places.length > 0) {
            placeMarker(places[0].geometry.location, isInfo = true);
        }
        map.fitBounds(bounds);
    });
}

function initMarker(lat, lng) {
    var firsLatLng;
    if (lat === 0 || lng === 0) {
        firsLatLng = new google.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng);
    }
    else {
        firsLatLng = new google.maps.LatLng(lat, lng);
    }
    placeMarker(firsLatLng, false);
}

function initMarkerView(lat, lng) {
    var firsLatLng;
    if (lat === 0 || lng === 0) {
        firsLatLng = new google.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng);
    }
    else {
        firsLatLng = new google.maps.LatLng(lat, lng);
    }
    placeMarker(firsLatLng, false, true, false);
}

function removeMarkers() {
    if (markers.length > 0) {
        for (i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }
}

function eventDragEnd(e) {
    document.getElementById('Lat').value = this.position.lat();
    document.getElementById('Lng').value = this.position.lng();
    alertify.notify("Di chuyển tọa độ thành công, có thể đóng cửa sổ này và click 'Lưu thay đổi'", "success", 5);
}

function placeMarker(location, isInfo = true, isSetCenter = true, isSetValue = true) {
    removeMarkers();
    marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
        title: "Tọa độ"
    });
    markers.push(marker);
    if (isSetValue) {
        marker.addListener('dragend', eventDragEnd);
        document.getElementById('Lat').value = location.lat();
        document.getElementById('Lng').value = location.lng();
    }

    if (isInfo) {
        alertify.notify("Chọn tọa độ thành công, có thể đóng cửa sổ này và click 'Lưu thay đổi'", "success", 5);
    }
    if (isSetCenter) {
        map.setCenter(location);
    }
}