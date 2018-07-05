(function () {
    'use strict';

    let numbers = [2, 4, 6];

    function myMap(array, callback) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            newArray[i] = callback(array[i]);
        }
        return newArray;
    }

    function double(element) {
        return element * 2;
    }

    console.log(numbers);
    console.log(myMap(numbers, double));
}());
