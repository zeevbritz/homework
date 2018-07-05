var app = app || {};

app.counter = (function () {
    'use strict';

    let counter = 0;

    // function count() {
    //     counter++;
    //     return this;
    // }

    function getCount() {
        return counter;
    }

    return {
        getCount: getCount,
        count: function () {
            counter++;
            return this;
        }
    };

}());
/*
console.log(app.counter.getCount());
// app.counter.count();
console.log(app.counter.count().getCount());
console.log(app.counter.count().getCount());
*/