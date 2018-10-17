/*g-lobal $*/
// (function (){
    'use strict'; //jshint ignore:line
    
    import $ from 'jquery';
    
    const timeDiv =  $('#timeDiv');
    $('#button').click( () => {
        timeDiv.html(`<h1>${new Date().toLocaleTimeString()}</>`);
    });

// }());