/*global $*/
(function () {
    'use strict';

    const photoPlaceholder = $('#thephoto');
    const allPhotosPlaceholder = $('#allPhotos');
    const searchInput = $('#searchInput');
    const searchButton = $('#searchButton');
    const showAll = $('#showAll');
    const caption = $('#caption');
    let searchedPhoto;
    let photoArray = [];
    let index = 0;

    showAll.hide();

    searchButton.click(getPhotos);
    showAll.click(viewAllImages);

    photoPlaceholder.on('click', 'button#next', () => {
        if (index === photoArray.length - 1) {
            index = -1;
        }
        $('#theImage').attr('src', photoArray[++index].url.replace('_m', ''))
            .attr('title', title(photoArray[index].title) || searchedPhoto);
        caption.html(`<div>${title(photoArray[index].title) || searchedPhoto}</div>`);
    });

    photoPlaceholder.on('click', 'button#previous', () => {
        if (index === 0) {
            index = photoArray.length;
        }
        $('#theImage').attr('src', photoArray[--index].url.replace('_m', ''))
            .attr('title', title(photoArray[index].title) || searchedPhoto);
        caption.html(`<div>${title(photoArray[index].title) || searchedPhoto}</div>`);
    });

    function title(photo) {
        if (photo === '-') {
            return '';
        } else {
            return photo;
        }
    }

    function mapPhotos(element) {
        return {
            url: element.media.m,
            title: element.title
        };
    }

    function getPhotos() {
        searchedPhoto = searchInput.val();
        photoPlaceholder.empty();
        allPhotosPlaceholder.empty();
        $.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?',
            { tags: searchInput.val() },
            photos => {
                photoArray = photos.items.map(mapPhotos);
                console.log(photoArray[0].url);
                photoPlaceholder.append($('<img>').attr('src', photoArray[index].url.replace('_m', ''))
                    .attr('id', 'theImage')
                    .attr('title', title(photoArray[index].title) || searchedPhoto))
                    .append($('<div>').append($('<button>').text('<').attr('id', 'previous'))
                        .append($('<button>').text('>').attr('id', 'next')));
                caption.html(`<div>${title(photoArray[index].title) || searchedPhoto}</div>`);
            });
        searchInput.val('');
        showAll.show();
    }

    function viewAllImages() {
        photoArray.forEach(element => {
            allPhotosPlaceholder.append($('<img>').attr('src', element.url)
                .attr('title', title(element.title) || searchInput.val()));
        });
        showAll.hide();
    }

}());