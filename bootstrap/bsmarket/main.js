var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.539656, lng: 31.763130},
        zoom: 6,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#1e1e1e"
                    },
                    {
                        "lightness": 13
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#585858"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 15
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#161617"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 50.100000, lng: 24.027340},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 48.550000, lng: 25.926358},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 49.484576, lng: 28.468258},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 50.490842, lng: 28.656206},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 50.719562, lng: 30.518922},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 51.748751, lng: 31.285043},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 46.782586, lng: 30.717271},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 47.290000, lng: 31.978462},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 46.900000, lng: 32.614439},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 49.730086, lng: 32.057972},
        map: map,
        icon: image
});
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 48.800000, lng: 32.252201},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 49.366742, lng: 33.407595},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 48.240000, lng: 33.382959},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 48.150000, lng: 35.119726},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 48.766767, lng: 35.024380},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 49.889784, lng: 34.541100},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 51.180000, lng: 34.798419},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 50.290000, lng: 36.225391},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 47.396807, lng: 37.532514},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 48.300000, lng: 37.797217},
        map: map,
        icon: image
    });
    var image = 'img/map-marker.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 48.874073, lng: 39.303400},
        map: map,
        icon: image
    });
}