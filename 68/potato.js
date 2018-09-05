/*global $*/
(function () {
    'use strict';

    let dragging = false;
    let offset;
    let zIndex = 1;
    let parts = [];
    let pieces = $('.bodyPart');
    let save = $('#save');
    let restart = $('#restart');

    $(document).on('mousedown', '.bodyPart', function (event) {
        // console.log('mousedown', event);
        offset = { x: event.offsetX, y: event.offsetY };
        dragging = $(this);
        event.preventDefault();
        $(this).css({position: 'absolute' , zIndex: zIndex++});
    }).on('mouseup', event => {
        // console.log('mouseup', event);
        dragging = null;
        event.preventDefault();
    }).mousemove(event => {
        if (dragging) {
            // console.log('mousemove', event);
            dragging.css({ top: event.clientY - offset.y, left: event.clientX - offset.x });
            event.preventDefault();
        }
    });

    save.click(function () {
        parts = [];
        pieces.each(function () {
            parts.push($(this).position());
            localStorage.potato = JSON.stringify(parts);
        });
    });

    restart.click(function () {
        pieces.each(function () {
            $(this).css('position', 'unset');
            localStorage.clear();
        });
    });

    if (localStorage.potato) {
        parts = JSON.parse(localStorage.potato);
        let index = 0;
        pieces.each(function () {
            $(this).css({position: 'absolute', top: parts[index].top, left: parts[index].left });
            // console.log({top: test[index].top, left: test[index].left });
            index++;
        });
    }
}());