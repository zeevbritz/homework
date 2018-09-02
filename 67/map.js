/*global google, $*/
(function () {
    'use strict';

    const searhInput = $('#searhInput');
    const resultList = $('ul');
    const searchTitle = $('#searchTitle');
    let searchResult = [];
    let map;
    let location;
    let marker = [];
    let rectangle = [];
    let polygon = [];
    let polyline = [];
    let circle = [];

    function mapArray(element) {
        return {
            summary: element.summary,
            lng: element.lng,
            lat: element.lat,
            thumbnailImg: element.thumbnailImg,
            title: element.title,
            wikipediaUrl: element.wikipediaUrl
        };
    }

    window.initMap = function () {
        location = { lat: 40.09680866454403, lng: -74.2213982035816 };

        map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 8
        });

        new google.maps.Marker({ position: location, map: map });

        const drawingManager = new google.maps.drawing.DrawingManager();
        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {

            if (event.type === 'marker') {
                marker.push({ lat: event.overlay.position.lat(), lng: event.overlay.position.lng() });
                localStorage.marker = JSON.stringify(marker);
                // localStorage.marker = JSON.stringify({ lat: event.overlay.position.lat(), lng: event.overlay.position.lng() });

            } if (event.type === 'rectangle') {
                rectangle.push({ north: event.overlay.bounds.f.f, south: event.overlay.bounds.f.b, east: event.overlay.bounds.b.f, west: event.overlay.bounds.b.b });
                localStorage.rectangle = JSON.stringify(rectangle);
                // localStorage.rectangle = JSON.stringify({north: event.overlay.bounds.f.f, south: event.overlay.bounds.f.b, east: event.overlay.bounds.b.f, west: event.overlay.bounds.b.b});
                // map.fitBounds(event.overlay.bounds);

            } if (event.type === 'polygon') {
                polygon.push(event.overlay.latLngs.b[0].b.map(loc => ({ lat: loc.lat(), lng: loc.lng() })));
                localStorage.polygon = JSON.stringify(polygon);
                // localStorage.polygon = JSON.stringify(event.overlay.latLngs.b[0].b.map(loc => ({ lat: loc.lat(), lng: loc.lng()})));

            } if (event.type === 'polyline') {
                polyline.push(event.overlay.latLngs.b[0].b.map(loc => ({ lat: loc.lat(), lng: loc.lng() })));
                localStorage.polyline = JSON.stringify(polyline);
                // localStorage.polyline = JSON.stringify(event.overlay.latLngs.b[0].b.map(loc => ({ lat: loc.lat(), lng: loc.lng()})));                

            } else if (event.type === 'circle') {
                circle.push({ lat: event.overlay.center.lat(), lng: event.overlay.center.lng(), radius: event.overlay.radius });
                localStorage.circle = JSON.stringify(circle);
                // localStorage.circle = JSON.stringify({ lat: event.overlay.center.lat(), lng: event.overlay.center.lng(), radius: event.overlay.radius });
            }
            // console.log('overlaycomplete:', event);
        });

        if (localStorage.marker) {
            const loc = JSON.parse(localStorage.marker);
            loc.forEach(element => {
                marker.push(element);
                new google.maps.Marker({
                    position: { lat: element.lat, lng: element.lng },
                    title: `lat: ${element.lat}, lng: ${element.lng}`,
                    map: map
                });
            });
        }
        if (localStorage.rectangle) {
            const loc = JSON.parse(localStorage.rectangle);
            loc.forEach(element => {
                rectangle.push(element);
                new google.maps.Rectangle({
                    map: map,
                    bounds: {
                        north: element.north,
                        south: element.south,
                        east: element.east,
                        west: element.west
                    }
                });
            });
        }
        if (localStorage.circle) {
            const loc = JSON.parse(localStorage.circle);
            loc.forEach(element => {
                circle.push(element);
                new google.maps.Circle({
                    map: map,
                    center: { lat: element.lat, lng: element.lng },
                    radius: element.radius
                });
            });
        }
        if (localStorage.polygon) {
            const loc = JSON.parse(localStorage.polygon);
            loc.forEach(element => {
                polygon.push(element);
                new google.maps.Polygon({
                    paths: element
                }).setMap(map);
            });

        }
        if (localStorage.polyline) {
            const loc = JSON.parse(localStorage.polyline);
            loc.forEach(element => {
                polyline.push(element);
                new google.maps.Polyline({
                    path: element
                }).setMap(map);
            });
        }
    };

    $('button').click(() => {
        resultList.empty();
        searchTitle.text(searhInput.val().toUpperCase());
        $.getJSON('http://api.geonames.org/wikipediaSearch?username=zbritz&type=json',
            { q: searhInput.val(), maxRows: 10 },
            result => {
                searchResult = result.geonames.map(mapArray);

                searchResult.forEach(element => {
                    let location = { lat: element.lat, lng: element.lng };

                    resultList.append($('<div>').append(`<li>${element.title}<br><img src = "${element.thumbnailImg || 'defaultImage.jpg'}"></img></li></div>`)
                        .click(() => {
                            map.setCenter(new google.maps.LatLng(location));
                            map.setZoom(14);

                        }));
                    resultList.append('<hr>');

                    const infoWindow = new google.maps.InfoWindow({
                        content: `${element.summary}<br><a target="_blank" href="https://${element.wikipediaUrl}">see more</a>`
                    });

                    let marker = new google.maps.Marker({
                        position: location,
                        title: element.title,
                        map: map,
                        icon: element.thumbnailImg ? {
                            url: element.thumbnailImg,
                            scaledSize: new google.maps.Size(50, 50)
                        } : null
                    });
                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });

                });
                searhInput.val('');
                // console.log(searchResult);
            });
    });

}());