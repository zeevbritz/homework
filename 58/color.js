// var x = (function(){
(function () {
    'use strict';

    let body = document.getElementsByTagName('body')[0];
    let submitButton = document.getElementById('submit');
    let resetButton = document.getElementById('reset');

    function handleClick() {
        body.style.backgroundColor = document.getElementById('backgroundColor').value;
        body.style.color = document.getElementById('textColor').value;
    }

    function reset() {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
    }

    submitButton.addEventListener('click', handleClick);
    resetButton.addEventListener('click', reset);
    return {
        reset: reset
    };
}());

