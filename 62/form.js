/*global $*/
(function () {
    'use strict';

    let inputForm = $('form');

    inputForm.on('submit', function (event) {
        $('<div>' + $('#name').val() + '</div>').appendTo('body');
        $('<div>' + $('#address').val() + '</div>').appendTo('body');
        inputForm[0].reset();
        event.preventDefault();
        inputForm.hide();
        $('<button type="button">Clear</button>').appendTo('body').addClass('clear').click(function () {
            $('div').add('.clear').remove();
            inputForm.show();
            $('fieldset').attr('disabled', 'disabled');
        });
    });

    $('#enable').on('change', function(){
        if(this.checked){
            $('fieldset').removeAttr('disabled');
        }else{
            $('fieldset').attr('disabled', 'disabled');
        }
        
    });

}());