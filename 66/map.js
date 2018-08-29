/*global google, $*/
(function () {
    'use strict';

    const searhInput = $('#searhInput');
    const resultList = $('#searcResults ul');
    const searchTitle = $('#searchTitle');
    let searchResult = [];
    let map;
    let location;

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

                    if (element.thumbnailImg !== undefined) {
                        resultList.append($('<div>').append(`<li>${element.title}<br><img src = "${element.thumbnailImg}"></img></li></div>`)
                            .click(() => {
                                map.setCenter(new google.maps.LatLng(location));
                                map.setZoom(14);

                            }));
                    } else {
                        resultList.append($('<li>').append(`${element.title}`).click(() => {
                            map.setCenter(new google.maps.LatLng(location));
                            map.setZoom(14);
                        }));

                    }
                    resultList.append('<hr>');

                    const infoWindow = new google.maps.InfoWindow({
                        content: `${element.summary}<br><a target="_blank" href="https://${element.wikipediaUrl}">see more</a>`
                    });

                    let marker = new google.maps.Marker({
                        position: location,
                        title: element.title,
                        map: map,
                        icon: {
                            url: element.thumbnailImg,
                            scaledSize: new google.maps.Size(50, 50)
                        }
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