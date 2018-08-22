/*global $*/
(function () {
    'use strict';

    let playVideo = $('#theVideo');
    let videoTitle = $('#title');
    let displayVideos = $('#allVideos');
    let thisVideo;
    // let id;

    $.getJSON('video.json', videos => {
        let id = 0;
        videos.forEach(video => {
            $('<div>').appendTo(displayVideos)
                .attr('id', id++)
                .append($('<img>').attr('src', video.poster))
                .append(`<h3>${video.title}</h3>`);

            // $('<video preload="metadata" controls>').appendTo(displayVideos).attr('src', video.url);
            // displayVideos.append('<video>').attr('src', video.url);
        });

    });
    
    $('#allVideos').on('click', 'div', function () {
        $(thisVideo).css('opacity', 1);
        thisVideo = this;
        $.getJSON('video.json', function (videos) {
            playVideo.attr('src', videos[thisVideo.id].url).attr('controls', true)[0].play();
            videoTitle.empty();
            videoTitle.append(`<h2>${videos[thisVideo.id].title}</h2>`);
            $(thisVideo).css('opacity', 0.4);
        });

    });


}());