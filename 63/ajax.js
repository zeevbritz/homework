/* global $*/
(function () {
    'use strict';
    let div = $('<div>').appendTo('body');
    let fileInput = $('#fileName');

    $('#load').click(() => {
        div.empty();
        div.append('<img src="spinner.gif" />');
        // div.text('Loading File...');
        
        // $.get(fileInput.val(), loadedData => div.text(loadedData))
        //     .fail(xhr => div.text(xhr.status + ' unknown file'));

        setTimeout(() => {
            $.get(fileInput.val(), loadedData => div.text(loadedData))
            .fail(xhr => div.text(xhr.status + ' unknown file'));
        }, 2000);        
    });

}());