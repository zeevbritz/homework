var app = app || {};

app.counters = (function () {
    'use strict';

    let counters = 0;

    function createCounter() {
        counters++;
        let counter = 0;

        function count() {
            counter++;
        }

        function getCount() {
            return counter;
        }

        return {
            count: count,
            getCount: getCount
        };
    }

    return {
        createCounter: createCounter,
        getCounters: function () {
            return counters;
        }
    };

}());

/*
let counter1 = app.counters.createCounter();
let counter2 = app.counters.createCounter();
// eslint-disable-next-line
let counter3 = app.counters.createCounter(); // jshint ignore:line

counter1.count();
counter2.count();
counter2.count();

console.log(counter1.getCount());
console.log(counter2.getCount());
console.log(app.counters.getCounters());
*/